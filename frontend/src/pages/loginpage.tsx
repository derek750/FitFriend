import React from 'react';
import { Dumbbell } from 'lucide-react';

export default function LoginPage() {
  // Event Handler
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/google/login";
  };


  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Work+Sans:wght@300;400;600;700&display=swap');
        
        * {
          font-family: 'Work Sans', sans-serif;
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
        
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
          pointer-events: none;
        }
        
        .orb-1 {
          width: 300px;
          height: 300px;
          background: #00ff88;
          top: -100px;
          left: -100px;
          animation-delay: 0s;
        }
        
        .orb-2 {
          width: 250px;
          height: 250px;
          background: #00d4ff;
          bottom: -80px;
          right: -80px;
          animation-delay: 5s;
        }
        
        .orb-3 {
          width: 200px;
          height: 200px;
          background: #00ff88;
          top: 50%;
          right: -100px;
          animation-delay: 10s;
        }
      `}</style>

      {/* Animated Background Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl mb-6 glow-effect">
            <Dumbbell className="w-10 h-10 text-white" />
          </div>
          <h1 className="hero-title text-5xl md:text-6xl mb-4">
            <span className="gradient-text">FITFRIEND</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            Your AI Workout Partner
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Welcome Back</h2>
            <p className="text-zinc-400">
              Ready to crush your fitness goals?
            </p>
          </div>

          {/* Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full px-8 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl text-lg font-bold hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Login
          </button>

          {/* Optional Footer Text */}
          <p className="text-center text-sm text-zinc-500 mt-8">
            By logging in, you agree to our{' '}
            <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Optional Sign Up Link */}
        <p className="text-center text-zinc-400 mt-8">
          Don't have an account?{' '}
          <a href="#" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}