// AI-Powered Task Intelligence

export const suggestPriority = (task) => {
  const title = task.title.toLowerCase();
  const description = (task.description || '').toLowerCase();
  const text = `${title} ${description}`;

  // High priority keywords
  const urgentKeywords = ['urgent', 'asap', 'critical', 'emergency', 'important', 'deadline', 'today', 'now', 'immediately'];
  const highPriorityKeywords = ['bug', 'fix', 'error', 'issue', 'problem', 'broken', 'crash', 'security'];

  // Check for urgent keywords
  if (urgentKeywords.some(keyword => text.includes(keyword))) {
    return { priority: 'HIGH', confidence: 90, reason: 'Contains urgent keywords' };
  }

  // Check for high priority keywords
  if (highPriorityKeywords.some(keyword => text.includes(keyword))) {
    return { priority: 'HIGH', confidence: 80, reason: 'Contains critical issue keywords' };
  }

  // Check due date
  if (task.due_at) {
    const dueDate = new Date(task.due_at);
    const now = new Date();
    const hoursUntilDue = (dueDate - now) / (1000 * 60 * 60);

    if (hoursUntilDue < 24 && hoursUntilDue > 0) {
      return { priority: 'HIGH', confidence: 85, reason: 'Due within 24 hours' };
    } else if (hoursUntilDue < 72 && hoursUntilDue > 0) {
      return { priority: 'MEDIUM', confidence: 75, reason: 'Due within 3 days' };
    }
  }

  // Low priority keywords
  const lowPriorityKeywords = ['maybe', 'someday', 'consider', 'idea', 'nice to have', 'optional'];
  if (lowPriorityKeywords.some(keyword => text.includes(keyword))) {
    return { priority: 'LOW', confidence: 70, reason: 'Contains low priority indicators' };
  }

  return { priority: 'MEDIUM', confidence: 60, reason: 'Default priority' };
};

export const suggestTags = (task) => {
  const title = task.title.toLowerCase();
  const description = (task.description || '').toLowerCase();
  const text = `${title} ${description}`;

  const tagSuggestions = [];

  // Category-based tags
  const categories = {
    'work': ['work', 'office', 'meeting', 'project', 'client', 'business'],
    'personal': ['personal', 'home', 'family', 'self'],
    'development': ['code', 'develop', 'programming', 'bug', 'feature', 'api', 'database'],
    'design': ['design', 'ui', 'ux', 'mockup', 'wireframe', 'prototype'],
    'documentation': ['document', 'docs', 'readme', 'guide', 'manual'],
    'testing': ['test', 'qa', 'quality', 'verify', 'check'],
    'urgent': ['urgent', 'asap', 'critical', 'emergency'],
    'research': ['research', 'investigate', 'explore', 'study', 'learn'],
    'meeting': ['meeting', 'call', 'discussion', 'sync'],
    'review': ['review', 'feedback', 'approve', 'check']
  };

  Object.entries(categories).forEach(([tag, keywords]) => {
    if (keywords.some(keyword => text.includes(keyword))) {
      tagSuggestions.push(tag);
    }
  });

  return tagSuggestions.slice(0, 3); // Return top 3 suggestions
};

export const estimateCompletionTime = (task, historicalTasks = []) => {
  // Simple estimation based on title length and historical data
  const titleLength = task.title.length;
  const hasDescription = task.description && task.description.length > 0;

  // Base estimation
  let estimatedHours = 2; // Default 2 hours

  if (titleLength < 20) {
    estimatedHours = 1;
  } else if (titleLength > 50) {
    estimatedHours = 4;
  }

  if (hasDescription) {
    estimatedHours += 1;
  }

  // Adjust based on priority
  if (task.priority === 'HIGH') {
    estimatedHours *= 1.2; // High priority tasks often take longer
  }

  // Check historical similar tasks
  const similarTasks = historicalTasks.filter(t => {
    if (!t.completed || !t.completed_at || !t.created_at) return false;
    const similarity = calculateSimilarity(task.title, t.title);
    return similarity > 0.5;
  });

  if (similarTasks.length > 0) {
    const avgTime = similarTasks.reduce((sum, t) => {
      const created = new Date(t.created_at);
      const completed = new Date(t.completed_at);
      const hours = (completed - created) / (1000 * 60 * 60);
      return sum + hours;
    }, 0) / similarTasks.length;

    estimatedHours = Math.round((estimatedHours + avgTime) / 2);
  }

  return Math.max(1, Math.round(estimatedHours));
};

