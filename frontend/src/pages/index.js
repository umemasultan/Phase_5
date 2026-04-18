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
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .fade-in-up {
          animation: fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }
        .scale-in {
          animation: scaleIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }
        .slide-in-left {
          animation: slideInLeft 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }
        .slide-in-right {
          animation: slideInRight 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        .delay-4 { animation-delay: 0.8s; }
        .delay-5 { animation-delay: 1s; }
        .delay-6 { animation-delay: 1.2s; }
        .delay-7 { animation-delay: 1.4s; }
        .delay-8 { animation-delay: 1.6s; }

        /* Responsive styles */
        @media (max-width: 1024px) {
          .hero-title { font-size: 4rem !important; letter-spacing: -2px !important; }
          .hero-subtitle { font-size: 1.2rem !important; }
          .hero-tagline { font-size: 1.3rem !important; }
          .cta-button { padding: 1.2rem 2.5rem !important; font-size: 1rem !important; }
          .tech-badge { padding: 1rem 2rem !important; font-size: 1rem !important; }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.8rem !important; letter-spacing: -1.5px !important; margin-bottom: 2rem !important; }
          .hero-subtitle { font-size: 1.05rem !important; margin-bottom: 2.5rem !important; padding: 0 1rem !important; }
          .hero-tagline { font-size: 1.15rem !important; margin-top: 1rem !important; }
          .premium-badge { padding: 0.9rem 2rem !important; gap: 1rem !important; font-size: 0.8rem !important; letter-spacing: 2px !important; margin-bottom: 2.5rem !important; }
          .premium-badge span:first-child { font-size: 1.5rem !important; }
          .cta-button { padding: 1rem 2rem !important; font-size: 0.95rem !important; }
          .cta-buttons { gap: 1.25rem !important; margin-bottom: 4rem !important; }
          .arch-card { padding: 2rem !important; }
          .arch-card h3 { font-size: 1.3rem !important; }
          .arch-card p { font-size: 0.95rem !important; }
          .arch-cards { gap: 2rem !important; }
          .tech-section { padding: 3rem 2rem !important; margin-top: 5rem !important; }
          .tech-badge { padding: 0.9rem 1.75rem !important; font-size: 0.95rem !important; gap: 1.25rem !important; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 2rem !important; letter-spacing: -0.5px !important; line-height: 1.2 !important; }
          .hero-subtitle { font-size: 0.95rem !important; padding: 0 0.5rem !important; line-height: 1.7 !important; }
          .hero-tagline { font-size: 1rem !important; margin-top: 1rem !important; }
          .premium-badge { padding: 0.7rem 1.25rem !important; font-size: 0.65rem !important; letter-spacing: 1.5px !important; gap: 0.75rem !important; margin-bottom: 2rem !important; }
          .premium-badge span:first-child { font-size: 1.25rem !important; }
          .cta-button { padding: 0.9rem 1.5rem !important; font-size: 0.85rem !important; width: 100%; max-width: 280px; }
          .cta-buttons { flex-direction: column !important; width: 100% !important; padding: 0 1rem !important; align-items: center !important; gap: 1rem !important; }
          .arch-cards { grid-template-columns: 1fr !important; gap: 1.5rem !important; padding: 0 0.5rem !important; }
          .arch-card { padding: 1.75rem !important; }
          .arch-card-icon { font-size: 2.5rem !important; margin-bottom: 1.25rem !important; }
          .arch-card h3 { font-size: 1.2rem !important; }
          .arch-card p { font-size: 0.9rem !important; line-height: 1.6 !important; }
          .tech-section { padding: 2.5rem 1.25rem !important; border-radius: 24px !important; margin-top: 4rem !important; }
          .tech-section h4 { font-size: 0.85rem !important; letter-spacing: 2px !important; margin-bottom: 2rem !important; }
          .tech-badge { padding: 0.75rem 1.25rem !important; font-size: 0.85rem !important; }
        }

        @media (max-width: 360px) {
          .hero-title { font-size: 1.75rem !important; }
          .hero-subtitle { font-size: 0.9rem !important; }
          .hero-tagline { font-size: 0.95rem !important; }
          .premium-badge { padding: 0.6rem 1rem !important; font-size: 0.6rem !important; }
          .cta-button { padding: 0.85rem 1.25rem !important; font-size: 0.8rem !important; }
          .arch-card { padding: 1.5rem !important; }
          .tech-section { padding: 2rem 1rem !important; }
          .tech-badge { padding: 0.7rem 1rem !important; font-size: 0.8rem !important; }
        }
      `}</style></style>

      {/* Ultra Premium Background Effects with Grid */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: darkMode
          ? 'linear-gradient(rgba(67, 61, 139, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(67, 61, 139, 0.03) 1px, transparent 1px)'
          : 'linear-gradient(rgba(67, 61, 139, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(67, 61, 139, 0.02) 1px, transparent 1px)',
        backgroundSize: '100px 100px',
        opacity: 0.4,
        zIndex: 0
      }} />

      <div style={{
        position: 'absolute',
        top: '-40%',
        right: '-20%',
        width: '1200px',
        height: '1200px',
        background: darkMode
          ? 'radial-gradient(circle, rgba(67, 61, 139, 0.3) 0%, rgba(46, 35, 108, 0.2) 40%, transparent 70%)'
          : 'radial-gradient(circle, rgba(67, 61, 139, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(180px)',
        animation: 'float 25s ease-in-out infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-40%',
        left: '-20%',
        width: '1100px',
        height: '1100px',
        background: darkMode
          ? 'radial-gradient(circle, rgba(46, 35, 108, 0.28) 0%, rgba(33, 15, 55, 0.15) 40%, transparent 70%)'
          : 'radial-gradient(circle, rgba(46, 35, 108, 0.18) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(180px)',
        animation: 'float 30s ease-in-out infinite reverse',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1000px',
        height: '1000px',
        background: darkMode
          ? 'radial-gradient(circle, rgba(33, 15, 55, 0.22) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(33, 15, 55, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(150px)',
        animation: 'float 20s ease-in-out infinite, pulse 8s ease-in-out infinite',
        zIndex: 0
      }} />

      {/* Floating geometric shapes */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '10%',
        width: '300px',
        height: '300px',
        border: `2px solid ${theme.border}`,
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        animation: 'float 35s ease-in-out infinite, rotate 60s linear infinite',
        opacity: 0.15,
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: '250px',
        height: '250px',
        border: `2px solid ${theme.border}`,
        borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
        animation: 'float 40s ease-in-out infinite reverse, rotate 80s linear infinite reverse',
        opacity: 0.12,
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
        <style jsx>{`
          @media (max-width: 768px) {
            main { padding: 0 1.5rem !important; }
          }
          @media (max-width: 480px) {
            main { padding: 0 1rem !important; }
          }
        `}</style>
        <div style={{
          minHeight: '95vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '2rem 0'
        }}>
          {/* Ultra Premium Badge with Glow */}
          <div className="scale-in delay-1 premium-badge" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.5rem',
            background: darkMode
              ? 'linear-gradient(135deg, rgba(67, 61, 139, 0.25) 0%, rgba(46, 35, 108, 0.25) 100%)'
              : 'linear-gradient(135deg, rgba(67, 61, 139, 0.15) 0%, rgba(46, 35, 108, 0.15) 100%)',
            backdropFilter: 'blur(50px)',
            padding: '1.2rem 3rem',
            borderRadius: '100px',
            border: `2.5px solid ${theme.border}`,
            marginBottom: '4rem',
            boxShadow: darkMode
              ? `0 15px 50px rgba(67, 61, 139, 0.4), 0 0 80px ${theme.primary}30, inset 0 1px 0 rgba(255, 255, 255, 0.15)`
              : '0 8px 40px rgba(67, 61, 139, 0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Animated shimmer effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
              animation: 'shimmer 3s infinite'
            }} />
            <span style={{
              fontSize: '2rem',
              filter: `drop-shadow(0 0 20px ${theme.primary})`,
              animation: 'pulse 3s ease-in-out infinite'
            }}>🚀</span>
            <span style={{
              fontSize: '1.05rem',
              fontWeight: '900',
              letterSpacing: '3px',
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 50%, ${theme.secondary} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
              position: 'relative',
              zIndex: 1
            }}>
              Phase V Hackathon 2026 • Enterprise Edition
            </span>
          </div>

          {/* Hero Heading with Enhanced Effects */}
          <h1 className="fade-in-up delay-2 hero-title" style={{
            fontSize: '5.5rem',
            fontWeight: '900',
            margin: '0 0 3rem 0',
            lineHeight: '1.05',
            letterSpacing: '-4px',
            maxWidth: '1400px',
            color: theme.text,
            textShadow: darkMode ? `0 0 80px rgba(67, 61, 139, 0.5), 0 0 40px ${theme.primary}40` : 'none',
            position: 'relative'
          }}>
            Next-Generation
            <br/>
            <span style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 25%, ${theme.secondary} 50%, ${theme.accent} 75%, ${theme.primary} 100%)`,
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              display: 'inline-block',
              animation: 'shimmer 4s linear infinite'
            }}>
              Event-Driven Architecture
              {/* Multi-layer animated underline */}
              <div style={{
                position: 'absolute',
                bottom: '-18px',
                left: '3%',
                right: '3%',
                height: '8px',
                background: `linear-gradient(90deg, transparent, ${theme.primary}, ${theme.secondary}, ${theme.accent}, ${theme.primary}, transparent)`,
                borderRadius: '4px',
                opacity: 0.7,
                boxShadow: `0 0 25px ${theme.primary}, 0 0 50px ${theme.primary}40`,
                animation: 'pulse 3s ease-in-out infinite'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-28px',
                left: '8%',
                right: '8%',
                height: '4px',
                background: `linear-gradient(90deg, transparent, ${theme.secondary}60, transparent)`,
                borderRadius: '2px',
                opacity: 0.5
              }} />
            </span>
          </h1>

          {/* Enhanced Subtitle with Badges */}
          <p className="fade-in-up delay-3 hero-subtitle" style={{
            fontSize: '1.45rem',
            margin: '0 auto 4rem',
            maxWidth: '1050px',
            fontWeight: '500',
            lineHeight: '1.9',
            color: theme.textMuted
          }}>
            Enterprise-grade microservices powered by{' '}
            <span style={{
              color: theme.primary,
              fontWeight: '800',
              transition: 'all 0.3s'
            }}>Dapr abstraction</span>,{' '}
            <span style={{
              color: theme.primary,
              fontWeight: '800',
              transition: 'all 0.3s'
            }}>Kafka streaming</span>, and{' '}
            <span style={{
              color: theme.primary,
              fontWeight: '800',
              transition: 'all 0.3s'
            }}>real-time WebSocket</span>.
            <br/>
            <strong className="hero-tagline" style={{
              color: theme.text,
              fontWeight: '700',
              fontSize: '1.5rem',
              display: 'block',
              marginTop: '1.5rem',
              letterSpacing: '-0.5px'
            }}>
              Built for scale. Designed for performance. Ready for production.
            </strong>
          </p>

          {/* Enhanced CTA Buttons with Advanced Effects */}
          <div className="fade-in-up delay-4 cta-buttons" style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '6rem'
          }}>
            <button
              className="cta-button"
              onClick={() => router.push('/login')}
              style={{
                padding: '1.4rem 3.5rem',
                fontSize: '1.15rem',
                fontWeight: '800',
                background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 50%, ${theme.secondary} 100%)`,
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: `0 15px 45px ${theme.primary}70, 0 0 60px ${theme.primary}30, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                letterSpacing: '0.5px',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-6px) scale(1.03)';
                e.target.style.boxShadow = `0 20px 60px ${theme.primary}90, 0 0 80px ${theme.primary}50, inset 0 1px 0 rgba(255, 255, 255, 0.3)`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = `0 15px 45px ${theme.primary}70, 0 0 60px ${theme.primary}30, inset 0 1px 0 rgba(255, 255, 255, 0.2)`;
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>Launch Application →</span>
              {/* Shimmer overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                animation: 'shimmer 3s infinite'
              }} />
            </button>
            <button
              className="cta-button"
              onClick={() => window.open('https://github.com/umemasultan/Phase_5', '_blank')}
              style={{
                padding: '1.4rem 3.5rem',
                fontSize: '1.15rem',
                fontWeight: '800',
                background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(33, 15, 55, 0.08)',
                color: theme.text,
                border: `2.5px solid ${theme.border}`,
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(40px)',
                letterSpacing: '0.5px',
                boxShadow: darkMode ? 'inset 0 1px 0 rgba(255, 255, 255, 0.1)' : 'none',
                position: 'relative',
                overflow: 'hidden'
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
              <span style={{ marginRight: '0.75rem', fontSize: '1.25rem' }}>⭐</span>
              View on GitHub
            </button>
          </div>

          {/* Premium Architecture Cards with Advanced Hover Effects */}
          <div className="fade-in-up delay-5 arch-cards" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            width: '100%',
            maxWidth: '1500px'
          }}>
            {[
              {
                icon: '⚡',
                title: 'Dapr Abstraction Layer',
                desc: 'Complete abstraction over Kafka with zero direct dependencies. Production-ready building blocks for distributed systems.',
                gradient: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
                stats: '100% Abstracted',
                color: theme.primary
              },
              {
                icon: '🔄',
                title: '6 Microservices',
                desc: 'Backend, Recurring, Notification, Audit, WebSocket, Frontend. Fully decoupled architecture with event-driven communication.',
                gradient: `linear-gradient(135deg, ${theme.primaryLight} 0%, ${theme.secondary} 100%)`,
                stats: '6 Services',
                color: theme.primaryLight
              },
              {
                icon: '🚀',
                title: 'Real-Time Collaboration',
                desc: 'WebSocket live updates with instant synchronization across all connected clients. Sub-second latency guaranteed.',
                gradient: `linear-gradient(135deg, ${theme.secondary} 0%, ${theme.accent} 100%)`,
                stats: '<1s Latency',
                color: theme.secondary
              },
              {
                icon: '🔐',
                title: 'Production Ready',
                desc: 'Dapr Secrets management, complete CI/CD pipeline, Kubernetes deployment with Helm charts. Enterprise-grade security.',
                gradient: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.primary} 100%)`,
                stats: 'Enterprise Grade',
                color: theme.accent
              }
            ].map((feature, i) => (
              <div key={i} className="scale-in arch-card" style={{
                animationDelay: `${1.2 + i * 0.15}s`,
                opacity: 0,
                background: theme.cardBg,
                backdropFilter: 'blur(40px)',
                padding: '2.5rem',
                borderRadius: '24px',
                border: `2.5px solid ${theme.border}`,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: darkMode
                  ? '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  : '0 6px 30px rgba(0, 0, 0, 0.08)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 25px 80px ${feature.color}50, 0 0 60px ${feature.color}30`;
                e.currentTarget.style.borderColor = feature.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = darkMode
                  ? '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  : '0 6px 30px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = theme.border;
              }}>
                {/* Animated gradient bar */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '5px',
                  background: feature.gradient,
                  opacity: 0.9,
                  boxShadow: `0 0 20px ${feature.color}60`
                }} />

                {/* Glow effect on hover */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: `radial-gradient(circle, ${feature.color}15 0%, transparent 70%)`,
                  opacity: 0,
                  transition: 'opacity 0.5s',
                  pointerEvents: 'none'
                }} className="card-glow" />

                {/* Stats badge with enhanced styling */}
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  padding: '0.5rem 1rem',
                  background: darkMode ? 'rgba(67, 61, 139, 0.3)' : 'rgba(67, 61, 139, 0.15)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontWeight: '900',
                  color: feature.color,
                  border: `1.5px solid ${theme.border}`,
                  boxShadow: darkMode ? `0 0 15px ${feature.color}30` : 'none',
                  letterSpacing: '0.5px'
                }}>
                  {feature.stats}
                </div>

                <div className="arch-card-icon" style={{
                  fontSize: '3.5rem',
                  marginBottom: '1.75rem',
                  filter: `drop-shadow(0 0 25px ${feature.color})`,
                  transition: 'transform 0.5s',
                  display: 'inline-block'
                }}>{feature.icon}</div>

                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  margin: '0 0 1.25rem 0',
                  color: theme.text,
                  letterSpacing: '-0.5px',
                  lineHeight: '1.3'
                }}>{feature.title}</h3>

                <p style={{
                  fontSize: '1rem',
                  margin: 0,
                  lineHeight: '1.75',
                  color: theme.textMuted,
                  fontWeight: '500'
                }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Ultra Premium Tech Stack Section */}
          <div className="scale-in delay-7 tech-section" style={{
            marginTop: '8rem',
            padding: '4rem 3rem',
            background: darkMode
              ? 'linear-gradient(135deg, rgba(67, 61, 139, 0.2) 0%, rgba(46, 35, 108, 0.2) 100%)'
              : 'linear-gradient(135deg, rgba(67, 61, 139, 0.12) 0%, rgba(46, 35, 108, 0.12) 100%)',
            backdropFilter: 'blur(50px)',
            borderRadius: '36px',
            border: `3px solid ${theme.border}`,
            maxWidth: '1300px',
            boxShadow: darkMode
              ? `0 30px 90px rgba(67, 61, 139, 0.25), 0 0 100px ${theme.primary}20, inset 0 1px 0 rgba(255, 255, 255, 0.15)`
              : '0 20px 60px rgba(67, 61, 139, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Animated background pattern */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: darkMode
                ? 'radial-gradient(circle at 20% 50%, rgba(67, 61, 139, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(46, 35, 108, 0.1) 0%, transparent 50%)'
                : 'radial-gradient(circle at 20% 50%, rgba(67, 61, 139, 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(46, 35, 108, 0.06) 0%, transparent 50%)',
              opacity: 0.6,
              pointerEvents: 'none'
            }} />

            <h4 style={{
              fontSize: '1.2rem',
              fontWeight: '900',
              letterSpacing: '3.5px',
              textTransform: 'uppercase',
              color: theme.primary,
              marginBottom: '3rem',
              textShadow: darkMode ? `0 0 30px ${theme.primary}60` : 'none',
              position: 'relative',
              zIndex: 1
            }}>Powered By Enterprise Technologies</h4>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.75rem',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1
            }}>
              {['Dapr', 'Kafka', 'Kubernetes', 'PostgreSQL', 'FastAPI', 'Next.js', 'WebSocket', 'Helm', 'Docker', 'Strimzi'].map((tech, i) => (
                <span key={i} className="tech-badge" style={{
                  padding: '1.2rem 2.5rem',
                  background: darkMode ? 'rgba(67, 61, 139, 0.25)' : 'rgba(67, 61, 139, 0.15)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  fontSize: '1.1rem',
                  fontWeight: '800',
                  color: theme.text,
                  border: `2.5px solid ${theme.border}`,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  boxShadow: darkMode ? 'inset 0 1px 0 rgba(255, 255, 255, 0.12)' : 'none',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = `linear-gradient(135deg, ${theme.primary}40, ${theme.secondary}40)`;
                  e.target.style.borderColor = theme.primary;
                  e.target.style.transform = 'translateY(-6px) scale(1.08)';
                  e.target.style.boxShadow = `0 15px 40px ${theme.primary}50, 0 0 30px ${theme.primary}30`;
                  e.target.style.color = darkMode ? '#ffffff' : theme.primary;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = darkMode ? 'rgba(67, 61, 139, 0.25)' : 'rgba(67, 61, 139, 0.15)';
                  e.target.style.borderColor = theme.border;
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = darkMode ? 'inset 0 1px 0 rgba(255, 255, 255, 0.12)' : 'none';
                  e.target.style.color = theme.text;
                }}>
                  {tech}
                  {/* Shimmer effect */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                    animation: 'shimmer 4s infinite',
                    animationDelay: `${i * 0.2}s`
                  }} />
                </span>
              ))}
            </div>

            {/* Bottom decorative line */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '10%',
              right: '10%',
              height: '3px',
              background: `linear-gradient(90deg, transparent, ${theme.primary}, ${theme.secondary}, ${theme.primary}, transparent)`,
              opacity: 0.5,
              borderRadius: '3px'
            }} />
          </div>
        </div>
      </main>
    </div>
  );
}
