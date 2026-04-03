import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import taskApi from '../services/taskApi';
import { suggestPriority, suggestTags, estimateCompletionTime } from '../utils/aiFeatures';
import { notifyTaskCreated, notifyTaskCompleted, scheduleTaskReminder } from '../utils/notifications';
import { exportToJSON, exportToCSV, importFromJSON, backupToLocalStorage } from '../utils/exportImport';
import KanbanBoard from '../components/KanbanBoard';

export default function Tasks() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    tags: '',
    due_at: ''
  });
  const [filter, setFilter] = useState({ priority: '', status: '', search: '' });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'
  const [showExportMenu, setShowExportMenu] = useState(false);

  const priorityColors = {
    LOW: { bg: '#10b981', light: '#d1fae5', dark: '#065f46' },
    MEDIUM: { bg: '#f59e0b', light: '#fef3c7', dark: '#92400e' },
    HIGH: { bg: '#ef4444', light: '#fee2e2', dark: '#991b1b' }
  };

  useEffect(() => {
    setMounted(true);

    // Check if user is logged in
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/login');
      return;
    }
    setCurrentUser(JSON.parse(user));

    fetchTasks();
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }
  }, [router]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/login');
  };

  const getAiSuggestions = () => {
    if (!newTask.title) {
      alert('Please enter a task title first');
      return;
    }

    const prioritySuggestion = suggestPriority(newTask);
    const tagSuggestions = suggestTags(newTask);
    const estimatedTime = estimateCompletionTime(newTask, tasks);

    setAiSuggestions({
      priority: prioritySuggestion,
      tags: tagSuggestions,
      estimatedTime
    });
    setShowAiSuggestions(true);
  };

  const applyAiSuggestions = () => {
    if (aiSuggestions) {
      setNewTask({
        ...newTask,
        priority: aiSuggestions.priority.priority,
        tags: aiSuggestions.tags.join(', ')
      });
      setShowAiSuggestions(false);
    }
  };

  const handleExportJSON = () => {
    exportToJSON(tasks);
    setShowExportMenu(false);
  };

  const handleExportCSV = () => {
    exportToCSV(tasks);
    setShowExportMenu(false);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importFromJSON(file, (importedTasks, error) => {
        if (error) {
          alert(error);
        } else {
          setTasks(importedTasks);
          backupToLocalStorage(importedTasks);
          alert(`Successfully imported ${importedTasks.length} tasks!`);
        }
      });
    }
  };

  const handleBackup = () => {
    const success = backupToLocalStorage(tasks);
    if (success) {
      alert('Backup created successfully!');
    } else {
      alert('Backup failed. Please try again.');
    }
    setShowExportMenu(false);
  };

  const theme = {
    dark: {
      primary: '#17153B',
      primaryLight: '#2E236C',
      accent: '#433D8B',
      background: 'linear-gradient(135deg, #0a0818 0%, #17153B 50%, #2E236C 100%)',
      cardBg: 'rgba(23, 21, 59, 0.85)',
      text: '#ffffff',
      cardText: '#ffffff',
      navBg: 'rgba(10, 8, 24, 0.8)',
      navText: 'white'
    },
    light: {
      primary: '#17153B',
      primaryLight: '#2E236C',
      accent: '#433D8B',
      background: 'linear-gradient(135deg, #f8f7fc 0%, #eeecf7 50%, #e4e1f1 100%)',
      cardBg: '#ffffff',
      text: '#1f2937',
      cardText: '#1f2937',
      navBg: 'rgba(255, 255, 255, 0.9)',
      navText: '#17153B'
    }
  };

  const currentTheme = darkMode ? theme.dark : theme.light;

  const fetchTasks = async () => {
    try {
      const apiTasks = await taskApi.getAllTasks('user1');
      setTasks(apiTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    const taskData = {
      ...newTask,
      priority: newTask.priority,
      tags: newTask.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      user_id: 'user1',
      completed: false,
      due_at: newTask.due_at || null
    };

    try {
      const createdTask = await taskApi.createTask(taskData);
      setTasks([createdTask, ...tasks]);

      // Show notification
      notifyTaskCreated(createdTask);

      // Schedule reminder if due date exists
      if (createdTask.due_at) {
        scheduleTaskReminder(createdTask);
      }

      setNewTask({
        title: '',
        description: '',
        priority: 'MEDIUM',
        tags: '',
        due_at: ''
      });
      setShowCreateForm(false);
      setShowAiSuggestions(false);
      setAiSuggestions(null);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
    }
  };

  const handleToggleComplete = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    const updatedTask = {
      ...task,
      completed: !task.completed,
      completed_at: !task.completed ? new Date().toISOString() : null
    };

    try {
      await taskApi.updateTask(taskId, updatedTask);
      setTasks(tasks.map(t =>
        t.id === taskId ? { ...t, completed: !t.completed, completed_at: updatedTask.completed_at } : t
      ));

      // Show notification on completion
      if (!task.completed) {
        notifyTaskCompleted(task);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskApi.deleteTask(taskId);
        setTasks(tasks.filter(t => t.id !== taskId));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesPriority = !filter.priority || task.priority === filter.priority;
    const matchesStatus = !filter.status ||
      (filter.status === 'completed' ? task.completed : !task.completed);
    const matchesSearch = !filter.search ||
      task.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(filter.search.toLowerCase()));

    return matchesPriority && matchesStatus && matchesSearch;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    high: tasks.filter(t => t.priority === 'HIGH' && !t.completed).length
  };

  if (!mounted) return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.background,
      fontFamily: 'Inter, sans-serif',
      transition: 'all 0.3s',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Head>
        <title>Tasks - TaskMaster Pro</title>
        <meta name="description" content="Manage your tasks" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: darkMode ? 'radial-gradient(circle, rgba(58, 26, 92, 0.2) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(33, 15, 55, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 20s ease-in-out infinite',
        zIndex: 0
      }} />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
        .hover-scale {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-scale:hover {
          transform: scale(1.02);
        }
      `}</style>

      {/* Navigation */}
      <nav style={{
        padding: '20px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: currentTheme.navBg,
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: darkMode ? '0 4px 30px rgba(0, 0, 0, 0.3)' : '0 2px 20px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          padding: '0 60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }} onClick={() => router.push('/')}>
          <div style={{
            width: '50px',
            height: '50px',
            background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)`,
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            fontWeight: '900',
            color: 'white',
            boxShadow: '0 8px 25px rgba(33, 15, 55, 0.4)'
          }}>T</div>
          <div>
            <h2 style={{ color: currentTheme.navText, margin: 0, fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>TaskMaster Pro</h2>
            <p style={{ margin: 0, fontSize: '11px', color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(33, 15, 55, 0.5)', fontWeight: '600', letterSpacing: '0.5px' }}>TASK MANAGEMENT</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={toggleDarkMode} style={{
            background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(23, 21, 59, 0.08)',
            color: currentTheme.navText,
            border: 'none',
            padding: '12px 18px',
            borderRadius: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '18px',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s'
          }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button onClick={() => router.push('/dashboard')} style={{
            background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(23, 21, 59, 0.08)',
            color: currentTheme.navText,
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s'
          }}>Dashboard</button>
          <button onClick={() => router.push('/audit')} style={{
            background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(23, 21, 59, 0.08)',
            color: currentTheme.navText,
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s'
          }}>Audit</button>
          <button onClick={() => router.push('/analytics')} style={{
            background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(23, 21, 59, 0.08)',
            color: currentTheme.navText,
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s'
          }}>Analytics</button>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowExportMenu(!showExportMenu)} style={{
              background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)`,
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>⬇️ Export</button>
            {showExportMenu && (
              <div style={{
                position: 'absolute',
                top: '60px',
                right: 0,
                background: currentTheme.cardBg,
                borderRadius: '12px',
                padding: '10px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(23, 21, 59, 0.08)',
                minWidth: '180px',
                zIndex: 100
              }}>
                <button onClick={handleExportJSON} style={{
                  width: '100%',
                  background: 'transparent',
                  color: currentTheme.text,
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }} onMouseEnter={(e) => e.target.style.background = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(23,21,59,0.05)'}
                   onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                  📄 Export JSON
                </button>
                <button onClick={handleExportCSV} style={{
                  width: '100%',
                  background: 'transparent',
                  color: currentTheme.text,
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }} onMouseEnter={(e) => e.target.style.background = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(23,21,59,0.05)'}
                   onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                  📊 Export CSV
                </button>
                <button onClick={handleBackup} style={{
                  width: '100%',
                  background: 'transparent',
                  color: currentTheme.text,
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }} onMouseEnter={(e) => e.target.style.background = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(23,21,59,0.05)'}
                   onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                  💾 Backup
                </button>
                <label style={{
                  width: '100%',
                  display: 'block',
                  color: currentTheme.text,
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }} onMouseEnter={(e) => e.target.style.background = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(23,21,59,0.05)'}
                   onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                  📥 Import
                  <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
                </label>
              </div>
            )}
          </div>
          <button onClick={handleLogout} style={{
            background: '#fee2e2',
            color: '#dc2626',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}>Logout</button>
        </div>
      </div>
      </nav>

      <main style={{
        padding: '60px 0',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ padding: '0 60px' }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '25px',
          marginBottom: '40px'
        }}>
          {[
            { label: 'TOTAL TASKS', value: stats.total, color: currentTheme.primary, icon: '📋' },
            { label: 'COMPLETED', value: stats.completed, color: '#10b981', icon: '✓' },
            { label: 'PENDING', value: stats.pending, color: '#f59e0b', icon: '⏳' },
            { label: 'HIGH PRIORITY', value: stats.high, color: '#ef4444', icon: '🔥' }
          ].map((stat, index) => (
            <div key={index} className="hover-scale" style={{
              background: currentTheme.cardBg,
              borderRadius: '20px',
              padding: '30px',
              boxShadow: darkMode ? '0 10px 40px rgba(0,0,0,0.2)' : '0 8px 30px rgba(0,0,0,0.08)',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(33, 15, 55, 0.08)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                fontSize: '80px',
                opacity: '0.1'
              }}>{stat.icon}</div>
              <div style={{ fontSize: '13px', color: darkMode ? '#ffffff' : '#6b7280', fontWeight: '700', marginBottom: '12px', letterSpacing: '1px' }}>{stat.label}</div>
              <div style={{ fontSize: '42px', fontWeight: '900', color: stat.color, position: 'relative', zIndex: 1 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div style={{
          background: currentTheme.cardBg,
          borderRadius: '20px',
          padding: '35px',
          marginBottom: '35px',
          boxShadow: darkMode ? '0 10px 40px rgba(0,0,0,0.2)' : '0 8px 30px rgba(0,0,0,0.08)',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(33, 15, 55, 0.08)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '25px' }}>
            <h2 style={{ margin: 0, fontSize: '32px', fontWeight: '900', color: currentTheme.cardText, letterSpacing: '-0.5px' }}>My Tasks</h2>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(23,21,59,0.08)', borderRadius: '12px', padding: '4px' }}>
                <button onClick={() => setViewMode('list')} style={{
                  background: viewMode === 'list' ? `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)` : 'transparent',
                  color: viewMode === 'list' ? 'white' : currentTheme.text,
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.3s'
                }}>
                  📋 List
                </button>
                <button onClick={() => setViewMode('kanban')} style={{
                  background: viewMode === 'kanban' ? `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)` : 'transparent',
                  color: viewMode === 'kanban' ? 'white' : currentTheme.text,
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.3s'
                }}>
                  📊 Kanban
                </button>
              </div>
              <button onClick={() => setShowCreateForm(!showCreateForm)} style={{
                background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)`,
                color: 'white',
                border: 'none',
                padding: '16px 35px',
                borderRadius: '14px',
                fontWeight: '800',
                cursor: 'pointer',
                fontSize: '16px',
                boxShadow: '0 8px 25px rgba(33, 15, 55, 0.35)',
                letterSpacing: '0.3px',
                transition: 'all 0.3s'
              }}>
                {showCreateForm ? '✕ Cancel' : '+ New Task'}
              </button>
            </div>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="🔍 Search tasks..."
              style={{
                flex: 1,
                minWidth: '280px',
                padding: '16px 24px',
                borderRadius: '14px',
                border: darkMode ? '2px solid rgba(255,255,255,0.2)' : '2px solid #e5e7eb',
                fontSize: '15px',
                outline: 'none',
                fontWeight: '500',
                transition: 'all 0.3s',
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                color: darkMode ? 'white' : '#1f2937'
              }}
              value={filter.search}
              onChange={(e) => setFilter({...filter, search: e.target.value})}
            />
            <select
              style={{
                padding: '16px 24px',
                borderRadius: '14px',
                border: darkMode ? '2px solid rgba(255,255,255,0.2)' : '2px solid #e5e7eb',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                outline: 'none',
                minWidth: '180px',
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                color: darkMode ? 'white' : '#1f2937'
              }}
              value={filter.priority}
              onChange={(e) => setFilter({...filter, priority: e.target.value})}
            >
              <option value="">All Priorities</option>
              <option value="HIGH">🔴 High</option>
              <option value="MEDIUM">🟡 Medium</option>
              <option value="LOW">🟢 Low</option>
            </select>
            <select
              style={{
                padding: '16px 24px',
                borderRadius: '14px',
                border: darkMode ? '2px solid rgba(255,255,255,0.2)' : '2px solid #e5e7eb',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                outline: 'none',
                minWidth: '180px',
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                color: darkMode ? 'white' : '#1f2937'
              }}
              value={filter.status}
              onChange={(e) => setFilter({...filter, status: e.target.value})}
            >
              <option value="">All Status</option>
              <option value="completed">✓ Completed</option>
              <option value="pending">⏳ Pending</option>
            </select>
          </div>
        </div>

        {/* Create Task Form */}
        {showCreateForm && (
          <div className="slide-in" style={{
            background: currentTheme.cardBg,
            borderRadius: '20px',
            padding: '40px',
            marginBottom: '35px',
            boxShadow: darkMode ? '0 10px 40px rgba(0,0,0,0.2)' : '0 8px 30px rgba(0,0,0,0.08)',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(33, 15, 55, 0.08)'
          }}>
            <h3 style={{ margin: '0 0 25px 0', fontSize: '26px', fontWeight: '800', color: currentTheme.cardText }}>Create New Task</h3>
            <form onSubmit={handleCreateTask}>
              <input
                type="text"
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  marginBottom: '20px',
                  borderRadius: '14px',
                  border: darkMode ? '2px solid rgba(255,255,255,0.2)' : '2px solid #e5e7eb',
                  fontSize: '16px',
                  outline: 'none',
                  fontWeight: '600',
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                  color: darkMode ? 'white' : '#1f2937'
                }}
                required
              />
              <textarea
                placeholder="Task description (optional)"
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  marginBottom: '20px',
                  borderRadius: '14px',
                  border: darkMode ? '2px solid rgba(255,255,255,0.2)' : '2px solid #e5e7eb',
                  fontSize: '16px',
                  minHeight: '120px',
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500',
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                  color: darkMode ? 'white' : '#1f2937'
                }}
              />
              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  style={{
                    padding: '16px 24px',
                    borderRadius: '14px',
                    border: darkMode ? '2px solid rgba(255,255,255,0.2)' : '2px solid #e5e7eb',
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    outline: 'none',
                    flex: 1,
                    minWidth: '200px',
                    background: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                    color: darkMode ? 'white' : '#1f2937'
                  }}
                >
                  <option value="LOW">🟢 Low Priority</option>
                  <option value="MEDIUM">🟡 Medium Priority</option>
                  <option value="HIGH">🔴 High Priority</option>
                </select>
                <input
                  type="datetime-local"
                  value={newTask.due_at ? newTask.due_at.replace('Z', '').substring(0, 16) : ''}
                  onChange={(e) => setNewTask({...newTask, due_at: e.target.value})}
                  style={{
                    padding: '16px 24px',
                    borderRadius: '14px',
                    border: darkMode ? '2px solid rgba(255,255,255,0.2)' : '2px solid #e5e7eb',
                    fontSize: '15px',
                    outline: 'none',
                    flex: 1,
                    minWidth: '200px',
                    background: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                    color: darkMode ? 'white' : '#1f2937'
                  }}
                />
              </div>
              <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={newTask.tags}
                onChange={(e) => setNewTask({...newTask, tags: e.target.value})}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  marginBottom: '25px',
                  borderRadius: '14px',
                  border: darkMode ? '2px solid rgba(255,255,255,0.2)' : '2px solid #e5e7eb',
                  fontSize: '15px',
                  outline: 'none',
                  fontWeight: '500',
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                  color: darkMode ? 'white' : '#1f2937'
                }}
              />

              {/* AI Suggestions Button */}
              <button
                type="button"
                onClick={getAiSuggestions}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: 'white',
                  padding: '16px',
                  border: 'none',
                  borderRadius: '14px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  fontSize: '15px',
                  marginBottom: '20px',
                  letterSpacing: '0.3px'
                }}
              >
                🤖 Get AI Suggestions
              </button>

              {/* AI Suggestions Display */}
              {showAiSuggestions && aiSuggestions && (
                <div style={{
                  background: darkMode ? 'rgba(59, 130, 246, 0.1)' : '#eff6ff',
                  border: '2px solid #3b82f6',
                  borderRadius: '14px',
                  padding: '20px',
                  marginBottom: '20px'
                }}>
                  <h4 style={{ color: darkMode ? '#ffffff' : currentTheme.text, fontSize: '16px', fontWeight: '800', margin: '0 0 15px 0' }}>
                    🤖 AI Suggestions
                  </h4>
                  <div style={{ marginBottom: '12px' }}>
                    <strong style={{ color: darkMode ? '#ffffff' : currentTheme.text }}>Priority:</strong>
                    <span style={{
                      marginLeft: '10px',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      background: aiSuggestions.priority.priority === 'HIGH' ? '#ef4444' :
                                 aiSuggestions.priority.priority === 'MEDIUM' ? '#f59e0b' : '#10b981',
                      color: 'white',
                      fontSize: '13px',
                      fontWeight: '700'
                    }}>
                      {aiSuggestions.priority.priority}
                    </span>
                    <span style={{ marginLeft: '10px', color: darkMode ? '#ffffff' : '#6b7280', fontSize: '13px' }}>
                      ({aiSuggestions.priority.confidence}% confidence)
                    </span>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <strong style={{ color: darkMode ? '#ffffff' : currentTheme.text }}>Suggested Tags:</strong>
                    <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {aiSuggestions.tags.map((tag, i) => (
                        <span key={i} style={{
                          background: '#3b82f6',
                          color: 'white',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: '600'
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <strong style={{ color: darkMode ? '#ffffff' : currentTheme.text }}>Estimated Time:</strong>
                    <span style={{ marginLeft: '10px', color: darkMode ? '#ffffff' : '#6b7280' }}>
                      ~{aiSuggestions.estimatedTime} hour(s)
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: darkMode ? '#ffffff' : '#6b7280', marginBottom: '15px' }}>
                    <strong>Reason:</strong> {aiSuggestions.priority.reason}
                  </div>
                  <button
                    type="button"
                    onClick={applyAiSuggestions}
                    style={{
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      padding: '10px 24px',
                      borderRadius: '10px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    ✓ Apply Suggestions
                  </button>
                </div>
              )}

              <button
                type="submit"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)`,
                  color: 'white',
                  padding: '18px 45px',
                  border: 'none',
                  borderRadius: '14px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  fontSize: '16px',
                  boxShadow: '0 8px 25px rgba(33, 15, 55, 0.35)',
                  letterSpacing: '0.3px'
                }}
              >
                Create Task
              </button>
            </form>
          </div>
        )}

        {/* Tasks List or Kanban View */}
        {viewMode === 'kanban' ? (
          <KanbanBoard
            tasks={filteredTasks}
            onUpdateTask={async (updatedTask) => {
              try {
                await taskApi.updateTask(updatedTask.id, updatedTask);
                setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
                if (updatedTask.completed) {
                  notifyTaskCompleted(updatedTask);
                }
              } catch (error) {
                console.error('Error updating task:', error);
              }
            }}
            darkMode={darkMode}
            theme={currentTheme}
          />
        ) : (
          <div style={{ display: 'grid', gap: '25px' }}>
          {loading ? (
            <div style={{
              background: currentTheme.cardBg,
              borderRadius: '20px',
              padding: '60px',
              textAlign: 'center',
              color: darkMode ? '#ffffff' : '#6b7280',
              fontSize: '18px',
              fontWeight: '600'
            }}>Loading tasks...</div>
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className="hover-scale"
                style={{
                  background: currentTheme.cardBg,
                  borderRadius: '20px',
                  padding: '30px',
                  boxShadow: darkMode ? '0 10px 40px rgba(0,0,0,0.2)' : '0 8px 30px rgba(0,0,0,0.08)',
                  borderLeft: `6px solid ${priorityColors[task.priority].bg}`,
                  opacity: task.completed ? 0.6 : 1,
                  transition: 'all 0.3s',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(33, 15, 55, 0.08)',
                  animation: `slideIn 0.5s ease-out ${index * 0.1}s forwards`,
                  opacity: 0
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '25px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '15px' }}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                        style={{
                          width: '26px',
                          height: '26px',
                          cursor: 'pointer',
                          accentColor: currentTheme.primary
                        }}
                      />
                      <h3 style={{
                        margin: 0,
                        fontSize: '22px',
                        fontWeight: '800',
                        color: currentTheme.cardText,
                        textDecoration: task.completed ? 'line-through' : 'none',
                        letterSpacing: '-0.3px'
                      }}>{task.title}</h3>
                    </div>
                    {task.description && (
                      <p style={{
                        margin: '0 0 18px 44px',
                        fontSize: '15px',
                        color: darkMode ? '#ffffff' : '#6b7280',
                        lineHeight: '1.7',
                        fontWeight: '500'
                      }}>{task.description}</p>
                    )}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginLeft: '44px' }}>
                      {task.tags && task.tags.map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            background: `${currentTheme.primary}15`,
                            color: currentTheme.primary,
                            padding: '6px 18px',
                            borderRadius: '20px',
                            fontSize: '13px',
                            fontWeight: '700',
                            letterSpacing: '0.3px'
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                    <span
                      style={{
                        background: priorityColors[task.priority].bg,
                        color: 'white',
                        padding: '10px 24px',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        boxShadow: `0 4px 15px ${priorityColors[task.priority].bg}40`
                      }}
                    >
                      {task.priority}
                    </span>
                    {task.due_at && (
                      <div style={{ fontSize: '13px', color: darkMode ? '#ffffff' : '#6b7280', textAlign: 'right', fontWeight: '600' }}>
                        📅 {new Date(task.due_at).toLocaleDateString()}
                      </div>
                    )}
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      style={{
                        background: '#fee2e2',
                        color: '#ef4444',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '10px 24px',
                        fontSize: '13px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        marginTop: '8px',
                        transition: 'all 0.3s'
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{
              background: currentTheme.cardBg,
              borderRadius: '20px',
              padding: '80px',
              textAlign: 'center',
              color: '#6b7280',
              boxShadow: darkMode ? '0 10px 40px rgba(0,0,0,0.2)' : '0 8px 30px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '72px', marginBottom: '25px' }}>📝</div>
              <h3 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 12px 0', color: currentTheme.cardText }}>No tasks found</h3>
              <p style={{ fontSize: '16px', margin: 0, fontWeight: '500' }}>Create your first task to get started!</p>
            </div>
          )}
          </div>
        )}
        </div>
      </main>

      <footer style={{
        padding: '40px 60px',
        textAlign: 'center',
        color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(33, 15, 55, 0.7)',
        background: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(33, 15, 55, 0.03)',
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        zIndex: 1
      }}>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', opacity: '0.8' }}>
          TaskMaster Pro © 2026 | Built by Umema Sultan
        </p>
      </footer>
    </div>
  );
}
