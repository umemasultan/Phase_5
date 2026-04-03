import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  const theme = {
    dark: {
      primary: '#17153B',
      primaryLight: '#2E236C',
      primaryDark: '#0f0c29',
      accent: '#433D8B',
      accentLight: '#5a52a5',
      background: 'linear-gradient(135deg, #0a0818 0%, #17153B 50%, #2E236C 100%)',
      cardBg: 'rgba(23, 21, 59, 0.85)',
      cardText: '#ffffff',
      text: '#ffffff',
      navBg: 'rgba(10, 8, 24, 0.8)',
      navBorder: 'rgba(46, 35, 108, 0.4)'
    },
    light: {
      primary: '#17153B',
      primaryLight: '#2E236C',
      primaryDark: '#0f0c29',
      accent: '#433D8B',
      accentLight: '#5a52a5',
      background: 'linear-gradient(135deg, #f8f7fc 0%, #eeecf7 50%, #e4e1f1 100%)',
      cardBg: '#ffffff',
      cardText: '#1f2937',
      text: '#1f2937',
      navBg: 'rgba(255, 255, 255, 0.9)',
      navBorder: 'rgba(23, 21, 59, 0.15)'
    }
  };

  const currentTheme = darkMode ? theme.dark : theme.light;

  if (!mounted) return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.background,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Head>
        <title>TaskMaster Pro - Enterprise Task Management</title>
        <meta name="description" content="Professional Task Management System" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-10%',
        width: '800px',
        height: '800px',
        background: darkMode
          ? 'radial-gradient(circle, rgba(46, 35, 108, 0.3) 0%, rgba(23, 21, 59, 0.2) 40%, transparent 70%)'
          : 'radial-gradient(circle, rgba(46, 35, 108, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 20s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-10%',
        width: '700px',
        height: '700px',
        background: darkMode
          ? 'radial-gradient(circle, rgba(67, 61, 139, 0.25) 0%, rgba(46, 35, 108, 0.15) 40%, transparent 70%)'
          : 'radial-gradient(circle, rgba(67, 61, 139, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 15s ease-in-out infinite reverse',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: darkMode
          ? 'radial-gradient(circle, rgba(23, 21, 59, 0.25) 0%, rgba(15, 12, 41, 0.15) 40%, transparent 70%)'
          : 'radial-gradient(circle, rgba(23, 21, 59, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'pulse 10s ease-in-out infinite',
        zIndex: 0
      }} />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
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
        borderBottom: `1px solid ${currentTheme.navBorder}`,
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)`,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            fontWeight: '900',
            color: 'white',
            boxShadow: darkMode
              ? '0 10px 30px rgba(46, 35, 108, 0.5), 0 0 25px rgba(23, 21, 59, 0.4)'
              : '0 8px 25px rgba(46, 35, 108, 0.35)',
            position: 'relative',
            animation: 'float 3s ease-in-out infinite'
          }}>
            <span style={{ position: 'relative', zIndex: 1 }}>T</span>
            <div style={{
              position: 'absolute',
              inset: '-3px',
              background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.primaryLight})`,
              borderRadius: '18px',
              opacity: 0.4,
              filter: 'blur(10px)',
              zIndex: 0,
              animation: 'pulse 2s ease-in-out infinite'
            }} />
          </div>
          <div>
            <h2 style={{
              color: darkMode ? 'white' : currentTheme.primary,
              margin: 0,
              fontSize: '26px',
              fontWeight: '800',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.5px'
            }}>TaskMaster Pro</h2>
            <p style={{
              margin: 0,
              fontSize: '12px',
              color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(33, 15, 55, 0.6)',
              fontWeight: '500',
              letterSpacing: '0.5px'
            }}>ENTERPRISE EDITION</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button onClick={toggleDarkMode} style={{
            background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(23, 21, 59, 0.08)',
            color: darkMode ? 'white' : currentTheme.primary,
            border: `2px solid ${darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(23, 21, 59, 0.15)'}`,
            padding: '12px 18px',
            borderRadius: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s',
            backdropFilter: 'blur(10px)'
          }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button onClick={() => router.push('/login')} style={{
            background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)`,
            color: 'white',
            border: 'none',
            padding: '16px 40px',
            borderRadius: '14px',
            fontWeight: '800',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: darkMode
              ? '0 10px 30px rgba(99, 102, 241, 0.4)'
              : '0 8px 25px rgba(99, 102, 241, 0.35)',
            letterSpacing: '0.3px'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = darkMode
              ? '0 15px 40px rgba(99, 102, 241, 0.5)'
              : '0 12px 35px rgba(99, 102, 241, 0.45)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = darkMode
              ? '0 10px 30px rgba(99, 102, 241, 0.4)'
              : '0 8px 25px rgba(99, 102, 241, 0.35)';
          }}>
            Login
          </button>
        </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{
        padding: '0',
        textAlign: 'center',
        color: darkMode ? 'white' : currentTheme.text,
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Hero Container */}
        <div style={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px 60px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
        <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div style={{
            display: 'inline-block',
            background: darkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)',
            padding: '12px 28px',
            borderRadius: '50px',
            marginBottom: '30px',
            border: `2px solid ${darkMode ? 'rgba(46, 35, 108, 0.5)' : 'rgba(46, 35, 108, 0.3)'}`,
            backdropFilter: 'blur(10px)',
            boxShadow: darkMode
              ? '0 8px 32px rgba(46, 35, 108, 0.4), 0 0 20px rgba(23, 21, 59, 0.3)'
              : '0 4px 20px rgba(46, 35, 108, 0.2)'
          }}>
            <span style={{
              fontSize: '14px',
              fontWeight: '800',
              letterSpacing: '1.5px',
              background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ✨ NEXT-GENERATION TASK MANAGEMENT
            </span>
          </div>
        </div>

        <h1 className="fade-in-up" style={{
          fontSize: '80px',
          fontWeight: '900',
          margin: '0 0 30px 0',
          background: darkMode
            ? 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)'
            : `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.1',
          letterSpacing: '-3px',
          animationDelay: '0.2s',
          textShadow: darkMode ? '0 0 80px rgba(99, 102, 241, 0.5)' : 'none'
        }}>
          Manage Tasks<br/>Like Never Before
        </h1>

        <p className="fade-in-up" style={{
          fontSize: '22px',
          margin: '0 auto 60px',
          maxWidth: '750px',
          opacity: darkMode ? '0.9' : '0.75',
          fontWeight: '500',
          lineHeight: '1.7',
          color: darkMode ? 'rgba(255,255,255,0.9)' : currentTheme.text,
          animationDelay: '0.3s'
        }}>
          Enterprise-grade task management with AI-powered insights, real-time collaboration,
          and advanced analytics. Built for teams that demand excellence.
        </p>

        <div className="fade-in-up" style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          marginBottom: '100px',
          animationDelay: '0.4s'
        }}>
          <button onClick={() => router.push('/login')} style={{
            background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)`,
            color: 'white',
            border: 'none',
            padding: '22px 55px',
            borderRadius: '16px',
            fontWeight: '900',
            cursor: 'pointer',
            fontSize: '18px',
            boxShadow: darkMode
              ? '0 20px 50px rgba(46, 35, 108, 0.6), 0 0 35px rgba(23, 21, 59, 0.5)'
              : '0 15px 40px rgba(46, 35, 108, 0.4)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            letterSpacing: '0.5px',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-5px) scale(1.05)';
            e.target.style.boxShadow = darkMode
              ? '0 25px 60px rgba(46, 35, 108, 0.7), 0 0 45px rgba(23, 21, 59, 0.6)'
              : '0 20px 50px rgba(46, 35, 108, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = darkMode
              ? '0 20px 50px rgba(107, 114, 128, 0.5), 0 0 30px rgba(75, 85, 99, 0.3)'
              : '0 15px 40px rgba(107, 114, 128, 0.3)';
          }}>
            Get Started →
          </button>
          <button onClick={() => router.push('/dashboard')} style={{
            background: darkMode
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(99, 102, 241, 0.1)',
            color: darkMode ? 'white' : currentTheme.primary,
            border: `2px solid ${darkMode ? 'rgba(255, 255, 255, 0.3)' : currentTheme.primary}`,
            padding: '22px 55px',
            borderRadius: '16px',
            fontWeight: '900',
            cursor: 'pointer',
            fontSize: '18px',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-5px) scale(1.05)';
            e.target.style.background = darkMode
              ? 'rgba(139, 92, 246, 0.2)'
              : 'rgba(139, 92, 246, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.background = darkMode
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(139, 92, 246, 0.1)';
          }}>
            View Demo
          </button>
        </div>
        </div>

        {/* Feature Cards */}
        <div style={{
          padding: '80px 60px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '35px'
          }}>
          <div className="scale-in hover-lift" style={{
            background: darkMode
              ? 'rgba(46, 35, 108, 0.2)'
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            borderRadius: '28px',
            padding: '50px 40px',
            border: darkMode
              ? '2px solid rgba(46, 35, 108, 0.5)'
              : '2px solid rgba(46, 35, 108, 0.2)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            boxShadow: darkMode
              ? '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(46, 35, 108, 0.4)'
              : '0 10px 40px rgba(46, 35, 108, 0.2)',
            animationDelay: '0.5s',
            position: 'relative',
            overflow: 'hidden'
          }} onClick={() => router.push('/tasks')}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '250px',
              height: '250px',
              background: `radial-gradient(circle, rgba(46, 35, 108, 0.3) 0%, rgba(23, 21, 59, 0.2) 50%, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(50px)',
              animation: 'float 6s ease-in-out infinite'
            }} />
            <div style={{
              fontSize: '64px',
              marginBottom: '25px',
              position: 'relative',
              zIndex: 1,
              filter: 'drop-shadow(0 4px 20px rgba(46, 35, 108, 0.5))'
            }}>✓</div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: '900',
              margin: '0 0 18px 0',
              color: darkMode ? '#ffffff' : '#1f2937',
              position: 'relative',
              zIndex: 1,
              letterSpacing: '-0.5px'
            }}>Smart Task Management</h3>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              margin: 0,
              color: darkMode ? 'rgba(255,255,255,0.85)' : '#6b7280',
              fontWeight: '500',
              position: 'relative',
              zIndex: 1
            }}>
              AI-powered task organization with intelligent prioritization, smart categorization,
              and automated workflow optimization
            </p>
          </div>

          <div className="scale-in hover-lift" style={{
            background: darkMode
              ? 'rgba(67, 61, 139, 0.2)'
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            borderRadius: '28px',
            padding: '50px 40px',
            border: darkMode
              ? '2px solid rgba(46, 35, 108, 0.5)'
              : '2px solid rgba(46, 35, 108, 0.2)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            boxShadow: darkMode
              ? '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(46, 35, 108, 0.4)'
              : '0 10px 40px rgba(46, 35, 108, 0.2)',
            animationDelay: '0.6s',
            position: 'relative',
            overflow: 'hidden'
          }} onClick={() => router.push('/dashboard')}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '250px',
              height: '250px',
              background: 'radial-gradient(circle, rgba(46, 35, 108, 0.3) 0%, rgba(23, 21, 59, 0.2) 50%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(50px)',
              animation: 'float 7s ease-in-out infinite'
            }} />
            <div style={{
              fontSize: '64px',
              marginBottom: '25px',
              position: 'relative',
              zIndex: 1,
              filter: 'drop-shadow(0 4px 20px rgba(46, 35, 108, 0.5))'
            }}>📊</div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: '900',
              margin: '0 0 18px 0',
              color: darkMode ? '#ffffff' : '#1f2937',
              position: 'relative',
              zIndex: 1,
              letterSpacing: '-0.5px'
            }}>Advanced Analytics</h3>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              margin: 0,
              color: darkMode ? 'rgba(255,255,255,0.85)' : '#6b7280',
              fontWeight: '500',
              position: 'relative',
              zIndex: 1
            }}>
              Real-time productivity insights with comprehensive dashboards, performance metrics,
              and predictive analytics for better decision making
            </p>
          </div>

          <div className="scale-in hover-lift" style={{
            background: darkMode
              ? 'rgba(46, 35, 108, 0.2)'
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            borderRadius: '28px',
            padding: '50px 40px',
            border: darkMode
              ? '2px solid rgba(46, 35, 108, 0.5)'
              : '2px solid rgba(46, 35, 108, 0.2)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            boxShadow: darkMode
              ? '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(46, 35, 108, 0.4)'
              : '0 10px 40px rgba(46, 35, 108, 0.2)',
            animationDelay: '0.7s',
            position: 'relative',
            overflow: 'hidden'
          }} onClick={() => router.push('/audit')}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '250px',
              height: '250px',
              background: 'radial-gradient(circle, rgba(46, 35, 108, 0.3) 0%, rgba(23, 21, 59, 0.2) 50%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(50px)',
              animation: 'float 8s ease-in-out infinite'
            }} />
            <div style={{
              fontSize: '64px',
              marginBottom: '25px',
              position: 'relative',
              zIndex: 1,
              filter: 'drop-shadow(0 4px 20px rgba(46, 35, 108, 0.5))'
            }}>🔒</div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: '900',
              margin: '0 0 18px 0',
              color: darkMode ? '#ffffff' : '#1f2937',
              position: 'relative',
              zIndex: 1,
              letterSpacing: '-0.5px'
            }}>Enterprise Security</h3>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              margin: 0,
              color: darkMode ? 'rgba(255,255,255,0.85)' : '#6b7280',
              fontWeight: '500',
              position: 'relative',
              zIndex: 1
            }}>
              Bank-grade security with complete audit trails, immutable logging,
              and compliance-ready data protection for enterprise peace of mind
            </p>
          </div>
        </div>
        </div>

        {/* Stats Section */}
        <div style={{
          padding: '80px 60px',
          background: darkMode ? 'rgba(23, 21, 59, 0.3)' : 'rgba(23, 21, 59, 0.05)',
          borderTop: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(23, 21, 59, 0.1)'}`,
          borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(23, 21, 59, 0.1)'}`
        }}>
          <div className="fade-in-up" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            maxWidth: '1200px',
            margin: '0 auto',
            animationDelay: '0.8s'
          }}>
          <div>
            <div style={{
              fontSize: '52px',
              fontWeight: '900',
              color: darkMode ? 'white' : currentTheme.primary,
              marginBottom: '10px'
            }}>99.9%</div>
            <div style={{
              fontSize: '16px',
              opacity: '0.7',
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}>Uptime SLA</div>
          </div>
          <div>
            <div style={{
              fontSize: '52px',
              fontWeight: '900',
              color: darkMode ? 'white' : currentTheme.primary,
              marginBottom: '10px'
            }}>10M+</div>
            <div style={{
              fontSize: '16px',
              opacity: '0.7',
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}>Tasks Managed</div>
          </div>
          <div>
            <div style={{
              fontSize: '52px',
              fontWeight: '900',
              color: darkMode ? 'white' : currentTheme.primary,
              marginBottom: '10px'
            }}>50K+</div>
            <div style={{
              fontSize: '16px',
              opacity: '0.7',
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}>Active Teams</div>
          </div>
          <div>
            <div style={{
              fontSize: '52px',
              fontWeight: '900',
              color: darkMode ? 'white' : currentTheme.primary,
              marginBottom: '10px'
            }}>4.9★</div>
            <div style={{
              fontSize: '16px',
              opacity: '0.7',
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}>User Rating</div>
          </div>
        </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '40px 60px',
        textAlign: 'center',
        color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(23, 21, 59, 0.7)',
        background: darkMode ? 'rgba(23, 21, 59, 0.3)' : 'rgba(23, 21, 59, 0.05)',
        borderTop: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(23, 21, 59, 0.1)'}`,
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        zIndex: 1
      }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: '600' }}>
          TaskMaster Pro © 2026 | Enterprise Edition
        </p>
        <p style={{ margin: 0, fontSize: '13px', opacity: '0.8' }}>
          Built with ❤️ by Umema Sultan | Cloud-Native Architecture
        </p>
      </footer>
    </div>
  );
}
