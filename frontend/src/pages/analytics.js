import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import taskApi from '../services/taskApi';
import {
  calculateProductivityScore,
  getTaskTrends,
  getUpcomingDeadlines,
  getTasksByTag,
  getStreakData
} from '../utils/analytics';
import {
  requestNotificationPermission,
  checkOverdueTasks
} from '../utils/notifications';
import { getSmartRecommendations } from '../utils/aiFeatures';

export default function Analytics() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    setMounted(true);

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

    // Check notification permission
    if (Notification.permission === 'granted') {
      setNotificationsEnabled(true);
    }
  }, [router]);

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

      // Check for overdue tasks
      checkOverdueTasks(apiTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/login');
  };

  const enableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationsEnabled(granted);
  };

  if (!mounted) return null;

  const productivityScore = calculateProductivityScore(tasks);
  const trends = getTaskTrends(tasks, 7);
  const upcomingDeadlines = getUpcomingDeadlines(tasks, 7);
  const tagStats = getTasksByTag(tasks);
  const streakData = getStreakData(tasks);
  const recommendations = getSmartRecommendations(tasks, currentUser);

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.background,
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Head>
        <title>Advanced Analytics - TaskMaster Pro</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      {/* Background */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: darkMode ? 'radial-gradient(circle, rgba(46, 35, 108, 0.3) 0%, rgba(23, 21, 59, 0.2) 40%, transparent 70%)' : 'radial-gradient(circle, rgba(46, 35, 108, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0
      }} />

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
              <p style={{ margin: 0, fontSize: '11px', color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(33, 15, 55, 0.5)', fontWeight: '600', letterSpacing: '0.5px' }}>ADVANCED ANALYTICS</p>
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
            <button onClick={() => router.push('/tasks')} style={{
              background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(23, 21, 59, 0.08)',
              color: currentTheme.navText,
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s'
            }}>Tasks</button>
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
          <h1 style={{
            color: currentTheme.headerText,
            fontSize: '48px',
            fontWeight: '900',
            marginBottom: '40px',
            letterSpacing: '-1px'
          }}>📊 Advanced Analytics</h1>

          {/* Notification Banner */}
          {!notificationsEnabled && (
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              padding: '20px 30px',
              borderRadius: '16px',
              marginBottom: '30px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: '800' }}>🔔 Enable Notifications</h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Get reminders for upcoming deadlines and overdue tasks</p>
              </div>
              <button onClick={enableNotifications} style={{
                background: 'white',
                color: currentTheme.primary,
                border: 'none',
                padding: '12px 30px',
                borderRadius: '10px',
                fontWeight: '800',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                Enable Now
              </button>
            </div>
          )}

          {/* AI Recommendations */}
          {recommendations.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ color: currentTheme.cardText, fontSize: '28px', fontWeight: '900', marginBottom: '20px' }}>🤖 AI Recommendations</h2>
              <div style={{ display: 'grid', gap: '15px' }}>
                {recommendations.map((rec, index) => (
                  <div key={index} style={{
                    background: currentTheme.cardBg,
                    borderRadius: '16px',
                    padding: '25px',
                    border: darkMode ? '2px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(23, 21, 59, 0.08)',
                    borderLeft: `6px solid ${rec.type === 'warning' ? currentTheme.primary : rec.type === 'success' ? currentTheme.primaryLight : currentTheme.primary}`
                  }}>
                    <h3 style={{ color: currentTheme.cardText, fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>{rec.title}</h3>
                    <p style={{ color: darkMode ? '#ffffff' : '#6b7280', fontSize: '14px', margin: '0 0 15px 0' }}>{rec.message}</p>
                    <button style={{
                      background: rec.type === 'warning' ? currentTheme.primary : rec.type === 'success' ? currentTheme.primaryLight : currentTheme.primary,
                      color: 'white',
                      border: 'none',
                      padding: '8px 20px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}>
                      {rec.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Productivity Score */}
          <div style={{
            background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)`,
            borderRadius: '24px',
            padding: '50px',
            color: 'white',
            marginBottom: '40px',
            boxShadow: '0 20px 60px rgba(46, 35, 108, 0.5), 0 0 30px rgba(23, 21, 59, 0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              fontSize: '200px',
              opacity: '0.1'
            }}>🎯</div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 20px 0', position: 'relative', zIndex: 1 }}>Productivity Score</h2>
            <div style={{ fontSize: '80px', fontWeight: '900', margin: '0 0 10px 0', position: 'relative', zIndex: 1 }}>{productivityScore}%</div>
            <p style={{ fontSize: '16px', opacity: 0.9, margin: 0, position: 'relative', zIndex: 1 }}>
              {productivityScore >= 80 ? 'Excellent! Keep up the great work!' :
               productivityScore >= 60 ? 'Good progress! You\'re doing well.' :
               'Room for improvement. Let\'s boost your productivity!'}
            </p>
          </div>

          {/* Streak & Upcoming */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '40px' }}>
            {/* Streak Card */}
            <div style={{
              background: currentTheme.cardBg,
              borderRadius: '20px',
              padding: '35px',
              border: darkMode ? '2px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(23, 21, 59, 0.08)',
              boxShadow: darkMode ? '0 15px 50px rgba(0,0,0,0.25)' : '0 10px 40px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔥</div>
              <h3 style={{ color: currentTheme.cardText, fontSize: '20px', fontWeight: '800', margin: '0 0 10px 0' }}>Current Streak</h3>
              <div style={{ fontSize: '48px', fontWeight: '900', color: currentTheme.primary, margin: '10px 0' }}>{streakData.current}</div>
              <p style={{ color: darkMode ? '#ffffff' : '#6b7280', fontSize: '14px', margin: 0 }}>Longest: {streakData.longest} days</p>
            </div>

            {/* Upcoming Deadlines */}
            <div style={{
              background: currentTheme.cardBg,
              borderRadius: '20px',
              padding: '35px',
              border: darkMode ? '2px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(23, 21, 59, 0.08)',
              boxShadow: darkMode ? '0 15px 50px rgba(0,0,0,0.25)' : '0 10px 40px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>⏰</div>
              <h3 style={{ color: currentTheme.cardText, fontSize: '20px', fontWeight: '800', margin: '0 0 15px 0' }}>Upcoming Deadlines</h3>
              {upcomingDeadlines.length > 0 ? (
                <div style={{ display: 'grid', gap: '10px' }}>
                  {upcomingDeadlines.slice(0, 3).map(task => (
                    <div key={task.id} style={{
                      padding: '12px',
                      background: darkMode ? 'rgba(255,255,255,0.05)' : '#f9fafb',
                      borderRadius: '10px',
                      borderLeft: `4px solid ${currentTheme.primary}`
                    }}>
                      <div style={{ color: currentTheme.cardText, fontSize: '14px', fontWeight: '700' }}>{task.title}</div>
                      <div style={{ color: darkMode ? '#ffffff' : '#6b7280', fontSize: '12px', marginTop: '4px' }}>
                        {new Date(task.due_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: darkMode ? '#ffffff' : '#6b7280', fontSize: '14px' }}>No upcoming deadlines</p>
              )}
            </div>
          </div>

          {/* Task Trends */}
          <div style={{
            background: currentTheme.cardBg,
            borderRadius: '20px',
            padding: '40px',
            marginBottom: '40px',
            border: darkMode ? '2px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(23, 21, 59, 0.08)',
            boxShadow: darkMode ? '0 15px 50px rgba(0,0,0,0.25)' : '0 10px 40px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ color: currentTheme.cardText, fontSize: '28px', fontWeight: '900', marginBottom: '30px' }}>📈 7-Day Trends</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '15px' }}>
              {trends.map((day, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{
                    height: `${Math.max(day.created * 10, 20)}px`,
                    background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)`,
                    borderRadius: '8px 8px 0 0',
                    marginBottom: '5px',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: `${(day.completed / day.created) * 100}%`,
                      background: `linear-gradient(135deg, ${currentTheme.primaryLight} 0%, ${currentTheme.primary} 100%)`,
                      borderRadius: '8px 8px 0 0'
                    }} />
                  </div>
                  <div style={{ color: currentTheme.cardText, fontSize: '12px', fontWeight: '700' }}>{day.date}</div>
                  <div style={{ color: darkMode ? '#ffffff' : '#6b7280', fontSize: '11px' }}>{day.created} tasks</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tag Statistics */}
          {tagStats.length > 0 && (
            <div style={{
              background: currentTheme.cardBg,
              borderRadius: '20px',
              padding: '40px',
              border: darkMode ? '2px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(23, 21, 59, 0.08)',
              boxShadow: darkMode ? '0 15px 50px rgba(0,0,0,0.25)' : '0 10px 40px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{ color: currentTheme.cardText, fontSize: '28px', fontWeight: '900', marginBottom: '30px' }}>🏷️ Tag Statistics</h2>
              <div style={{ display: 'grid', gap: '15px' }}>
                {tagStats.slice(0, 5).map((stat, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px',
                    background: darkMode ? 'rgba(255,255,255,0.05)' : '#f9fafb',
                    borderRadius: '12px'
                  }}>
                    <div>
                      <span style={{ color: currentTheme.cardText, fontSize: '16px', fontWeight: '700' }}>#{stat.tag}</span>
                      <span style={{ color: darkMode ? '#ffffff' : '#6b7280', fontSize: '14px', marginLeft: '10px' }}>
                        {stat.completed}/{stat.total} completed
                      </span>
                    </div>
                    <div style={{
                      background: stat.completionRate >= 80 ? currentTheme.primaryLight : stat.completionRate >= 50 ? currentTheme.primary : currentTheme.primary,
                      color: 'white',
                      padding: '6px 15px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '800'
                    }}>
                      {stat.completionRate}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
