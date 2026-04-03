// Advanced Analytics Utilities

export const calculateProductivityScore = (tasks) => {
  if (tasks.length === 0) return 0;

  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const completionRate = (completed / total) * 100;

  // Calculate on-time completion rate
  const completedTasks = tasks.filter(t => t.completed);
  const onTimeCompletions = completedTasks.filter(task => {
    if (!task.due_at || !task.completed_at) return true;
    return new Date(task.completed_at) <= new Date(task.due_at);
  }).length;

  const onTimeRate = completedTasks.length > 0
    ? (onTimeCompletions / completedTasks.length) * 100
    : 100;

  // Weighted score
  const score = (completionRate * 0.6) + (onTimeRate * 0.4);
  return Math.round(score);
};

export const getTasksByPriority = (tasks) => {
  return {
    high: tasks.filter(t => t.priority === 'HIGH'),
    medium: tasks.filter(t => t.priority === 'MEDIUM'),
    low: tasks.filter(t => t.priority === 'LOW')
  };
};

export const getTaskTrends = (tasks, days = 7) => {
  const now = new Date();
  const trends = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const dayTasks = tasks.filter(task => {
      const createdAt = new Date(task.created_at);
      return createdAt >= date && createdAt < nextDate;
    });

    const completed = dayTasks.filter(t => t.completed).length;

    trends.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      created: dayTasks.length,
      completed: completed,
      pending: dayTasks.length - completed
    });
  }

  return trends;
};

export const getAverageCompletionTime = (tasks) => {
  const completedTasks = tasks.filter(t => t.completed && t.completed_at && t.created_at);

  if (completedTasks.length === 0) return 0;

  const totalTime = completedTasks.reduce((sum, task) => {
    const created = new Date(task.created_at);
    const completed = new Date(task.completed_at);
    const hours = (completed - created) / (1000 * 60 * 60);
    return sum + hours;
  }, 0);

  return Math.round(totalTime / completedTasks.length);
};

export const getUpcomingDeadlines = (tasks, days = 7) => {
  const now = new Date();
  const futureDate = new Date(now);
  futureDate.setDate(futureDate.getDate() + days);

  return tasks.filter(task => {
    if (!task.due_at || task.completed) return false;
    const dueDate = new Date(task.due_at);
    return dueDate >= now && dueDate <= futureDate;
  }).sort((a, b) => new Date(a.due_at) - new Date(b.due_at));
};

export const getTasksByTag = (tasks) => {
  const tagMap = {};

  tasks.forEach(task => {
    if (task.tags && task.tags.length > 0) {
      task.tags.forEach(tag => {
        if (!tagMap[tag]) {
          tagMap[tag] = { total: 0, completed: 0 };
        }
        tagMap[tag].total++;
        if (task.completed) {
          tagMap[tag].completed++;
        }
      });
    }
  });

  return Object.entries(tagMap).map(([tag, stats]) => ({
    tag,
    total: stats.total,
    completed: stats.completed,
    completionRate: Math.round((stats.completed / stats.total) * 100)
  })).sort((a, b) => b.total - a.total);
};

export const getPriorityDistribution = (tasks) => {
  const total = tasks.length;
  if (total === 0) return { high: 0, medium: 0, low: 0 };

  const high = tasks.filter(t => t.priority === 'HIGH').length;
  const medium = tasks.filter(t => t.priority === 'MEDIUM').length;
  const low = tasks.filter(t => t.priority === 'LOW').length;

  return {
    high: Math.round((high / total) * 100),
    medium: Math.round((medium / total) * 100),
    low: Math.round((low / total) * 100)
  };
};

export const getStreakData = (tasks) => {
  const completedTasks = tasks
    .filter(t => t.completed && t.completed_at)
    .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at));

  if (completedTasks.length === 0) return { current: 0, longest: 0 };

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;
  let lastDate = new Date(completedTasks[0].completed_at);
  lastDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if streak is still active
  const daysSinceLastCompletion = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
  if (daysSinceLastCompletion <= 1) {
    currentStreak = 1;
  }

  for (let i = 1; i < completedTasks.length; i++) {
    const currentDate = new Date(completedTasks[i].completed_at);
    currentDate.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((lastDate - currentDate) / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      tempStreak++;
      if (i === 1 && daysSinceLastCompletion <= 1) {
        currentStreak = tempStreak;
      }
    } else if (daysDiff > 1) {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }

    lastDate = currentDate;
  }

  longestStreak = Math.max(longestStreak, tempStreak);

  return { current: currentStreak, longest: longestStreak };
};
