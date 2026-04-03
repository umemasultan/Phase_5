// Notification utility functions

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const showNotification = (title, options = {}) => {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      ...options
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    return notification;
  }
};

export const scheduleTaskReminder = (task) => {
  if (!task.due_at) return;

  const dueDate = new Date(task.due_at);
  const now = new Date();
  const timeUntilDue = dueDate - now;

  // Remind 1 hour before
  const reminderTime = timeUntilDue - (60 * 60 * 1000);

  if (reminderTime > 0) {
    setTimeout(() => {
      showNotification('Task Reminder', {
        body: `"${task.title}" is due in 1 hour!`,
        tag: `task-${task.id}`,
        requireInteraction: true
      });
    }, reminderTime);
  }

  // Remind at due time
  if (timeUntilDue > 0) {
    setTimeout(() => {
      showNotification('Task Due Now!', {
        body: `"${task.title}" is due now!`,
        tag: `task-${task.id}`,
        requireInteraction: true
      });
    }, timeUntilDue);
  }
};

export const checkOverdueTasks = (tasks) => {
  const now = new Date();
  const overdueTasks = tasks.filter(task => {
    if (!task.due_at || task.completed) return false;
    return new Date(task.due_at) < now;
  });

  if (overdueTasks.length > 0) {
    showNotification('Overdue Tasks!', {
      body: `You have ${overdueTasks.length} overdue task(s)`,
      tag: 'overdue-tasks',
      requireInteraction: true
    });
  }

  return overdueTasks;
};

export const notifyTaskCreated = (task) => {
  showNotification('Task Created', {
    body: `"${task.title}" has been added to your tasks`,
    tag: `task-created-${task.id}`
  });
};

export const notifyTaskCompleted = (task) => {
  showNotification('Task Completed! 🎉', {
    body: `Great job completing "${task.title}"!`,
    tag: `task-completed-${task.id}`
  });
};
