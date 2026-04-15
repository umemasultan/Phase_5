import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Single consistent dark theme
  const theme = {
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    secondary: '#8b5cf6',
    background: '#0a0818',
    backgroundGradient: 'linear-gradient(135deg, #0a0818 0%, #17153B 50%, #1e1b4b 100%)',
    cardBg: 'rgba(30, 27, 75, 0.6)',
    text: '#ffffff',
    textMuted: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(99, 102, 241, 0.2)'
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
        <title>Phase V - Advanced Event-Driven Task Management</title>
        <meta name="description" content="Enterprise-grade microservices architecture with Dapr, Kafka, and real-time collaboration" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.6); }
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
      `}</style>

      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'float 15s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'float 20s ease-in-out infinite reverse',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 12s ease-in-out infinite',
        zIndex: 0
      }} />

      <Navbar darkMode={true} toggleDarkMode={() => {}} showAuthButtons={true} isHomePage={true} />

      {/* Hero Section */}
      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          {/* Top Badge */}
          <div className="fade-in-up delay-1" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(99, 102, 241, 0.1)',
            backdropFilter: 'blur(20px)',
            padding: '0.75rem 1.5rem',
            borderRadius: '100px',
            border: `1px solid ${theme.border}`,
            marginBottom: '2.5rem'
          }}>
            <span style={{ fontSize: '1.25rem' }}>🚀</span>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '700',
              letterSpacing: '1.5px',
              color: '#a5b4fc',
              textTransform: 'uppercase'
            }}>
              Phase V Hackathon 2026
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="fade-in-up delay-2" style={{
            fontSize: '4.5rem',
            fontWeight: '900',
            margin: '0 0 2rem 0',
            lineHeight: '1.1',
            letterSpacing: '-3px',
            maxWidth: '1100px',
            color: theme.text
          }}>
            Enterprise-Grade
            <br/>
            <span style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative'
            }}>
              Event-Driven Architecture
            </span>
          </h1>

          {/* Subtitle */}
          <p className="fade-in-up delay-3" style={{
            fontSize: '1.35rem',
            margin: '0 auto 3.5rem',
            maxWidth: '800px',
            fontWeight: '500',
            lineHeight: '1.8',
            color: theme.textMuted
          }}>
            Advanced microservices with <strong style={{ color: '#a5b4fc' }}>Dapr abstraction</strong>,
            <strong style={{ color: '#a5b4fc' }}> Kafka event streaming</strong>, and
            <strong style={{ color: '#a5b4fc' }}> real-time WebSocket</strong> collaboration.
            Built for scale, designed for performance.
          </p>

          {/* CTA Buttons */}
          <div className="fade-in-up delay-4" style={{
            display: 'flex',
            gap: '1.25rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '5rem'
          }}>
            <button
              onClick={() => router.push('/login')}
              style={{
                padding: '1.125rem 2.5rem',
                fontSize: '1.05rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 30px rgba(99, 102, 241, 0.4)',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 40px rgba(99, 102, 241, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.4)';
              }}
            >
              Launch Application →
            </button>
            <button
              onClick={() => window.open('https://github.com/umemasultan/Phase_5', '_blank')}
              style={{
                padding: '1.125rem 2.5rem',
                fontSize: '1.05rem',
                fontWeight: '700',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                border: '1.5px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(20px)',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <span style={{ marginRight: '0.5rem' }}>⭐</span>
              View on GitHub
            </button>
          </div>

          {/* Architecture Highlights */}
          <div className="fade-in-up delay-5" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            width: '100%',
            maxWidth: '1200px'
          }}>
            {[
              {
                icon: '⚡',
                title: 'Dapr Abstraction',
                desc: 'Zero direct Kafka usage, complete abstraction layer',
                color: '#6366f1'
              },
              {
                icon: '🔄',
                title: '6 Microservices',
                desc: 'Backend, Recurring, Notification, Audit, WebSocket, Frontend',
                color: '#8b5cf6'
              },
              {
                icon: '🚀',
                title: 'Real-Time Sync',
                desc: 'WebSocket live updates across all connected clients',
                color: '#a78bfa'
              },
              {
                icon: '🔐',
                title: 'Production Ready',
                desc: 'Dapr Secrets, CI/CD, Kubernetes deployment',
                color: '#c4b5fd'
              }
            ].map((feature, i) => (
              <div key={i} style={{
                background: theme.cardBg,
                backdropFilter: 'blur(20px)',
                padding: '2rem',
                borderRadius: '20px',
                border: `1px solid ${theme.border}`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 20px 60px ${feature.color}40`;
                e.currentTarget.style.borderColor = feature.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = theme.border;
              }}>
                {/* Glow effect */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: `radial-gradient(circle, ${feature.color}20 0%, transparent 70%)`,
                  opacity: 0,
                  transition: 'opacity 0.4s'
                }} />

                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1.25rem',
                  filter: `drop-shadow(0 0 20px ${feature.color}80)`
                }}>{feature.icon}</div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  margin: '0 0 0.75rem 0',
                  color: theme.text,
                  letterSpacing: '-0.5px'
                }}>{feature.title}</h3>

                <p style={{
                  fontSize: '0.95rem',
                  margin: 0,
                  lineHeight: '1.6',
                  color: theme.textMuted
                }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="fade-in-up delay-5" style={{
            marginTop: '5rem',
            padding: '2rem',
            background: 'rgba(99, 102, 241, 0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: `1px solid ${theme.border}`,
            maxWidth: '900px'
          }}>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '700',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#a5b4fc',
              marginBottom: '1.5rem'
            }}>Powered By</h4>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {['Dapr', 'Kafka', 'Kubernetes', 'PostgreSQL', 'FastAPI', 'Next.js', 'WebSocket', 'Helm'].map((tech, i) => (
                <span key={i} style={{
                  padding: '0.5rem 1.25rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: theme.text,
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
