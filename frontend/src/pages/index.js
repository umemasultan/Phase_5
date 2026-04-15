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

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode
        ? 'linear-gradient(135deg, #0a0818 0%, #17153B 50%, #2E236C 100%)'
        : 'linear-gradient(135deg, #f8f7fc 0%, #eeecf7 50%, #e4e1f1 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Head>
        <title>Phase V Todo - Event-Driven Task Management</title>
        <meta name="description" content="Advanced cloud-native task management with Dapr and Kafka" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.3s; opacity: 0; }
        .delay-4 { animation-delay: 0.4s; opacity: 0; }
      `}</style>

      {/* Background Blur Elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: darkMode ? 'rgba(46, 35, 108, 0.3)' : 'rgba(46, 35, 108, 0.15)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 8s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '400px',
        height: '400px',
        background: darkMode ? 'rgba(67, 61, 139, 0.25)' : 'rgba(67, 61, 139, 0.12)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 10s ease-in-out infinite reverse',
        zIndex: 0
      }} />

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} showAuthButtons={true} isHomePage={true} />

      {/* Hero Section */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          {/* Badge */}
          <div className="fade-in delay-1" style={{
            display: 'inline-block',
            background: darkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)',
            padding: '0.5rem 1.25rem',
            borderRadius: '50px',
            marginBottom: '2rem',
            border: `1px solid ${darkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.2)'}`,
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '700',
              letterSpacing: '1px',
              color: darkMode ? '#a5b4fc' : '#6366f1'
            }}>
              ✨ PHASE V HACKATHON PROJECT
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="fade-in delay-2" style={{
            fontSize: '3.5rem',
            fontWeight: '900',
            margin: '0 0 1.5rem 0',
            color: darkMode ? '#ffffff' : '#17153B',
            lineHeight: '1.1',
            letterSpacing: '-2px',
            maxWidth: '900px'
          }}>
            Event-Driven Task Management
            <br/>
            <span style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              with Dapr & Kafka
            </span>
          </h1>

          {/* Subtitle */}
          <p className="fade-in delay-3" style={{
            fontSize: '1.25rem',
            margin: '0 auto 3rem',
            maxWidth: '700px',
            opacity: darkMode ? '0.85' : '0.7',
            fontWeight: '500',
            lineHeight: '1.7',
            color: darkMode ? 'rgba(255,255,255,0.85)' : '#1f2937'
          }}>
            Advanced cloud-native microservices architecture with Dapr abstraction,
            Kafka event streaming, and real-time collaboration.
          </p>

          {/* CTA Buttons */}
          <div className="fade-in delay-4" style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '4rem'
          }}>
            <button
              onClick={() => router.push('/login')}
              style={{
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
              }}
            >
              Get Started →
            </button>
            <button
              onClick={() => window.open('https://github.com/umemasultan/Phase_5', '_blank')}
              style={{
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: '700',
                background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(23,21,59,0.08)',
                color: darkMode ? 'white' : '#17153B',
                border: `1px solid ${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(23,21,59,0.15)'}`,
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.background = darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(23,21,59,0.12)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.background = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(23,21,59,0.08)';
              }}
            >
              View on GitHub
            </button>
          </div>

          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            width: '100%',
            maxWidth: '1000px',
            marginTop: '4rem'
          }}>
            {[
              { icon: '🚀', title: 'Event-Driven', desc: 'Kafka with Dapr abstraction' },
              { icon: '⚡', title: 'Real-Time Sync', desc: 'WebSocket live updates' },
              { icon: '🔄', title: 'Microservices', desc: '6 independent services' },
              { icon: '🔐', title: 'Secure', desc: 'Dapr Secrets management' }
            ].map((feature, i) => (
              <div key={i} className="fade-in" style={{
                animationDelay: `${0.5 + i * 0.1}s`,
                opacity: 0,
                background: darkMode ? 'rgba(23, 21, 59, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '1.5rem',
                borderRadius: '16px',
                border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(23,21,59,0.1)'}`,
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = darkMode
                  ? '0 8px 30px rgba(99, 102, 241, 0.3)'
                  : '0 8px 30px rgba(23, 21, 59, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{feature.icon}</div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  margin: '0 0 0.5rem 0',
                  color: darkMode ? '#ffffff' : '#17153B'
                }}>{feature.title}</h3>
                <p style={{
                  fontSize: '0.9rem',
                  margin: 0,
                  opacity: 0.7,
                  color: darkMode ? 'rgba(255,255,255,0.7)' : '#6b7280'
                }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
