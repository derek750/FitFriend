import React, { useEffect, useState } from 'react';
import { Dumbbell, Calendar, Clock, Plus, ChevronRight, X, TrendingUp, Pencil, Trash2 } from 'lucide-react';
import type { Workout } from '../types/workout';
import * as Mongo from '../api/mongo';

interface HomePageProps {
    username?: string;
}

export default function HomePage({ username = "User" }: HomePageProps) {
    const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        const loadWorkouts = async () => {
            try {
                const workouts = await Mongo.getAllWorkouts();
                setWorkouts(workouts);
            } catch (err) {
                console.error("Error loading workouts:", err);
            }
        };

        loadWorkouts();
    }, []);

    // Event Handlers
    const handleStartWorkout = () => {
        console.log('Start new workout clicked');
        // Navigate to new workout page or open create workout form
    };

    const handleEditWorkout = (workout: Workout, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent modal from opening
        console.log('Edit workout clicked', workout);
        // Open edit workout modal/page
    };

    const handleDeleteWorkout = async (workout: Workout, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent modal from opening
        
        if (window.confirm('Are you sure you want to delete this workout?')) {
            try {
                console.log('Delete workout clicked', workout);
                // Add your delete logic here
                // await Mongo.deleteWorkout(workout.id);
                // Refresh workouts list
                setWorkouts(workouts.filter(w => w !== workout));
            } catch (err) {
                console.error("Error deleting workout:", err);
            }
        }
    };

    const handleWorkoutClick = (workout: Workout) => {
        setSelectedWorkout(workout);
    };

    const handleCloseModal = () => {
        setSelectedWorkout(null);
    };

    // Helper Functions
    const formatDate = (date: Date): string => {
        const today = new Date();
        const workoutDate = new Date(date);

        if (workoutDate.toDateString() === today.toDateString()) {
            return 'Today';
        }

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        if (workoutDate.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        }

        return workoutDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    };

    const getTotalDuration = (workout: Workout): number => {
        return workout.task.reduce((total, task) => total + task.timeTaken, 0);
    };

    const getUniqueBodyParts = (workout: Workout): string[] => {
        const bodyParts = workout.task.map(task => task.bodyPart);
        return Array.from(new Set(bodyParts));
    };

    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'auto', background: '#09090b' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Work+Sans:wght@300;400;600;700&display=swap');
        
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
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

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-zoom-in {
          animation: zoomIn 0.3s ease-out forwards;
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
        
        .homepage-container {
          min-height: 100vh;
          width: 100%;
          max-width: 100vw;
          background: #09090b;
          color: white;
          position: relative;
          overflow-x: hidden;
        }
        
        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(100px);
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
          top: 40%;
          right: -100px;
          animation-delay: 10s;
        }

        /* Header */
        .header {
          position: relative;
          z-index: 100;
          backdrop-filter: blur(20px);
          background: rgba(9, 9, 11, 0.8);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          width: 100%;
        }

        .header-content {
          max-width: 100%;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .header-logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #10b981, #06b6d4);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-logo-text {
          font-size: 1.25rem;
          letter-spacing: 0.05em;
        }

        .header-user {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .header-user-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #10b981, #06b6d4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
        }

        .header-user-name {
          font-weight: 600;
        }

        .header-welcome {
          font-size: 0.875rem;
          color: #a1a1aa;
        }

        /* Main Content */
        .main-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 100%;
          padding: 2rem;
        }

        /* Hero Section */
        .hero-section {
          text-align: center;
          margin-bottom: 3rem;
          width: 100%;
        }

        .hero-title-main {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.1;
        }

        .hero-subtitle {
          font-size: 1rem;
          color: #a1a1aa;
          margin-bottom: 1.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .start-workout-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #10b981, #06b6d4);
          border: none;
          border-radius: 16px;
          font-size: 1rem;
          font-weight: 700;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .start-workout-btn:hover {
          box-shadow: 0 20px 60px rgba(16, 185, 129, 0.4);
          transform: scale(1.05);
        }

        .start-workout-btn:active {
          transform: scale(0.95);
        }

        /* Section Header */
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          width: 100%;
        }

        .section-title {
          font-size: 1.5rem;
        }

        .section-count {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #a1a1aa;
          font-size: 0.875rem;
          font-weight: 600;
        }

        /* Workout Grid */
        .workout-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          width: 100%;
        }

        .workout-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .workout-card:hover {
          border-color: rgba(16, 185, 129, 0.5);
          box-shadow: 0 20px 60px rgba(16, 185, 129, 0.2);
          transform: translateY(-8px) scale(1.02);
        }

        .workout-card:hover .workout-actions {
          opacity: 1;
        }

        .workout-visual {
          width: 100%;
          height: 160px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2));
          border-radius: 16px;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .workout-visual::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1));
        }

        .workout-actions {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          gap: 0.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 10;
        }

        .action-btn {
          padding: 0.5rem;
          background: rgba(9, 9, 11, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn.edit:hover {
          background: rgba(16, 185, 129, 0.2);
          border-color: #10b981;
        }

        .action-btn.delete:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: #ef4444;
        }

        .workout-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .workout-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .workout-date, .workout-duration {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .workout-date {
          color: #10b981;
        }

        .workout-duration {
          color: #06b6d4;
        }

        .workout-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .workout-tag {
          padding: 0.375rem 0.75rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #10b981;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .workout-tag-more {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
          color: #a1a1aa;
        }

        .workout-footer {
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .workout-count {
          font-size: 0.875rem;
          color: #a1a1aa;
          font-weight: 600;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          width: 100%;
        }

        .empty-icon {
          margin: 0 auto 1.5rem;
          color: #52525b;
        }

        .empty-title {
          font-size: 1.25rem;
          color: #e4e4e7;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .empty-subtitle {
          color: #71717a;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .modal-overlay.hidden {
          display: none;
        }

        .modal-content {
          background: rgba(9, 9, 11, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(16, 185, 129, 0.2);
        }

        .modal-header {
          position: sticky;
          top: 0;
          background: rgba(9, 9, 11, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 10;
        }

        .modal-header-info h2 {
          font-size: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .modal-header-meta {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          font-size: 0.875rem;
        }

        .modal-close-btn {
          padding: 0.625rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .modal-body {
          padding: 1.5rem;
        }

        .exercises-section {
          margin-bottom: 2rem;
        }

        .exercises-title {
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #e4e4e7;
          margin-bottom: 1rem;
        }

        .exercises-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .exercise-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .exercise-card:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .exercise-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .exercise-name {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .exercise-stats {
          text-align: right;
        }

        .exercise-reps {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .exercise-reps-label {
          font-size: 0.75rem;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .exercise-timing {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .timing-item-label {
          font-size: 0.75rem;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .timing-item-value {
          font-size: 1rem;
          font-weight: 700;
        }

        .timing-item-value.started {
          color: #06b6d4;
        }

        .timing-item-value.duration {
          color: #10b981;
        }

        /* Summary */
        .summary-card {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1));
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 16px;
          padding: 2rem;
        }

        .summary-title {
          text-align: center;
          font-size: 1.125rem;
          margin-bottom: 1.5rem;
        }

        .summary-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .summary-stat {
          text-align: center;
        }

        .summary-stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .summary-stat-label {
          font-size: 0.75rem;
          color: #a1a1aa;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .hero-title-main {
            font-size: 2rem;
          }

          .workout-grid {
            grid-template-columns: 1fr;
          }

          .header-welcome {
            display: none;
          }

          .header-user-name {
            display: none;
          }

          .summary-stats {
            grid-template-columns: 1fr;
          }

          .main-content {
            padding: 1.5rem;
          }
        }
      `}</style>

            <div className="homepage-container">
                {/* Animated Background Orbs */}
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>

                {/* Header */}
                <header className="header">
                    <div className="header-content">
                        <div className="header-logo">
                            <div className="header-logo-icon glow-effect">
                                <Dumbbell size={24} color="white" />
                            </div>
                            <span className="hero-title header-logo-text gradient-text">FITFRIEND</span>
                        </div>
                        <div className="header-user">
                            <span className="header-welcome">Welcome,</span>
                            <div className="header-user-avatar">
                                {username.charAt(0).toUpperCase()}
                            </div>
                            <span className="header-user-name">{username}</span>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="main-content">
                    {/* Hero Section */}
                    <div className="hero-section animate-fade-in">
                        <h1 className="hero-title hero-title-main">
                            READY TO <span className="gradient-text">TRAIN?</span>
                        </h1>
                        <p className="hero-subtitle">
                            Let's crush your fitness goals. Start a new workout or review your progress.
                        </p>

                        <button onClick={handleStartWorkout} className="start-workout-btn glow-effect">
                            <Plus size={20} />
                            Start New Workout
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    {/* Workout History */}
                    <div>
                        <div className="section-header">
                            <h2 className="hero-title section-title gradient-text">YOUR WORKOUTS</h2>
                            <div className="section-count">
                                <TrendingUp size={16} />
                                <span>{workouts.length} {workouts.length === 1 ? 'workout' : 'workouts'}</span>
                            </div>
                        </div>

                        {workouts.length === 0 ? (
                            <div className="empty-state animate-fade-in">
                                <div className="empty-icon">
                                    <TrendingUp size={60} />
                                </div>
                                <p className="empty-title">No workouts yet</p>
                                <p className="empty-subtitle">Start your first workout to see it here!</p>
                            </div>
                        ) : (
                            <div className="workout-grid">
                                {workouts.map((workout, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleWorkoutClick(workout)}
                                        className="workout-card animate-fade-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        {/* Action Buttons */}
                                        <div className="workout-actions">
                                            <button 
                                                className="action-btn edit" 
                                                onClick={(e) => handleEditWorkout(workout, e)}
                                                title="Edit Workout"
                                            >
                                                <Pencil size={16} color="#10b981" />
                                            </button>
                                            <button 
                                                className="action-btn delete" 
                                                onClick={(e) => handleDeleteWorkout(workout, e)}
                                                title="Delete Workout"
                                            >
                                                <Trash2 size={16} color="#ef4444" />
                                            </button>
                                        </div>

                                        <div className="workout-visual">
                                            <Dumbbell size={60} color="rgba(16, 185, 129, 0.4)" style={{ position: 'relative', zIndex: 1 }} />
                                        </div>

                                        <div className="workout-info">
                                            <div className="workout-meta">
                                                <div className="workout-date">
                                                    <Calendar size={14} />
                                                    <span>{formatDate(workout.date)}</span>
                                                </div>
                                                <div className="workout-duration">
                                                    <Clock size={14} />
                                                    <span>{formatTime(getTotalDuration(workout))}</span>
                                                </div>
                                            </div>

                                            <div className="workout-tags">
                                                {getUniqueBodyParts(workout).slice(0, 3).map((bodyPart, i) => (
                                                    <span key={i} className="workout-tag">
                                                        {bodyPart}
                                                    </span>
                                                ))}
                                                {getUniqueBodyParts(workout).length > 3 && (
                                                    <span className="workout-tag workout-tag-more">
                                                        +{getUniqueBodyParts(workout).length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="workout-footer">
                                                <p className="workout-count">
                                                    {workout.task.length} {workout.task.length === 1 ? 'Exercise' : 'Exercises'}
                                                </p>
                                                <ChevronRight size={18} color="rgba(16, 185, 129, 0.5)" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>

                {/* Workout Detail Modal */}
                <div
                    className={`modal-overlay ${selectedWorkout ? '' : 'hidden'}`}
                    onClick={handleCloseModal}
                >
                    {selectedWorkout && (
                        <div
                            className="modal-content animate-zoom-in"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="modal-header">
                                <div className="modal-header-info">
                                    <h2 className="hero-title gradient-text">WORKOUT DETAILS</h2>
                                    <div className="modal-header-meta">
                                        <div className="workout-date">
                                            <Calendar size={14} />
                                            <span>{formatDate(selectedWorkout.date)}</span>
                                        </div>
                                        <div className="workout-duration">
                                            <Clock size={14} />
                                            <span>{formatTime(getTotalDuration(selectedWorkout))}</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={handleCloseModal} className="modal-close-btn">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="modal-body">
                                {/* Exercise List */}
                                <div className="exercises-section">
                                    <h3 className="exercises-title">Exercises</h3>
                                    <div className="exercises-list">
                                        {selectedWorkout.task.map((task, index) => (
                                            <div key={index} className="exercise-card">
                                                <div className="exercise-header">
                                                    <div>
                                                        <h4 className="exercise-name">{task.exercise}</h4>
                                                        <span className="workout-tag">{task.bodyPart}</span>
                                                    </div>
                                                    <div className="exercise-stats">
                                                        <div className="exercise-reps gradient-text">
                                                            {task.sets} × {task.reps}
                                                        </div>
                                                        <div className="exercise-reps-label">Sets × Reps</div>
                                                    </div>
                                                </div>

                                                <div className="exercise-timing">
                                                    <div>
                                                        <div className="timing-item-label">Time Started</div>
                                                        <div className="timing-item-value started">{formatTime(task.timeStarted)}</div>
                                                    </div>
                                                    <div>
                                                        <div className="timing-item-label">Duration</div>
                                                        <div className="timing-item-value duration">{formatTime(task.timeTaken)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Summary Stats */}
                                <div className="summary-card glow-effect">
                                    <h3 className="hero-title summary-title gradient-text">
                                        WORKOUT SUMMARY
                                    </h3>
                                    <div className="summary-stats">
                                        <div className="summary-stat">
                                            <div className="summary-stat-value gradient-text">
                                                {selectedWorkout.task.length}
                                            </div>
                                            <div className="summary-stat-label">Exercises</div>
                                        </div>
                                        <div className="summary-stat">
                                            <div className="summary-stat-value gradient-text">
                                                {selectedWorkout.task.reduce((sum, task) => sum + task.sets, 0)}
                                            </div>
                                            <div className="summary-stat-label">Total Sets</div>
                                        </div>
                                        <div className="summary-stat">
                                            <div className="summary-stat-value gradient-text">
                                                {formatTime(getTotalDuration(selectedWorkout))}
                                            </div>
                                            <div className="summary-stat-label">Duration</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}