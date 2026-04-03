import { useState } from 'react';

export default function KanbanBoard({ tasks, onUpdateTask, darkMode, theme }) {
  const [draggedTask, setDraggedTask] = useState(null);

  const columns = {
    todo: { title: 'To Do', status: 'pending', color: '#f59e0b' },
    inProgress: { title: 'In Progress', status: 'in_progress', color: '#3b82f6' },
    done: { title: 'Done', status: 'completed', color: '#10b981' }
  };

  const getTasksByStatus = (status) => {
    if (status === 'pending') {
      return tasks.filter(t => !t.completed && !t.status);
    } else if (status === 'in_progress') {
      return tasks.filter(t => !t.completed && t.status === 'in_progress');
    } else if (status === 'completed') {
      return tasks.filter(t => t.completed);
    }
    return [];
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    if (draggedTask) {
      const updatedTask = {
        ...draggedTask,
        completed: status === 'completed',
        status: status === 'in_progress' ? 'in_progress' : null
      };
      onUpdateTask(updatedTask);
      setDraggedTask(null);
    }
  };

  const priorityColors = {
    LOW: '#10b981',
    MEDIUM: '#f59e0b',
    HIGH: '#ef4444'
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '25px',
      marginTop: '30px'
    }}>
      {Object.entries(columns).map(([key, column]) => (
        <div
          key={key}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.status)}
          style={{
            background: darkMode ? 'rgba(23, 21, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
            borderRadius: '20px',
            padding: '25px',
            minHeight: '500px',
            border: darkMode ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid rgba(23, 21, 59, 0.08)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: `2px solid ${column.color}`
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: column.color
            }} />
            <h3 style={{
              color: darkMode ? '#ffffff' : theme.primary,
              fontSize: '18px',
              fontWeight: '800',
              margin: 0
            }}>
              {column.title}
            </h3>
            <span style={{
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(23,21,59,0.08)',
              color: darkMode ? '#ffffff' : theme.primary,
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: '700'
            }}>
              {getTasksByStatus(column.status).length}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {getTasksByStatus(column.status).map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
                style={{
                  background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                  borderRadius: '16px',
                  padding: '20px',
                  cursor: 'grab',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(23, 21, 59, 0.08)',
                  transition: 'all 0.3s',
                  boxShadow: darkMode ? '0 4px 15px rgba(0,0,0,0.2)' : '0 2px 10px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = darkMode ? '0 8px 25px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = darkMode ? '0 4px 15px rgba(0,0,0,0.2)' : '0 2px 10px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <h4 style={{
                    color: darkMode ? '#ffffff' : '#1f2937',
                    fontSize: '16px',
                    fontWeight: '700',
                    margin: 0,
                    flex: 1
                  }}>
                    {task.title}
                  </h4>
                  <span style={{
                    background: priorityColors[task.priority],
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '700',
                    marginLeft: '10px'
                  }}>
                    {task.priority}
                  </span>
                </div>

                {task.description && (
                  <p style={{
                    color: darkMode ? 'rgba(255,255,255,0.7)' : '#6b7280',
                    fontSize: '14px',
                    margin: '0 0 12px 0',
                    lineHeight: '1.5'
                  }}>
                    {task.description.length > 80 ? task.description.substring(0, 80) + '...' : task.description}
                  </p>
                )}

                {task.tags && task.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                    {task.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} style={{
                        background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(23,21,59,0.08)',
                        color: darkMode ? '#ffffff' : theme.primary,
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {task.due_at && (
                  <div style={{
                    marginTop: '12px',
                    paddingTop: '12px',
                    borderTop: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(23,21,59,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: darkMode ? 'rgba(255,255,255,0.6)' : '#6b7280',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    📅 {new Date(task.due_at).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
