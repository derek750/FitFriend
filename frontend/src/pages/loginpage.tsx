import React from 'react';
import { Dumbbell } from 'lucide-react';

export default function LoginPage() {
  // Event Handler
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/google/login";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Work+Sans:wght@300;400;600;700&display=swap');
        
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }

        * {
          font-family: 'Work Sans', sans-serif;
          box-sizing: border-box;
        }
        
        .hero-title {
          font-family: 'Archivo Black', sans-serif;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 40px rgba(0, 255, 136, 0.3);
          }
          50% {
            box-shadow: 0 0 60px rgba(0, 255, 136, 0.5);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glow-effect {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .login-page-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #09090b;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow: hidden;
        }
        
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
          pointer-events: none;
        }
        
        .orb-1 {
          width: 400px;
          height: 400px;
          background: #00ff88;
          top: -150px;
          left: -150px;
          animation-delay: 0s;
        }
        
        .orb-2 {
          width: 350px;
          height: 350px;
          background: #00d4ff;
          bottom: -120px;
          right: -120px;
          animation-delay: 5s;
        }
        
        .orb-3 {
          width: 300px;
          height: 300px;
          background: #00ff88;
          top: 50%;
          right: -150px;
          animation-delay: 10s;
        }

        .login-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 480px;
        }

        .logo-container {
          text-align: center;
          margin-bottom: 3rem;
        }

        .logo-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #10b981, #06b6d4);
          border-radius: 24px;
          margin-bottom: 2rem;
        }

        .logo-title {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .logo-subtitle {
          color: #a1a1aa;
          font-size: 1.25rem;
        }

        .login-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 3rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .card-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .card-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: white;
        }

        .card-subtitle {
          color: #a1a1aa;
          font-size: 1.125rem;
        }

        .login-button {
          width: 100%;
          padding: 1.25rem;
          background: linear-gradient(135deg, #10b981, #06b6d4);
          border: none;
          border-radius: 16px;
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-button:hover {
          box-shadow: 0 20px 60px rgba(16, 185, 129, 0.4);
          transform: scale(1.05);
        }

        .login-button:active {
          transform: scale(0.95);
        }

        .footer-text {
          text-align: center;
          font-size: 0.875rem;
          color: #71717a;
          margin-top: 2rem;
        }

        .footer-link {
          color: #10b981;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #06b6d4;
        }

        .signup-text {
          text-align: center;
          margin-top: 2rem;
          color: #a1a1aa;
          font-size: 1rem;
        }

        .signup-link {
          color: #10b981;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .signup-link:hover {
          color: #06b6d4;
        }

        @media (max-width: 768px) {
          .logo-icon {
            width: 80px;
            height: 80px;
          }

          .logo-title {
            font-size: 3rem;
          }

          .card-title {
            font-size: 2rem;
          }

          .login-card {
            padding: 2rem;
          }
        }
      `}</style>

      <div className="login-page-container">
        {/* Animated Background Orbs */}
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        {/* Login Content */}
        <div className="login-content animate-fade-in">
          {/* Logo Section */}
          <div className="logo-container">
            <div className="logo-icon glow-effect">
              <Dumbbell size={48} color="white" />
            </div>
            <h1 className="hero-title logo-title">
              <span className="gradient-text">FITFRIEND</span>
            </h1>
            <p className="logo-subtitle">Your AI Workout Partner</p>
          </div>

          {/* Login Card */}
          <div className="login-card">
            <div className="card-header">
              <h2 className="card-title">Welcome Back</h2>
              <p className="card-subtitle">Ready to crush your fitness goals?</p>
            </div>

            {/* Login Button */}
            <button onClick={handleGoogleLogin} className="login-button glow-effect">
              Login
            </button>

            {/* Footer Text */}
            <p className="footer-text">
              By logging in, you agree to our{' '}
              <a href="#" className="footer-link">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="footer-link">Privacy Policy</a>
            </p>
          </div>

          {/* Sign Up Link */}
          <p className="signup-text">
            Don't have an account?{' '}
            <a href="#" className="signup-link">Sign Up</a>
          </p>
        </div>
      </div>
    </>
  );
}