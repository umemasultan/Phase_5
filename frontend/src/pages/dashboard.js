import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import taskApi from '../services/taskApi';
import Navbar from '../components/Navbar';
import { useWebSocket } from '../contexts/WebSocketContext';

export default function Dashboard() {
  const { lastMessage, isConnected } = useWebSocket();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

  // WebSocket real-time updates
  useEffect(() => {
    if (lastMessage && lastMessage.type === 'task_update') {
      console.log('🔄 Real-time task update received:', lastMessage);
      fetchTasks();
    }
  }, [lastMessage]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
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
      navText: 'white',
      headerText: 'white'
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
      navText: '#17153B',
      headerText: '#17153B'
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

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    high: tasks.filter(t => t.priority === 'HIGH').length,
    medium: tasks.filter(t => t.priority === 'MEDIUM').length,
    low: tasks.filter(t => t.priority === 'LOW').length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0
  };

  const recentTasks = tasks.slice(0, 5);

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
        <title>Dashboard - TaskMaster Pro</title>
        <meta name="description" content="Task Analytics Dashboard" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: darkMode ? 'radial-gradient(circle, rgba(46, 35, 108, 0.3) 0%, rgba(23, 21, 59, 0.2) 40%, transparent 70%)' : 'radial-gradient(circle, rgba(46, 35, 108, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 20s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-5%',
        width: '400px',
        height: '400px',
        background: darkMode ? 'radial-gradient(circle, rgba(67, 61, 139, 0.25) 0%, rgba(46, 35, 108, 0.15) 40%, transparent 70%)' : 'radial-gradient(circle, rgba(67, 61, 139, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 15s ease-in-out infinite reverse',
        zIndex: 0
      }} />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .hover-scale {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-scale:hover {
          transform: scale(1.02);
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          main { padding: 2rem 0 !important; }
          h1 { font-size: 2rem !important; }
        }

        @media (max-width: 768px) {
          main { padding: 1.5rem 0 !important; }
          h1 { font-size: 1.75rem !important; margin-bottom: 30px !important; }
          .main-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
          .stat-card { padding: 1.5rem !important; }
          .stat-value { font-size: 2.5rem !important; }
          .priority-breakdown { padding: 30px !important; }
          .priority-breakdown h2 { font-size: 1.5rem !important; }
          .priority-grid { grid-template-columns: 1fr !important; gap: 15px !important; }
          .priority-card { padding: 25px !important; }
          .recent-tasks { padding: 30px !important; }
          .recent-tasks h2 { font-size: 1.5rem !important; }
          .view-all-btn { padding: 12px 24px !important; font-size: 14px !important; }
        }

        @media (max-width: 480px) {
          main { padding: 1rem 0 !important; }
          h1 { font-size: 1.5rem !important; margin-bottom: 25px !important; }
          .main-stats { grid-template-columns: 1fr !important; gap: 15px !important; }
          .stat-card { padding: 1.25rem !important; }
          .stat-icon { font-size: 80px !important; }
          .stat-label { font-size: 14px !important; }
          .stat-value { font-size: 2rem !important; }
          .stat-desc { font-size: 13px !important; }
          .priority-breakdown { padding: 25px !important; margin-bottom: 30px !important; }
          .priority-breakdown h2 { font-size: 1.3rem !important; margin-bottom: 25px !important; }
          .priority-card { padding: 20px !important; }
          .priority-label { font-size: 13px !important; }
          .priority-value { font-size: 2rem !important; }
          .recent-tasks { padding: 25px !important; }
          .recent-tasks h2 { font-size: 1.3rem !important; margin-bottom: 25px !important; }
          .task-item { padding: 18px !important; flex-direction: column !important; align-items: flex-start !important; }
          .task-info { margin-bottom: 12px !important; }
          .task-title { font-size: 15px !important; }
          .task-desc { font-size: 13px !important; }
          .view-all-btn { width: 100% !important; padding: 12px 20px !important; font-size: 13px !important; }
        }
      `}</style>

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} currentUser={currentUser} />

      <main style={{
        padding: '3rem 0',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ padding: '0 1.5rem' }}>
        <h1 className="fade-in" style={{
          color: currentTheme.headerText,
          fontSize: '2.5rem',
          fontWeight: '900',
          marginBottom: '40px',
          letterSpacing: '-1px'
        }}>📊 Analytics Dashboard</h1>

        {/* Main Stats Grid */}
        <div className="main-stats" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          marginBottom: '50px'
        }}>
          <div className="fade-in hover-scale stat-card" style={{
            background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)`,
            borderRadius: '24px',
            padding: '2rem',
            color: 'white',
            boxShadow: '0 15px 50px rgba(33, 15, 55, 0.4)',
            position: 'relative',
            overflow: 'hidden',
            animationDelay: '0.1s'
          }}>
            <div className="stat-icon" style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              fontSize: '120px',
              opacity: '0.15'
            }}>📋</div>
            <div className="stat-label" style={{ fontSize: '16px', opacity: '0.9', marginBottom: '12px', fontWeight: '700', letterSpacing: '1px', position: 'relative', zIndex: 1 }}>TOTAL TASKS</div>
            <div className="stat-value" style={{ fontSize: '56px', fontWeight: '900', marginBottom: '12px', position: 'relative', zIndex: 1 }}>{stats.total}</div>
            <div className="stat-desc" style={{ fontSize: '14px', opacity: '0.85', fontWeight: '600', position: 'relative', zIndex: 1 }}>All time tasks created</div>
          </div>

          <div className="fade-in hover-scale stat-card" style={{
            background: currentTheme.cardBg,
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: darkMode ? '0 15px 50px rgba(0,0,0,0.25)' : '0 10px 40px rgba(0,0,0,0.08)',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(33, 15, 55, 0.08)',
            position: 'relative',
            overflow: 'hidden',
            animationDelay: '0.2s'
          }}>
            <div className="stat-icon" style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              fontSize: '120px',
              opacity: '0.08'
            }}>✓</div>
            <div className="stat-label" style={{ fontSize: '16px', color: darkMode ? '#ffffff' : '#6b7280', marginBottom: '12px', fontWeight: '700', letterSpacing: '1px', position: 'relative', zIndex: 1 }}>COMPLETED</div>
            <div className="stat-value" style={{ fontSize: '56px', fontWeight: '900', color: '#10b981', marginBottom: '12px', position: 'relative', zIndex: 1 }}>{stats.completed}</div>
            <div className="stat-desc" style={{ fontSize: '14px', color: darkMode ? '#ffffff' : '#6b7280', fontWeight: '600', position: 'relative', zIndex: 1 }}>Tasks finished</div>
          </div>

          <div className="fade-in hover-scale stat-card" style={{
            background: currentTheme.cardBg,
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: darkMode ? '0 15px 50px rgba(0,0,0,0.25)' : '0 10px 40px rgba(0,0,0,0.08)',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(33, 15, 55, 0.08)',
            position: 'relative',
            overflow: 'hidden',
            animationDelay: '0.3s'
          }}>
            <div className="stat-icon" style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              fontSize: '120px',
              opacity: '0.08'
            }}>⏳</div>
            <div className="stat-label" style={{ fontSize: '16px', color: darkMode ? '#ffffff' : '#6b7280', marginBottom: '12px', fontWeight: '700', letterSpacing: '1px', position: 'relative', zIndex: 1 }}>PENDING</div>
            <div className="stat-value" style={{ fontSize: '56px', fontWeight: '900', color: '#f59e0b', marginBottom: '12px', position: 'relative', zIndex: 1 }}>{stats.pending}</div>
            <div className="stat-desc" style={{ fontSize: '14px', color: darkMode ? '#ffffff' : '#6b7280', fontWeight: '600', position: 'relative', zIndex: 1 }}>Tasks in progress</div>
          </div>

          <div className="fade-in hover-scale stat-card" style={{
            background: currentTheme.cardBg,
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: darkMode ? '0 15px 50px rgba(0,0,0,0.25)' : '0 10px 40px rgba(0,0,0,0.08)',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(33, 15, 55, 0.08)',
            position: 'relative',
            overflow: 'hidden',
            animationDelay: '0.4s'
          }}>
            <div className="stat-icon" style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              fontSize: '120px',
              opacity: '0.08'
            }}>📈</div>
            <div className="stat-label" style={{ fontSize: '16px', color: darkMode ? '#ffffff' : '#6b7280', marginBottom: '12px', fontWeight: '700', letterSpacing: '1px', position: 'relative', zIndex: 1 }}>COMPLETION RATE</div>
            <div className="stat-value" style={{ fontSize: '56px', fontWeight: '900', color: currentTheme.primary, marginBottom: '12px', position: 'relative', zIndex: 1 }}>{stats.completionRate}%</div>
            <div className="stat-desc" style={{ fontSize: '14px', color: darkMode ? '#ffffff' : '#6b7280', fontWeight: '600', position: 'relative', zIndex: 1 }}>Overall progress</div>
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="fade-in priority-breakdown" style={{
          background: currentTheme.cardBg,
          borderRadius: '24px',
          padding: '45px',
          marginBottom: '40px',
          boxShadow: darkMode ? '0 15px 50px rgba(0,0,0,0.25)' : '0 10px 40px rgba(0,0,0,0.08)',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(33, 15, 55, 0.08)',
          animationDelay: '0.5s'
        }}>
          <h2 style={{ margin: '0 0 35px 0', fontSize: '30px', fontWeight: '900', color: currentTheme.cardText, letterSpacing: '-0.5px' }}>Priority Breakdown</h2>
          <div className="priority-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
            <div className="hover-scale priority-card" style={{
              background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
              borderRadius: '20px',
              padding: '35px',
              borderLeft: '6px solid #ef4444',
              boxShadow: '0 8px 25px rgba(239, 68, 68, 0.15)'
            }}>
              <div className="priority-label" style={{ fontSize: '15px', color: '#991b1b', fontWeight: '800', marginBottom: '12px', letterSpacing: '1px' }}>HIGH PRIORITY</div>
              <div className="priority-value" style={{ fontSize: '2.5rem', fontWeight: '900', color: '#ef4444' }}>{stats.high}</div>
            </div>
            <div className="hover-scale priority-card" style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '20px',
              padding: '35px',
              borderLeft: '6px solid #f59e0b',
              boxShadow: '0 8px 25px rgba(245, 158, 11, 0.15)'
            }}>
              <div className="priority-label" style={{ fontSize: '15px', color: '#92400e', fontWeight: '800', marginBottom: '12px', letterSpacing: '1px' }}>MEDIUM PRIORITY</div>
              <div className="priority-value" style={{ fontSize: '2.5rem', fontWeight: '900', color: '#f59e0b' }}>{stats.medium}</div>
            </div>
            <div className="hover-scale priority-card" style={{
              background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
              borderRadius: '20px',
              padding: '35px',
              borderLeft: '6px solid #10b981',
              boxShadow: '0 8px 25px rgba(16, 185, 129, 0.15)'
            }}>
              <div className="priority-label" style={{ fontSize: '15px', color: '#065f46', fontWeight: '800', marginBottom: '12px', letterSpacing: '1px' }}>LOW PRIORITY</div>
              <div className="priority-value" style={{ fontSize: '2.5rem', fontWeight: '900', color: '#10b981' }}>{stats.low}</div>
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="fade-in recent-tasks" style={{
          background: currentTheme.cardBg,
          borderRadius: '24px',
          padding: '45px',
          boxShadow: darkMode ? '0 15px 50px rgba(0,0,0,0.25)' : '0 10px 40px rgba(0,0,0,0.08)',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(33, 15, 55, 0.08)',
          animationDelay: '0.6s'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', flexWrap: 'wrap', gap: '15px' }}>
            <h2 style={{ margin: 0, fontSize: '30px', fontWeight: '900', color: currentTheme.cardText, letterSpacing: '-0.5px' }}>Recent Tasks</h2>
            <button className="view-all-btn" onClick={() => router.push('/tasks')} style={{
              background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)`,
              color: 'white',
              border: 'none',
              padding: '14px 32px',
              borderRadius: '14px',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '15px',
              boxShadow: '0 8px 25px rgba(33, 15, 55, 0.3)',
              letterSpacing: '0.3px',
              transition: 'all 0.3s'
            }}>View All →</button>
          </div>
          {loading ? (
            <p style={{ color: darkMode ? '#ffffff' : '#6b7280', textAlign: 'center', padding: '2rem', fontSize: '16px', fontWeight: '600' }}>Loading tasks...</p>
          ) : recentTasks.length > 0 ? (
            <div style={{ display: 'grid', gap: '18px' }}>
              {recentTasks.map((task, index) => (
                <div
                  key={task.id}
                  className="hover-scale task-item"
                  style={{
                    padding: '25px',
                    borderRadius: '16px',
                    background: darkMode ? 'rgba(255, 255, 255, 0.03)' : '#f9fafb',
                    border: darkMode ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid #e5e7eb',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.3s'
                  }}
                >
                  <div className="task-info" style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: 1 }}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      readOnly
                      style={{ width: '24px', height: '24px', accentColor: currentTheme.primary, cursor: 'pointer' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div className="task-title" style={{
                        fontSize: '17px',
                        fontWeight: '700',
                        color: currentTheme.cardText,
                        textDecoration: task.completed ? 'line-through' : 'none',
                        marginBottom: '6px'
                      }}>{task.title}</div>
                      {task.description && (
                        <div className="task-desc" style={{ fontSize: '14px', color: darkMode ? '#ffffff' : '#6b7280', fontWeight: '500' }}>
                          {task.description.substring(0, 70)}{task.description.length > 70 ? '...' : ''}
                        </div>
                      )}
                    </div>
                  </div>
                  <span style={{
                    background: task.priority === 'HIGH' ? '#ef4444' : task.priority === 'MEDIUM' ? '#f59e0b' : '#10b981',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: '800',
                    letterSpacing: '0.3px',
                    boxShadow: task.priority === 'HIGH' ? '0 4px 15px rgba(239, 68, 68, 0.3)' : task.priority === 'MEDIUM' ? '0 4px 15px rgba(245, 158, 11, 0.3)' : '0 4px 15px rgba(16, 185, 129, 0.3)'
                  }}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px', color: darkMode ? '#ffffff' : '#6b7280' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>📝</div>
              <h3 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 10px 0', color: currentTheme.cardText }}>No tasks yet</h3>
              <p style={{ fontSize: '16px', margin: 0, fontWeight: '500' }}>Create your first task to get started!</p>
            </div>
          )}
        </div>
        </div>
      </main>

      <footer style={{
        padding: '40px 60px',
        textAlign: 'center',
        color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(33, 15, 55, 0.7)',
        background: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(33, 15, 55, 0.03)',
        position: 'relative',
        zIndex: 1
      }}>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', opacity: '0.8' }}>
          TaskMaster Pro © 2026 | Enterprise Edition | Created by Umema Sultan
        </p>
      </footer>
    </div>
  );
}
