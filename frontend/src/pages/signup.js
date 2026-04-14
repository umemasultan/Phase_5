import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }

    // Check if already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      router.push('/tasks');
    }
  }, [router]);

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
      navBg: 'rgba(10, 8, 24, 0.8)',
      navText: 'white'
    },
    light: {
      primary: '#17153B',
      primaryLight: '#2E236C',
      accent: '#433D8B',
      background: 'linear-gradient(135deg, #f8f7fc 0%, #eeecf7 50%, #e4e1f1 100%)',
      cardBg: '#ffffff',
      text: '#1f2937',
      navBg: 'rgba(255, 255, 255, 0.9)',
      navText: '#17153B'
    }
  };

  const currentTheme = darkMode ? theme.dark : theme.light;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    if (users.find(u => u.email === formData.email)) {
      setError('Email already registered');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      createdAt: new Date().toISOString()
    };

    // Save user
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto login
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    // Redirect to tasks
    router.push('/tasks');
  };

  if (!mounted) return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.background,
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Head>
        <title>Sign Up - TaskMaster Pro</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      {/* Background Elements */}
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

      {/* Dark Mode Toggle */}
      <button onClick={toggleDarkMode} style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(23, 21, 59, 0.08)',
        color: darkMode ? 'white' : currentTheme.primary,
        border: 'none',
        padding: '12px 18px',
        borderRadius: '12px',
        fontWeight: '700',
        cursor: 'pointer',
        fontSize: '18px',
        zIndex: 10
      }}>
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Signup Card */}
      <div style={{
        background: currentTheme.cardBg,
        borderRadius: '24px',
        padding: '50px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: darkMode ? '0 20px 60px rgba(0,0,0,0.4)' : '0 10px 40px rgba(0,0,0,0.1)',
        border: darkMode ? '2px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(23, 21, 59, 0.08)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '70px',
            height: '70px',
            background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)`,
            borderRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            fontWeight: '900',
            color: 'white',
            margin: '0 auto 20px',
            boxShadow: '0 10px 30px rgba(46, 35, 108, 0.5), 0 0 20px rgba(23, 21, 59, 0.4)'
          }}>T</div>
          <h1 style={{
            color: darkMode ? '#ffffff' : currentTheme.text,
            fontSize: '32px',
            fontWeight: '900',
            margin: '0 0 10px 0',
            letterSpacing: '-0.5px'
          }}>Create Account</h1>
          <p style={{
            color: darkMode ? '#ffffff' : '#6b7280',
            fontSize: '16px',
            margin: 0
          }}>Join TaskMaster Pro Enterprise Edition</p>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '12px 20px',
            borderRadius: '12px',
            marginBottom: '20px',
            fontSize: '14px',
            fontWeight: '600',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: darkMode ? '#ffffff' : currentTheme.text,
              fontSize: '14px',
              fontWeight: '700',
              marginBottom: '8px'
            }}>Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '12px',
                border: darkMode ? '2px solid rgba(255,255,255,0.2)' : '2px solid #e5e7eb',
                fontSize: '16px',
                outline: 'none',
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                color: darkMode ? '#ffffff' : '#1f2937',
                fontWeight: '500'
              }}
              required
              placeholder="John Doe"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: darkMode ? '#ffffff' : currentTheme.text,
              fontSize: '14px',
              fontWeight: '700',
              marginBottom: '8px'
            }}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '12px',
                border: darkMode ? '2px solid rgba(255,255,255,0.2)' : '2px solid #e5e7eb',
                fontSize: '16px',
                outline: 'none',
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                color: darkMode ? '#ffffff' : '#1f2937',
                fontWeight: '500'
              }}
              required
              placeholder="your@email.com"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: darkMode ? '#ffffff' : currentTheme.text,
              fontSize: '14px',
              fontWeight: '700',
              marginBottom: '8px'
            }}>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '12px',
                border: darkMode ? '2px solid rgba(255,255,255,0.2)' : '2px solid #e5e7eb',
                fontSize: '16px',
                outline: 'none',
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                color: darkMode ? '#ffffff' : '#1f2937',
                fontWeight: '500'
              }}
              required
              placeholder="••••••••"
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              color: darkMode ? '#ffffff' : currentTheme.text,
              fontSize: '14px',
              fontWeight: '700',
              marginBottom: '8px'
            }}>Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '12px',
                border: darkMode ? '2px solid rgba(255,255,255,0.2)' : '2px solid #e5e7eb',
                fontSize: '16px',
                outline: 'none',
                background: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                color: darkMode ? '#ffffff' : '#1f2937',
                fontWeight: '500'
              }}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)`,
              color: 'white',
              border: 'none',
              padding: '18px',
              borderRadius: '12px',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '16px',
              boxShadow: '0 8px 25px rgba(46, 35, 108, 0.4), 0 0 15px rgba(23, 21, 59, 0.3)',
              letterSpacing: '0.3px',
              marginBottom: '20px'
            }}
          >
            Create Account
          </button>

          <div style={{ textAlign: 'center' }}>
            <p style={{
              color: darkMode ? '#ffffff' : '#6b7280',
              fontSize: '14px',
              margin: 0
            }}>
              Already have an account?{' '}
              <span
                onClick={() => router.push('/login')}
                style={{
                  color: currentTheme.primary,
                  fontWeight: '700',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
