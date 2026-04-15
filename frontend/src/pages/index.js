import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

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

  if (!mounted) return null;

  // TaskMaster Pro purple theme
  const theme = darkMode ? {
    primary: '#210F37',
    primaryLight: '#3a1a5c',
    secondary: '#433D8B',
    accent: '#2E236C',
    background: '#0a0818',
    backgroundGradient: 'linear-gradient(135deg, #0a0818 0%, #17153B 50%, #2E236C 100%)',
    cardBg: 'rgba(46, 35, 108, 0.7)',
    text: '#ffffff',
    textMuted: 'rgba(255, 255, 255, 0.8)',
    border: 'rgba(67, 61, 139, 0.3)'
  } : {
    primary: '#210F37',
    primaryLight: '#3a1a5c',
    secondary: '#433D8B',
    accent: '#2E236C',
    background: '#f8fafc',
    backgroundGradient: 'linear-gradient(135deg, #f8f7fc 0%, #eeecf7 50%, #e4e1f1 100%)',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    text: '#1f2937',
    textMuted: 'rgba(31, 41, 55, 0.8)',
    border: 'rgba(67, 61, 139, 0.25)'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.backgroundGradient,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <Head>
        <title>TaskMaster Pro - Enterprise Event-Driven Architecture</title>
        <meta name="description" content="Next-generation task management with advanced microservices architecture" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-50px) rotate(3deg); }
          66% { transform: translateY(-25px) rotate(-3deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .fade-in-up {
          animation: fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        .delay-4 { animation-delay: 0.8s; }
        .delay-5 { animation-delay: 1s; }
        .delay-6 { animation-delay: 1.2s; }
        .delay-7 { animation-delay: 1.4s; }
      `}</style>

      {/* Ultra Premium Background Effects */}
      <div style={{
        position: 'absolute',
        top: '-40%',
        right: '-20%',
        width: '1000px',
        height: '1000px',
        background: darkMode
          ? 'radial-gradient(circle, rgba(67, 61, 139, 0.25) 0%, rgba(46, 35, 108, 0.15) 40%, transparent 70%)'
          : 'radial-gradient(circle, rgba(67, 61, 139, 0.18) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(150px)',
        animation: 'float 25s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-40%',
        left: '-20%',
        width: '900px',
        height: '900px',
        background: darkMode
          ? 'radial-gradient(circle, rgba(46, 35, 108, 0.22) 0%, rgba(33, 15, 55, 0.12) 40%, transparent 70%)'
          : 'radial-gradient(circle, rgba(46, 35, 108, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(150px)',
        animation: 'float 30s ease-in-out infinite reverse',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: darkMode
          ? 'radial-gradient(circle, rgba(33, 15, 55, 0.18) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(33, 15, 55, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        animation: 'float 20s ease-in-out infinite, pulse 8s ease-in-out infinite',
        zIndex: 0
      }} />

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} showAuthButtons={true} isHomePage={true} />

      {/* Hero Section */}
      <main style={{
        maxWidth: '1700px',
        margin: '0 auto',
        padding: '0 3rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          minHeight: '95vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          {/* Ultra Premium Badge */}
          <div className="fade-in-up delay-1" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.25rem',
            background: darkMode
              ? 'linear-gradient(135deg, rgba(67, 61, 139, 0.2) 0%, rgba(46, 35, 108, 0.2) 100%)'
              : 'linear-gradient(135deg, rgba(67, 61, 139, 0.12) 0%, rgba(46, 35, 108, 0.12) 100%)',
            backdropFilter: 'blur(40px)',
            padding: '1rem 2.5rem',
            borderRadius: '100px',
            border: `2px solid ${theme.border}`,
            marginBottom: '3.5rem',
            boxShadow: darkMode
              ? '0 10px 40px rgba(67, 61, 139, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 6px 30px rgba(67, 61, 139, 0.2)'
          }}>
            <span style={{
              fontSize: '1.75rem',
              filter: `drop-shadow(0 0 15px ${theme.primary})`
            }}>🚀</span>
            <span style={{
              fontSize: '1rem',
              fontWeight: '900',
              letterSpacing: '2.5px',
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 50%, ${theme.secondary} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase'
            }}>
              Phase V Hackathon 2026 • Enterprise Edition
            </span>
          </div>

          {/* Ultra Large Hero Heading */}
          <h1 className="fade-in-up delay-2" style={{
            fontSize: '6.5rem',
            fontWeight: '900',
            margin: '0 0 3rem 0',
            lineHeight: '1',
            letterSpacing: '-5px',
            maxWidth: '1400px',
            color: theme.text,
            textShadow: darkMode ? '0 0 80px rgba(67, 61, 139, 0.5)' : 'none'
          }}>
            Next-Generation
            <br/>
            <span style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 30%, ${theme.secondary} 60%, ${theme.accent} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              display: 'inline-block'
            }}>
              Event-Driven Architecture
              {/* Animated underline */}
              <div style={{
                position: 'absolute',
                bottom: '-15px',
                left: '5%',
                right: '5%',
                height: '8px',
                background: `linear-gradient(90deg, transparent, ${theme.primary}, ${theme.secondary}, ${theme.primary}, transparent)`,
                borderRadius: '4px',
                opacity: 0.7,
                boxShadow: `0 0 20px ${theme.primary}`
              }} />
            </span>
          </h1>

          {/* Premium Subtitle with Highlights */}
          <p className="fade-in-up delay-3" style={{
            fontSize: '1.65rem',
            margin: '0 auto 4.5rem',
            maxWidth: '1000px',
            fontWeight: '500',
            lineHeight: '1.9',
            color: theme.textMuted
          }}>
            Enterprise-grade microservices powered by{' '}
            <span style={{
              color: theme.primary,
              fontWeight: '800',
              background: darkMode ? 'rgba(67, 61, 139, 0.2)' : 'rgba(67, 61, 139, 0.1)',
              padding: '0.25rem 0.75rem',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`
            }}>Dapr abstraction</span>,{' '}
            <span style={{
              color: theme.primary,
              fontWeight: '800',
              background: darkMode ? 'rgba(67, 61, 139, 0.2)' : 'rgba(67, 61, 139, 0.1)',
              padding: '0.25rem 0.75rem',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`
            }}>Kafka streaming</span>, and{' '}
            <span style={{
              color: theme.primary,
              fontWeight: '800',
              background: darkMode ? 'rgba(67, 61, 139, 0.2)' : 'rgba(67, 61, 139, 0.1)',
              padding: '0.25rem 0.75rem',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`
            }}>real-time WebSocket</span>.
            <br/>
            <strong style={{ color: theme.text, fontWeight: '700' }}>
              Built for scale. Designed for performance. Ready for production.
            </strong>
          </p>

          {/* Ultra Premium CTA Buttons */}
          <div className="fade-in-up delay-4" style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '7rem'
          }}>
            <button
              onClick={() => router.push('/login')}
              style={{
                padding: '1.5rem 3.5rem',
                fontSize: '1.2rem',
                fontWeight: '900',
                background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 50%, ${theme.secondary} 100%)`,
                color: 'white',
                border: 'none',
                borderRadius: '18px',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: `0 15px 50px ${theme.primary}70, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                letterSpacing: '1px',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-6px) scale(1.03)';
                e.target.style.boxShadow = `0 20px 60px ${theme.primary}90, inset 0 1px 0 rgba(255, 255, 255, 0.3)`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = `0 15px 50px ${theme.primary}70, inset 0 1px 0 rgba(255, 255, 255, 0.2)`;
              }}
            >
              Launch Application →
            </button>
            <button
              onClick={() => window.open('https://github.com/umemasultan/Phase_5', '_blank')}
              style={{
                padding: '1.5rem 3.5rem',
                fontSize: '1.2rem',
                fontWeight: '900',
                background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(33, 15, 55, 0.08)',
                color: theme.text,
                border: `2.5px solid ${theme.border}`,
                borderRadius: '18px',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(40px)',
                letterSpacing: '1px',
                boxShadow: darkMode ? 'inset 0 1px 0 rgba(255, 255, 255, 0.1)' : 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-6px) scale(1.03)';
                e.target.style.background = darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(33, 15, 55, 0.12)';
                e.target.style.borderColor = theme.primary;
                e.target.style.boxShadow = `0 15px 40px ${theme.primary}40`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.background = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(33, 15, 55, 0.08)';
                e.target.style.borderColor = theme.border;
                e.target.style.boxShadow = darkMode ? 'inset 0 1px 0 rgba(255, 255, 255, 0.1)' : 'none';
              }}
            >
              <span style={{ marginRight: '1rem', fontSize: '1.3rem' }}>⭐</span>
              View on GitHub
            </button>
          </div>

          {/* Ultra Premium Architecture Cards */}
          <div className="fade-in-up delay-5" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '3rem',
            width: '100%',
            maxWidth: '1500px'
          }}>
            {[
              {
                icon: '⚡',
                title: 'Dapr Abstraction Layer',
                desc: 'Complete abstraction over Kafka with zero direct dependencies. Production-ready building blocks for distributed systems.',
                gradient: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
                stats: '100% Abstracted'
              },
              {
                icon: '🔄',
                title: '6 Microservices',
                desc: 'Backend, Recurring, Notification, Audit, WebSocket, Frontend. Fully decoupled architecture with event-driven communication.',
                gradient: `linear-gradient(135deg, ${theme.primaryLight} 0%, ${theme.secondary} 100%)`,
                stats: '6 Services'
              },
              {
                icon: '🚀',
                title: 'Real-Time Collaboration',
                desc: 'WebSocket live updates with instant synchronization across all connected clients. Sub-second latency guaranteed.',
                gradient: `linear-gradient(135deg, ${theme.secondary} 0%, ${theme.accent} 100%)`,
                stats: '<1s Latency'
              },
              {
                icon: '🔐',
                title: 'Production Ready',
                desc: 'Dapr Secrets management, complete CI/CD pipeline, Kubernetes deployment with Helm charts. Enterprise-grade security.',
                gradient: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.primary} 100%)`,
                stats: 'Enterprise Grade'
              }
            ].map((feature, i) => (
              <div key={i} className="fade-in-up" style={{
                animationDelay: `${1.4 + i * 0.2}s`,
                opacity: 0,
                background: theme.cardBg,
                backdropFilter: 'blur(40px)',
                padding: '3rem',
                borderRadius: '28px',
                border: `2.5px solid ${theme.border}`,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: darkMode
                  ? '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  : '0 6px 30px rgba(0, 0, 0, 0.08)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 30px 80px ${theme.primary}50`;
                e.currentTarget.style.borderColor = theme.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = darkMode
                  ? '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  : '0 6px 30px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = theme.border;
              }}>
                {/* Top gradient bar */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '5px',
                  background: feature.gradient,
                  opacity: 0.9
                }} />

                {/* Stats badge */}
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  padding: '0.5rem 1rem',
                  background: darkMode ? 'rgba(67, 61, 139, 0.3)' : 'rgba(67, 61, 139, 0.15)',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  color: theme.primary,
                  border: `1px solid ${theme.border}`
                }}>
                  {feature.stats}
                </div>

                <div style={{
                  fontSize: '4rem',
                  marginBottom: '2rem',
                  filter: `drop-shadow(0 0 25px ${theme.primary})`,
                  transition: 'transform 0.6s'
                }}>{feature.icon}</div>

                <h3 style={{
                  fontSize: '1.6rem',
                  fontWeight: '900',
                  margin: '0 0 1.25rem 0',
                  color: theme.text,
                  letterSpacing: '-1px'
                }}>{feature.title}</h3>

                <p style={{
                  fontSize: '1.1rem',
                  margin: 0,
                  lineHeight: '1.8',
                  color: theme.textMuted,
                  fontWeight: '500'
                }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Ultra Premium Tech Stack */}
          <div className="fade-in-up delay-7" style={{
            marginTop: '7rem',
            padding: '3.5rem',
            background: darkMode
              ? 'linear-gradient(135deg, rgba(67, 61, 139, 0.15) 0%, rgba(46, 35, 108, 0.15) 100%)'
              : 'linear-gradient(135deg, rgba(67, 61, 139, 0.1) 0%, rgba(46, 35, 108, 0.1) 100%)',
            backdropFilter: 'blur(40px)',
            borderRadius: '32px',
            border: `2.5px solid ${theme.border}`,
            maxWidth: '1200px',
            boxShadow: darkMode
              ? '0 25px 70px rgba(67, 61, 139, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 15px 50px rgba(67, 61, 139, 0.15)'
          }}>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: '900',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: theme.primary,
              marginBottom: '2.5rem',
              textShadow: darkMode ? `0 0 20px ${theme.primary}` : 'none'
            }}>Powered By Enterprise Technologies</h4>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {['Dapr', 'Kafka', 'Kubernetes', 'PostgreSQL', 'FastAPI', 'Next.js', 'WebSocket', 'Helm', 'Docker', 'Strimzi'].map((tech, i) => (
                <span key={i} style={{
                  padding: '1rem 2rem',
                  background: darkMode ? 'rgba(67, 61, 139, 0.2)' : 'rgba(67, 61, 139, 0.12)',
                  borderRadius: '14px',
                  fontSize: '1.05rem',
                  fontWeight: '800',
                  color: theme.text,
                  border: `2px solid ${theme.border}`,
                  transition: 'all 0.4s',
                  cursor: 'pointer',
                  boxShadow: darkMode ? 'inset 0 1px 0 rgba(255, 255, 255, 0.1)' : 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = `linear-gradient(135deg, ${theme.primary}30, ${theme.secondary}30)`;
                  e.target.style.borderColor = theme.primary;
                  e.target.style.transform = 'translateY(-4px) scale(1.05)';
                  e.target.style.boxShadow = `0 10px 30px ${theme.primary}40`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = darkMode ? 'rgba(67, 61, 139, 0.2)' : 'rgba(67, 61, 139, 0.12)';
                  e.target.style.borderColor = theme.border;
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = darkMode ? 'inset 0 1px 0 rgba(255, 255, 255, 0.1)' : 'none';
                }}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
