// Export and Import utilities for tasks

export const exportToJSON = (tasks) => {
  const dataStr = JSON.stringify(tasks, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `tasks-backup-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportToCSV = (tasks) => {
  const headers = ['ID', 'Title', 'Description', 'Priority', 'Status', 'Tags', 'Due Date', 'Created At'];
  const rows = tasks.map(task => [
    task.id,
    task.title,
    task.description || '',
    task.priority,
    task.completed ? 'Completed' : 'Pending',
    Array.isArray(task.tags) ? task.tags.join('; ') : '',
    task.due_at || '',
    task.created_at || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `tasks-export-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

export const importFromJSON = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const tasks = JSON.parse(e.target.result);
      if (Array.isArray(tasks)) {
        callback(tasks, null);
      } else {
        callback(null, 'Invalid JSON format. Expected an array of tasks.');
      }
    } catch (error) {
      callback(null, 'Failed to parse JSON file: ' + error.message);
    }
  };
  reader.readAsText(file);
};

export const backupToLocalStorage = (tasks) => {
  try {
    const backup = {
      tasks,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    localStorage.setItem('tasksBackup', JSON.stringify(backup));
    return true;
  } catch (error) {
    console.error('Backup failed:', error);
    return false;
  }
};

export const restoreFromLocalStorage = () => {
  try {
    const backup = localStorage.getItem('tasksBackup');
    if (backup) {
      const parsed = JSON.parse(backup);
      return parsed.tasks;
    }
    return null;
  } catch (error) {
    console.error('Restore failed:', error);
    return null;
  }
};
