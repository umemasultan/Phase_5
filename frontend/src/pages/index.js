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

  // Consistent purple theme (TaskMaster Pro colors)
  const theme = darkMode ? {
    primary: '#210F37',
    primaryLight: '#3a1a5c',
    secondary: '#433D8B',
    accent: '#2E236C',
    background: '#0a0818',
    backgroundGradient: 'linear-gradient(135deg, #0a0818 0%, #17153B 50%, #2E236C 100%)',
    cardBg: 'rgba(46, 35, 108, 0.7)',
    text: '#ffffff',
    textMuted: 'rgba(255, 255, 255, 0.75)',
    border: 'rgba(67, 61, 139, 0.25)'
  } : {
    primary: '#210F37',
    primaryLight: '#3a1a5c',
    secondary: '#433D8B',
    accent: '#2E236C',
    background: '#f8fafc',
    backgroundGradient: 'linear-gradient(135deg, #f8f7fc 0%, #eeecf7 50%, #e4e1f1 100%)',
    cardBg: 'rgba(255, 255, 255, 0.9)',
    text: '#1f2937',
    textMuted: 'rgba(31, 41, 55, 0.7)',
    border: 'rgba(67, 61, 139, 0.2)'
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
        <title>Phase V - Enterprise Event-Driven Architecture</title>
        <meta name="description" content="Advanced cloud-native microservices with Dapr, Kafka, and real-time collaboration" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-40px) scale(1.05); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        .delay-4 { animation-delay: 0.8s; }
        .delay-5 { animation-delay: 1s; }
        .delay-6 { animation-delay: 1.2s; }
      `}</style>

      {/* Premium Background Effects */}
      <div style={{
        position: 'absolute',
        top: '-30%',
        right: '-15%',
        width: '800px',
        height: '800px',
        background: darkMode
          ? 'radial-gradient(circle, rgba(67, 61, 139, 0.2) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(67, 61, 139, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        animation: 'float 20s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-15%',
        width: '700px',
        height: '700px',
        background: darkMode
          ? 'radial-gradient(circle, rgba(46, 35, 108, 0.18) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(46, 35, 108, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        animation: 'float 25s ease-in-out infinite reverse',
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
          ? 'radial-gradient(circle, rgba(33, 15, 55, 0.15) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(33, 15, 55, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'float 15s ease-in-out infinite',
        zIndex: 0
      }} />

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} showAuthButtons={true} isHomePage={true} />

      {/* Hero Section */}
      <main style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '0 2.5rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          minHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          {/* Premium Badge */}
          <div className="fade-in-up delay-1" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            background: darkMode
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)'
              : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
            backdropFilter: 'blur(30px)',
            padding: '0.875rem 2rem',
            borderRadius: '100px',
            border: `2px solid ${theme.border}`,
            marginBottom: '3rem',
            boxShadow: darkMode
              ? '0 8px 32px rgba(59, 130, 246, 0.2)'
              : '0 4px 20px rgba(59, 130, 246, 0.15)'
          }}>
            <span style={{
              fontSize: '1.5rem',
              filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.8))'
            }}>🚀</span>
            <span style={{
              fontSize: '0.95rem',
              fontWeight: '800',
              letterSpacing: '2px',
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase'
            }}>
              Phase V Hackathon 2026 • Enterprise Edition
            </span>
          </div>

          {/* Hero Heading */}
          <h1 className="fade-in-up delay-2" style={{
            fontSize: '5.5rem',
            fontWeight: '900',
            margin: '0 0 2.5rem 0',
            lineHeight: '1.05',
            letterSpacing: '-4px',
            maxWidth: '1300px',
            color: theme.text
          }}>
            Next-Generation
            <br/>
            <span style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 50%, ${theme.secondary} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              display: 'inline-block'
            }}>
              Event-Driven Architecture
              <div style={{
                position: 'absolute',
                bottom: '-10px',
                left: '0',
                right: '0',
                height: '6px',
                background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`,
                borderRadius: '3px',
                opacity: 0.6
              }} />
            </span>
          </h1>

          {/* Premium Subtitle */}
          <p className="fade-in-up delay-3" style={{
            fontSize: '1.5rem',
            margin: '0 auto 4rem',
            maxWidth: '900px',
            fontWeight: '500',
            lineHeight: '1.8',
            color: theme.textMuted
          }}>
            Enterprise-grade microservices powered by{' '}
            <strong style={{
              color: theme.primary,
              fontWeight: '700'
            }}>Dapr abstraction</strong>,{' '}
            <strong style={{
              color: theme.primary,
              fontWeight: '700'
            }}>Kafka event streaming</strong>, and{' '}
            <strong style={{
              color: theme.primary,
              fontWeight: '700'
            }}>real-time WebSocket</strong> collaboration.
            <br/>
            Built for scale. Designed for performance. Ready for production.
          </p>

          {/* Premium CTA Buttons */}
          <div className="fade-in-up delay-4" style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '6rem'
          }}>
            <button
              onClick={() => router.push('/login')}
              style={{
                padding: '1.25rem 3rem',
                fontSize: '1.1rem',
                fontWeight: '800',
                background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: `0 10px 40px ${theme.primary}60`,
                letterSpacing: '0.5px',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px) scale(1.02)';
                e.target.style.boxShadow = `0 15px 50px ${theme.primary}80`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = `0 10px 40px ${theme.primary}60`;
              }}
            >
              Launch Application →
            </button>
            <button
              onClick={() => window.open('https://github.com/umemasultan/Phase_5', '_blank')}
              style={{
                padding: '1.25rem 3rem',
                fontSize: '1.1rem',
                fontWeight: '800',
                background: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(59, 130, 246, 0.08)',
                color: theme.text,
                border: `2px solid ${theme.border}`,
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(30px)',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px) scale(1.02)';
                e.target.style.background = darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(59, 130, 246, 0.12)';
                e.target.style.borderColor = theme.primary;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.background = darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(59, 130, 246, 0.08)';
                e.target.style.borderColor = theme.border;
              }}
            >
              <span style={{ marginRight: '0.75rem' }}>⭐</span>
              View on GitHub
            </button>
          </div>

          {/* Premium Architecture Cards */}
          <div className="fade-in-up delay-5" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            width: '100%',
            maxWidth: '1400px'
          }}>
            {[
              {
                icon: '⚡',
                title: 'Dapr Abstraction Layer',
                desc: 'Complete abstraction over Kafka with zero direct dependencies. Production-ready building blocks.',
                gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
              },
              {
                icon: '🔄',
                title: '6 Microservices',
                desc: 'Backend, Recurring, Notification, Audit, WebSocket, Frontend. Fully decoupled architecture.',
                gradient: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
              },
              {
                icon: '🚀',
                title: 'Real-Time Collaboration',
                desc: 'WebSocket live updates with instant synchronization across all connected clients.',
                gradient: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)'
              },
              {
                icon: '🔐',
                title: 'Production Ready',
                desc: 'Dapr Secrets, complete CI/CD pipeline, Kubernetes deployment with Helm charts.',
                gradient: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)'
              }
            ].map((feature, i) => (
              <div key={i} className="fade-in-up" style={{
                animationDelay: `${1.2 + i * 0.15}s`,
                opacity: 0,
                background: theme.cardBg,
                backdropFilter: 'blur(30px)',
                padding: '2.5rem',
                borderRadius: '24px',
                border: `2px solid ${theme.border}`,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.boxShadow = `0 25px 70px ${theme.primary}40`;
                e.currentTarget.style.borderColor = theme.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = theme.border;
              }}>
                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: feature.gradient,
                  opacity: 0.8
                }} />

                <div style={{
                  fontSize: '3.5rem',
                  marginBottom: '1.5rem',
                  filter: `drop-shadow(0 0 20px ${theme.primary}80)`,
                  transition: 'transform 0.5s'
                }}>{feature.icon}</div>

                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '800',
                  margin: '0 0 1rem 0',
                  color: theme.text,
                  letterSpacing: '-0.5px'
                }}>{feature.title}</h3>

                <p style={{
                  fontSize: '1.05rem',
                  margin: 0,
                  lineHeight: '1.7',
                  color: theme.textMuted,
                  fontWeight: '500'
                }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Premium Tech Stack */}
          <div className="fade-in-up delay-6" style={{
            marginTop: '6rem',
            padding: '3rem',
            background: darkMode
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0.08) 100%)'
              : 'linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, rgba(37, 99, 235, 0.06) 100%)',
            backdropFilter: 'blur(30px)',
            borderRadius: '28px',
            border: `2px solid ${theme.border}`,
            maxWidth: '1100px',
            boxShadow: darkMode
              ? '0 20px 60px rgba(59, 130, 246, 0.15)'
              : '0 10px 40px rgba(59, 130, 246, 0.1)'
          }}>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '800',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: theme.primary,
              marginBottom: '2rem'
            }}>Powered By Enterprise Technologies</h4>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {['Dapr', 'Kafka', 'Kubernetes', 'PostgreSQL', 'FastAPI', 'Next.js', 'WebSocket', 'Helm', 'Docker', 'Strimzi'].map((tech, i) => (
                <span key={i} style={{
                  padding: '0.75rem 1.75rem',
                  background: darkMode ? 'rgba(59, 130, 246, 0.12)' : 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: theme.text,
                  border: `1.5px solid ${theme.border}`,
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`;
                  e.target.style.borderColor = theme.primary;
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = darkMode ? 'rgba(59, 130, 246, 0.12)' : 'rgba(59, 130, 246, 0.1)';
                  e.target.style.borderColor = theme.border;
                  e.target.style.transform = 'translateY(0)';
                }}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