const calculateSimilarity = (str1, str2) => {
  const words1 = str1.toLowerCase().split(' ');
  const words2 = str2.toLowerCase().split(' ');
  const commonWords = words1.filter(word => words2.includes(word));
  return commonWords.length / Math.max(words1.length, words2.length);
};

export const suggestDeadline = (task) => {
  const priority = task.priority || 'MEDIUM';
  const now = new Date();

  let daysToAdd = 7; // Default 1 week

  switch (priority) {
    case 'HIGH':
      daysToAdd = 2;
      break;
    case 'MEDIUM':
      daysToAdd = 5;
      break;
    case 'LOW':
      daysToAdd = 14;
      break;
  }

  const suggestedDate = new Date(now);
  suggestedDate.setDate(suggestedDate.getDate() + daysToAdd);
  suggestedDate.setHours(17, 0, 0, 0); // Set to 5 PM

  return suggestedDate.toISOString();
};

export const getSmartRecommendations = (tasks, currentUser) => {
  const recommendations = [];

  // Check for overdue tasks
  const overdueTasks = tasks.filter(t => {
    if (!t.due_at || t.completed) return false;
    return new Date(t.due_at) < new Date();
  });

  if (overdueTasks.length > 0) {
    recommendations.push({
      type: 'warning',
      title: 'Overdue Tasks',
      message: `You have ${overdueTasks.length} overdue task(s). Consider rescheduling or completing them.`,
      action: 'View Overdue',
      priority: 'high'
    });
  }

  // Check for tasks without deadlines
  const noDeadlineTasks = tasks.filter(t => !t.due_at && !t.completed);
  if (noDeadlineTasks.length > 3) {
    recommendations.push({
      type: 'info',
      title: 'Add Deadlines',
      message: `${noDeadlineTasks.length} tasks don't have deadlines. Adding deadlines helps with planning.`,
      action: 'Add Deadlines',
      priority: 'medium'
    });
  }

  // Check for high priority pending tasks
  const highPriorityPending = tasks.filter(t => t.priority === 'HIGH' && !t.completed);
  if (highPriorityPending.length > 5) {
    recommendations.push({
      type: 'warning',
      title: 'Too Many High Priority Tasks',
      message: `You have ${highPriorityPending.length} high priority tasks. Consider re-prioritizing.`,
      action: 'Review Priorities',
      priority: 'high'
    });
  }

  // Productivity insights
  const completedToday = tasks.filter(t => {
    if (!t.completed || !t.completed_at) return false;
    const completedDate = new Date(t.completed_at);
    const today = new Date();
    return completedDate.toDateString() === today.toDateString();
  });

  if (completedToday.length >= 5) {
    recommendations.push({
      type: 'success',
      title: 'Great Productivity!',
      message: `You've completed ${completedToday.length} tasks today. Keep up the great work!`,
      action: 'View Stats',
      priority: 'low'
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

export const autoCategorizeTasks = (tasks) => {
  return tasks.map(task => {
    const suggestions = suggestTags(task);
    const prioritySuggestion = suggestPriority(task);

    return {
      ...task,
      aiSuggestions: {
        tags: suggestions,
        priority: prioritySuggestion,
        estimatedTime: estimateCompletionTime(task, tasks)
      }
    };
  });
};
