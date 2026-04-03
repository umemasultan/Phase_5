import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Audit() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [auditLogs, setAuditLogs] = useState([]);
  const [filter, setFilter] = useState('all'); // all, create, update, delete
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setMounted(true);

    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/login');
      return;
    }
    setCurrentUser(JSON.parse(user));

    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }

    // Load audit logs from localStorage
    loadAuditLogs();
  }, [router]);

  const loadAuditLogs = () => {
    const logs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
    setAuditLogs(logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
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

  const clearAuditLogs = () => {
    if (confirm('Are you sure you want to clear all audit logs?')) {
      localStorage.setItem('auditLogs', '[]');
      setAuditLogs([]);
    }
  };

  const exportAuditLogs = () => {
    const dataStr = JSON.stringify(auditLogs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audit-logs-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
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
      navText: '#ffffff',
      headerText: '#ffffff'
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

  const filteredLogs = auditLogs.filter(log => {
    const matchesFilter = filter === 'all' || log.action === filter;
    const matchesSearch = !searchTerm ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getActionColor = (action) => {
    switch(action) {
      case 'create': return '#10b981';
      case 'update': return '#f59e0b';
      case 'delete': return '#ef4444';
      case 'complete': return '#3b82f6';
      default: return currentTheme.primary;
    }
  };

  const getActionIcon = (action) => {
    switch(action) {
      case 'create': return '➕';
      case 'update': return '✏️';
      case 'delete': return '🗑️';
      case 'complete': return '✓';
      default: return '📝';
    }
  };

  if (!mounted) return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.background,
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Head>
        <title>Audit Trail - TaskMaster Pro</title>
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
              boxShadow: '0 8px 25px rgba(23, 21, 59, 0.4)'
            }}>T</div>
            <div>
              <h2 style={{ color: currentTheme.navText, margin: 0, fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>TaskMaster Pro</h2>
              <p style={{ margin: 0, fontSize: '11px', color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(23, 21, 59, 0.5)', fontWeight: '600', letterSpacing: '0.5px' }}>AUDIT TRAIL</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button onClick={toggleDarkMode} style={{
              background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(23, 21, 59, 0.08)',
              color: currentTheme.navText,
              border: 'none',
              padding: '12px 20px',
              borderRadius: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px'
            }}>
              <span style={{ fontSize: '20px' }}>{darkMode ? '☀️' : '🌙'}</span>
              <span>{darkMode ? 'Light' : 'Dark'}</span>
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
          }}>🔒 Audit Trail</h1>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '25px',
            marginBottom: '40px'
          }}>
            {[
              { label: 'TOTAL LOGS', value: auditLogs.length, icon: '📋', color: currentTheme.primary },
              { label: 'CREATES', value: auditLogs.filter(l => l.action === 'create').length, icon: '➕', color: '#10b981' },
              { label: 'UPDATES', value: auditLogs.filter(l => l.action === 'update').length, icon: '✏️', color: '#f59e0b' },
              { label: 'DELETES', value: auditLogs.filter(l => l.action === 'delete').length, icon: '🗑️', color: '#ef4444' }
            ].map((stat, index) => (
              <div key={index} style={{
                background: currentTheme.cardBg,
                borderRadius: '20px',
                padding: '30px',
                boxShadow: darkMode ? '0 10px 40px rgba(0,0,0,0.2)' : '0 8px 30px rgba(0,0,0,0.08)',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(23, 21, 59, 0.08)',
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

          {/* Controls */}
          <div style={{
            background: currentTheme.cardBg,
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '30px',
            boxShadow: darkMode ? '0 10px 40px rgba(0,0,0,0.2)' : '0 8px 30px rgba(0,0,0,0.08)',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(23, 21, 59, 0.08)'
          }}>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="🔍 Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '250px',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  border: darkMode ? '2px solid rgba(255,255,255,0.2)' : '2px solid rgba(23,21,59,0.15)',
                  fontSize: '15px',
                  outline: 'none',
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                  color: darkMode ? 'white' : '#1f2937',
                  fontWeight: '500'
                }}
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                  padding: '14px 20px',
                  borderRadius: '12px',
                  border: darkMode ? '2px solid rgba(255,255,255,0.2)' : '2px solid rgba(23,21,59,0.15)',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  outline: 'none',
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                  color: darkMode ? 'white' : '#1f2937'
                }}
              >
                <option value="all">All Actions</option>
                <option value="create">Create</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
                <option value="complete">Complete</option>
              </select>
              <button onClick={exportAuditLogs} style={{
                background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)`,
                color: 'white',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '15px',
                transition: 'all 0.3s'
              }}>
                📥 Export
              </button>
              <button onClick={clearAuditLogs} style={{
                background: '#fee2e2',
                color: '#dc2626',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '15px',
                transition: 'all 0.3s'
              }}>
                🗑️ Clear
              </button>
            </div>
          </div>

          {/* Audit Logs */}
          <div style={{
            background: currentTheme.cardBg,
            borderRadius: '20px',
            padding: '40px',
            boxShadow: darkMode ? '0 10px 40px rgba(0,0,0,0.2)' : '0 8px 30px rgba(0,0,0,0.08)',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(23, 21, 59, 0.08)'
          }}>
            <h2 style={{ color: currentTheme.cardText, fontSize: '24px', fontWeight: '900', marginBottom: '30px' }}>
              Activity Log ({filteredLogs.length})
            </h2>

            {filteredLogs.length > 0 ? (
              <div style={{ display: 'grid', gap: '15px' }}>
                {filteredLogs.map((log, index) => (
                  <div key={index} style={{
                    background: darkMode ? 'rgba(255,255,255,0.05)' : '#f9fafb',
                    borderRadius: '14px',
                    padding: '20px',
                    borderLeft: `5px solid ${getActionColor(log.action)}`,
                    transition: 'all 0.3s'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                          <span style={{ fontSize: '24px' }}>{getActionIcon(log.action)}</span>
                          <span style={{
                            background: getActionColor(log.action),
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: '700',
                            textTransform: 'uppercase'
                          }}>
                            {log.action}
                          </span>
                          <span style={{
                            color: darkMode ? 'rgba(255,255,255,0.6)' : '#6b7280',
                            fontSize: '13px',
                            fontWeight: '600'
                          }}>
                            by {log.user}
                          </span>
                        </div>
                        <p style={{
                          color: currentTheme.cardText,
                          fontSize: '15px',
                          fontWeight: '600',
                          margin: '0 0 8px 0'
                        }}>
                          {log.details}
                        </p>
                        <div style={{
                          color: darkMode ? 'rgba(255,255,255,0.5)' : '#9ca3af',
                          fontSize: '13px',
                          fontWeight: '500'
                        }}>
                          🕐 {new Date(log.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '60px',
                color: darkMode ? 'rgba(255,255,255,0.6)' : '#6b7280'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>📋</div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 10px 0', color: currentTheme.cardText }}>
                  No audit logs found
                </h3>
                <p style={{ fontSize: '15px', margin: 0 }}>
                  {searchTerm || filter !== 'all' ? 'Try adjusting your filters' : 'Activity will appear here'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
