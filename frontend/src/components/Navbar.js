import { useRouter } from 'next/router';

export default function Navbar({ darkMode, toggleDarkMode, currentUser, showAuthButtons = false, showExportButton = false, onExportClick, isHomePage = false }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/login');
  };

  const theme = {
    dark: {
      primary: '#17153B',
      primaryLight: '#2E236C',
      accent: '#433D8B',
      accentLight: '#5a52a5',
      navBg: isHomePage
        ? 'linear-gradient(180deg, rgba(10, 8, 24, 0.95) 0%, rgba(10, 8, 24, 0.85) 100%)'
        : 'linear-gradient(180deg, rgba(10, 8, 24, 0.98) 0%, rgba(17, 15, 45, 0.95) 100%)',
      navBorder: 'rgba(99, 102, 241, 0.25)',
      navShadow: isHomePage
        ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(99, 102, 241, 0.15) inset'
        : '0 10px 40px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(99, 102, 241, 0.1) inset'
    },
    light: {
      primary: '#17153B',
      primaryLight: '#2E236C',
      accent: '#433D8B',
      accentLight: '#5a52a5',
      navBg: 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(252, 251, 255, 0.95) 100%)',
      navBorder: 'rgba(23, 21, 59, 0.1)',
      navShadow: '0 4px 30px rgba(23, 21, 59, 0.08), 0 1px 0 rgba(255, 255, 255, 0.9) inset'
    }
  };

  const currentTheme = darkMode ? theme.dark : theme.light;

  const navLinks = currentUser ? [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Tasks', path: '/tasks' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'Audit', path: '/audit' }
  ] : [];

  return (
    <>
      <style jsx>{`
        @keyframes shine {
          0% { transform: translate(-100%, -100%) rotate(45deg); }
          100% { transform: translate(100%, 100%) rotate(45deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.4), 0 0 60px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 50px rgba(99, 102, 241, 0.6), 0 0 80px rgba(139, 92, 246, 0.5); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.15); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        .nav-link {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        .nav-link:hover {
          transform: translateY(-3px);
        }
        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .nav-link:hover::before {
          opacity: 1;
        }
        .logo-container {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .logo-container:hover {
          transform: scale(1.08) translateY(-2px);
          filter: brightness(1.15) drop-shadow(0 0 30px rgba(99, 102, 241, 0.6));
        }
        .premium-badge {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <nav style={{
        padding: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: isHomePage
          ? (darkMode
              ? 'linear-gradient(180deg, rgba(10, 8, 24, 0.98) 0%, rgba(10, 8, 24, 0.85) 100%)'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.99) 0%, rgba(252, 251, 255, 0.92) 100%)')
          : currentTheme.navBg,
        backdropFilter: 'blur(100px) saturate(200%)',
        WebkitBackdropFilter: 'blur(100px) saturate(200%)',
        borderBottom: isHomePage
          ? (darkMode
              ? '2px solid rgba(99, 102, 241, 0.25)'
              : '2px solid rgba(23, 21, 59, 0.12)')
          : `1px solid ${currentTheme.navBorder}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: isHomePage
          ? (darkMode
              ? '0 12px 48px rgba(0, 0, 0, 0.8), 0 2px 0 rgba(99, 102, 241, 0.3) inset, 0 0 80px rgba(99, 102, 241, 0.2)'
              : '0 8px 32px rgba(23, 21, 59, 0.18), 0 2px 0 rgba(255, 255, 255, 1) inset, 0 0 40px rgba(99, 102, 241, 0.1)')
          : currentTheme.navShadow
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1800px',
          padding: isHomePage ? '0 100px' : '0 80px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: isHomePage ? '120px' : '85px'
        }}>
          {/* Logo Section */}
          <div
            className="logo-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
              cursor: 'pointer'
            }}
            onClick={() => router.push('/')}
          >
            <div style={{
              width: isHomePage ? '72px' : '52px',
              height: isHomePage ? '72px' : '52px',
              background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 50%, ${currentTheme.accentLight} 100%)`,
              borderRadius: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: darkMode
                ? '0 20px 60px rgba(46, 35, 108, 1.2), 0 0 0 3px rgba(255, 255, 255, 0.3) inset, 0 0 60px rgba(99, 102, 241, 1), 0 8px 32px rgba(139, 92, 246, 0.8)'
                : '0 16px 50px rgba(46, 35, 108, 0.7), 0 0 0 3px rgba(255, 255, 255, 0.7) inset, 0 0 40px rgba(99, 102, 241, 0.4)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: isHomePage && darkMode ? 'glow 3s ease-in-out infinite' : 'none',
              backgroundSize: '200% 200%'
            }}>
              <div style={{
                position: 'absolute',
                top: '-100%',
                left: '-100%',
                width: '300%',
                height: '300%',
                background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.8) 50%, transparent 70%)',
                animation: 'shine 5s ease-in-out infinite'
              }} />
              {/* Sparkle effects */}
              <div style={{
                position: 'absolute',
                top: '15%',
                right: '15%',
                width: '8px',
                height: '8px',
                background: 'white',
                borderRadius: '50%',
                animation: 'sparkle 2s ease-in-out infinite',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '20%',
                left: '20%',
                width: '6px',
                height: '6px',
                background: 'white',
                borderRadius: '50%',
                animation: 'sparkle 2.5s ease-in-out infinite 0.5s',
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
              }} />
              <span style={{
                fontSize: isHomePage ? '40px' : '28px',
                fontWeight: '900',
                color: 'white',
                position: 'relative',
                zIndex: 1,
                textShadow: '0 6px 24px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)',
                lineHeight: '1'
              }}>✓</span>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: isHomePage ? '38px' : '26px',
                fontWeight: '900',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                letterSpacing: '-2px',
                lineHeight: '1',
                background: darkMode
                  ? 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)'
                  : `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 50%, ${currentTheme.accentLight} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: darkMode ? '0 0 60px rgba(99, 102, 241, 0.8)' : 'none',
                filter: darkMode ? 'drop-shadow(0 0 30px rgba(99, 102, 241, 0.6))' : 'drop-shadow(0 2px 4px rgba(23, 21, 59, 0.1))',
                backgroundSize: '200% 200%',
                animation: darkMode && isHomePage ? 'gradient-shift 4s ease infinite' : 'none'
              }}>TaskMaster Pro</h2>
              <div className="premium-badge" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: darkMode
                    ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
                    : 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  boxShadow: darkMode ? '0 0 16px rgba(16, 185, 129, 1), 0 0 8px rgba(52, 211, 153, 0.8)' : '0 0 12px rgba(5, 150, 105, 0.8)',
                  animation: 'pulse 2s ease-in-out infinite'
                }} />
                <p style={{
                  margin: 0,
                  fontSize: isHomePage ? '12px' : '10px',
                  color: darkMode ? 'rgba(255,255,255,0.85)' : 'rgba(23, 21, 59, 0.75)',
                  fontWeight: '900',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  lineHeight: '1',
                  textShadow: darkMode ? '0 0 20px rgba(99, 102, 241, 0.4)' : 'none'
                }}>ENTERPRISE EDITION</p>
              </div>
            </div>
          </div>

          {/* Navigation Links & Actions */}
          <div style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center'
          }}>
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => router.push(link.path)}
                className="nav-link"
                style={{
                  background: router.pathname === link.path
                    ? (darkMode
                        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%)'
                        : 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)')
                    : 'transparent',
                  color: router.pathname === link.path
                    ? (darkMode ? '#ffffff' : '#17153B')
                    : (darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(23, 21, 59, 0.7)'),
                  border: router.pathname === link.path
                    ? (darkMode ? '2px solid rgba(99, 102, 241, 0.8)' : '2px solid rgba(99, 102, 241, 0.7)')
                    : '2px solid transparent',
                  padding: '18px 36px',
                  borderRadius: '18px',
                  fontWeight: router.pathname === link.path ? '900' : '700',
                  cursor: 'pointer',
                  fontSize: '16px',
                  backdropFilter: router.pathname === link.path ? 'blur(30px)' : 'none',
                  boxShadow: router.pathname === link.path
                    ? (darkMode
                        ? '0 12px 40px rgba(99, 102, 241, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.2) inset, 0 0 35px rgba(99, 102, 241, 0.5)'
                        : '0 10px 35px rgba(99, 102, 241, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.9) inset')
                    : 'none',
                  letterSpacing: '0.6px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (router.pathname !== link.path) {
                    e.target.style.color = darkMode ? '#ffffff' : '#17153B';
                    e.target.style.transform = 'translateY(-4px)';
                    e.target.style.background = darkMode
                      ? 'rgba(99, 102, 241, 0.2)'
                      : 'rgba(99, 102, 241, 0.15)';
                    e.target.style.boxShadow = darkMode
                      ? '0 8px 25px rgba(99, 102, 241, 0.4)'
                      : '0 6px 20px rgba(99, 102, 241, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (router.pathname !== link.path) {
                    e.target.style.color = darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(23, 21, 59, 0.7)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.background = 'transparent';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {link.label}
              </button>
            ))}

            {/* Export Button (only on tasks page) */}
            {showExportButton && (
              <button
                onClick={onExportClick}
                className="nav-link"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`,
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '14px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  fontSize: '15px',
                  boxShadow: darkMode
                    ? '0 10px 32px rgba(46, 35, 108, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.15) inset, 0 0 30px rgba(99, 102, 241, 0.5)'
                    : '0 8px 28px rgba(46, 35, 108, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.4) inset',
                  letterSpacing: '0.4px',
                  height: '52px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px) scale(1.03)';
                  e.target.style.boxShadow = darkMode
                    ? '0 12px 38px rgba(46, 35, 108, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.2) inset, 0 0 35px rgba(99, 102, 241, 0.6)'
                    : '0 10px 32px rgba(46, 35, 108, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.5) inset';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = darkMode
                    ? '0 10px 32px rgba(46, 35, 108, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.15) inset, 0 0 30px rgba(99, 102, 241, 0.5)'
                    : '0 8px 28px rgba(46, 35, 108, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.4) inset';
                }}
              >
                <span style={{ fontSize: '16px' }}>⬇️</span>
                <span>Export</span>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="nav-link"
              style={{
                background: darkMode
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(23, 21, 59, 0.08)',
                color: darkMode ? '#fbbf24' : '#7c3aed',
                border: darkMode
                  ? '2px solid rgba(255, 255, 255, 0.2)'
                  : '2px solid rgba(23, 21, 59, 0.15)',
                padding: '0',
                borderRadius: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(15px)',
                boxShadow: darkMode
                  ? '0 6px 20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
                  : '0 4px 15px rgba(23, 21, 59, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.7) inset',
                width: '52px',
                height: '52px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px) rotate(15deg) scale(1.05)';
                e.target.style.boxShadow = darkMode
                  ? '0 8px 25px rgba(251, 191, 36, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15) inset'
                  : '0 6px 20px rgba(124, 58, 237, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.8) inset';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) rotate(0deg) scale(1)';
                e.target.style.boxShadow = darkMode
                  ? '0 6px 20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
                  : '0 4px 15px rgba(23, 21, 59, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.7) inset';
              }}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* Auth Buttons */}
            {showAuthButtons && !currentUser && (
              <button
                onClick={() => router.push('/login')}
                className="nav-link"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`,
                  color: 'white',
                  border: 'none',
                  padding: '16px 40px',
                  borderRadius: '16px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  fontSize: '16px',
                  boxShadow: darkMode
                    ? '0 12px 40px rgba(46, 35, 108, 0.9), 0 0 0 2px rgba(255, 255, 255, 0.2) inset, 0 0 35px rgba(99, 102, 241, 0.6)'
                    : '0 10px 35px rgba(46, 35, 108, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.5) inset',
                  letterSpacing: '0.6px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px) scale(1.05)';
                  e.target.style.boxShadow = darkMode
                    ? '0 16px 50px rgba(46, 35, 108, 1), 0 0 0 2px rgba(255, 255, 255, 0.25) inset, 0 0 45px rgba(99, 102, 241, 0.8)'
                    : '0 14px 45px rgba(46, 35, 108, 0.7), 0 0 0 2px rgba(255, 255, 255, 0.6) inset';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = darkMode
                    ? '0 12px 40px rgba(46, 35, 108, 0.9), 0 0 0 2px rgba(255, 255, 255, 0.2) inset, 0 0 35px rgba(99, 102, 241, 0.6)'
                    : '0 10px 35px rgba(46, 35, 108, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.5) inset';
                }}
              >
                <span>Login</span>
                <span style={{ fontSize: '18px', fontWeight: '900' }}>→</span>
              </button>
            )}

            {currentUser && (
              <button
                onClick={handleLogout}
                className="nav-link"
                style={{
                  background: darkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.12)',
                  color: darkMode ? '#fca5a5' : '#dc2626',
                  border: darkMode ? '2px solid rgba(239, 68, 68, 0.4)' : '2px solid rgba(239, 68, 68, 0.3)',
                  padding: '15px 30px',
                  borderRadius: '14px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  fontSize: '15px',
                  backdropFilter: 'blur(15px)',
                  boxShadow: darkMode
                    ? '0 6px 20px rgba(239, 68, 68, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08) inset'
                    : '0 4px 15px rgba(239, 68, 68, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
                  letterSpacing: '0.4px',
                  height: '52px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px) scale(1.03)';
                  e.target.style.background = darkMode ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.18)';
                  e.target.style.boxShadow = darkMode
                    ? '0 8px 25px rgba(239, 68, 68, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.12) inset'
                    : '0 6px 20px rgba(239, 68, 68, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.7) inset';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.background = darkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.12)';
                  e.target.style.boxShadow = darkMode
                    ? '0 6px 20px rgba(239, 68, 68, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08) inset'
                    : '0 4px 15px rgba(239, 68, 68, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.6) inset';
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
