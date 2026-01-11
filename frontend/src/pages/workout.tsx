import React, { useState } from 'react';
import { Dumbbell, Mic, ArrowLeft } from 'lucide-react';
import type { ChatMessage } from '../types/chat';
import type { AIResponse } from '../types/gemini';
import * as Gemini from '../api/gemini';

declare global {
    interface Window {
        webkitSpeechRecognition: any;
        SpeechRecognition: any;
    }
}

interface Exercise {
    name: string;
    sets: number;
    reps: number;
    bodyPart: string;
    completed: boolean;
}

interface WorkoutPageProps {
    onBack?: () => void;
}

export default function WorkoutPage({ onBack }: WorkoutPageProps) {
    const [isPushToTalk, setIsPushToTalk] = useState<boolean>(false);
    const [canTalk, setCanTalk] = useState<boolean>(true);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            sender: 'ai',
            message: "Hey User! What do you wanna work on today? Are you at the gym, or at home? Let me know!",
            timestamp: new Date()
        },
    ]);

    const [exercises] = useState<Exercise[]>([
        { name: 'Bench Press', sets: 4, reps: 12, bodyPart: 'Chest', completed: true },
        { name: 'Incline Dumbbell Press', sets: 3, reps: 10, bodyPart: 'Chest', completed: false },
        { name: 'Cable Flyes', sets: 3, reps: 15, bodyPart: 'Chest', completed: false },
        { name: 'Tricep Pushdowns', sets: 3, reps: 12, bodyPart: 'Triceps', completed: false },
        { name: 'Overhead Extension', sets: 3, reps: 12, bodyPart: 'Triceps', completed: false },
        { name: 'Dips', sets: 3, reps: 10, bodyPart: 'Triceps', completed: false }
    ]);

    // Event Handlers
    const handlePushToTalkPress = async () => {
        if (!canTalk) return;

        setIsPushToTalk(true);

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in this browser");
            setIsPushToTalk(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = async (event: any) => {
            const transcript = event.results[0][0].transcript;

            setChatMessages(prev => [
                ...prev,
                {
                    id: prev.length + 1,
                    sender: "user",
                    message: transcript,
                    timestamp: new Date()
                }
            ]);

            setCanTalk(false);

            try {
                const res: AIResponse = await Gemini.recommendExercise(transcript);
                setChatMessages(prev => [
                    ...prev,
                    {
                        id: prev.length + 1,
                        sender: "ai",
                        message: res.response,
                        timestamp: new Date()
                    }
                ]);
                console.log(res.response)

            } catch (err) {
                console.error("Gemini error:", err);
            } finally {
                setCanTalk(true);
            }
        };

        recognition.onend = () => {
            setIsPushToTalk(false);
        };

        recognition.onerror = () => {
            setIsPushToTalk(false);
        };

        recognition.start();
    };


    const handlePushToTalkRelease = () => {
        setIsPushToTalk(false);
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            console.log('Navigate back to homepage');
        }
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
          overflow: hidden;
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
        
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 40px rgba(0, 255, 136, 0.3);
          }
          50% {
            box-shadow: 0 0 60px rgba(0, 255, 136, 0.5);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        .workout-page-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          background: #09090b;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.2;
          pointer-events: none;
        }
        
        .orb-1 {
          width: 250px;
          height: 250px;
          background: #00ff88;
          top: -80px;
          left: -80px;
        }
        
        .orb-2 {
          width: 200px;
          height: 200px;
          background: #00d4ff;
          bottom: -60px;
          right: -60px;
        }

        /* Header */
        .workout-header {
          position: relative;
          z-index: 100;
          backdrop-filter: blur(20px);
          background: rgba(9, 9, 11, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.875rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }

        .back-button {
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #10b981;
        }

        .header-title {
          font-size: 1.125rem;
          font-weight: 700;
        }

        /* Main Layout */
        .workout-main {
          display: flex;
          flex: 1;
          overflow: hidden;
          position: relative;
          z-index: 10;
          min-height: 0;
        }

        /* Left Panel - Chat */
        .chat-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.02);
          min-width: 0;
        }

        .chat-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }

        .chat-header h2 {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .chat-subtitle {
          font-size: 0.8125rem;
          color: #a1a1aa;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-height: 0;
        }

        .chat-messages::-webkit-scrollbar {
          width: 5px;
        }

        .chat-messages::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 3px;
        }

        .chat-message {
          display: flex;
          gap: 0.65rem;
          animation: fadeIn 0.3s ease-out;
        }

        .chat-message.user {
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-weight: 700;
          font-size: 0.8125rem;
        }

        .message-avatar.ai {
          background: linear-gradient(135deg, #10b981, #06b6d4);
        }

        .message-avatar.user {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
        }

        .message-content {
          max-width: 70%;
        }

        .message-bubble {
          padding: 0.65rem 0.875rem;
          border-radius: 14px;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .message-bubble.ai {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .message-bubble.user {
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .message-time {
          font-size: 0.6875rem;
          color: #71717a;
          margin-top: 0.25rem;
          padding: 0 0.5rem;
        }

        /* Push to Talk */
        .push-to-talk-container {
          padding: 1.25rem 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.875rem;
          background: rgba(9, 9, 11, 0.5);
          backdrop-filter: blur(10px);
          flex-shrink: 0;
        }

        .push-to-talk-button {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #06b6d4);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          position: relative;
          box-shadow: 0 10px 40px rgba(16, 185, 129, 0.3);
        }

        .push-to-talk-button:hover {
          transform: scale(1.08);
          box-shadow: 0 15px 50px rgba(16, 185, 129, 0.5);
        }

        .push-to-talk-button:active {
          transform: scale(0.95);
        }

        .push-to-talk-button.active {
          animation: pulse 1s ease-in-out infinite;
        }

        .push-to-talk-button.active::before {
          content: '';
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          border-radius: 50%;
          border: 2px solid #10b981;
          animation: ripple 1.5s ease-out infinite;
        }

        .push-to-talk-text {
          font-size: 0.8125rem;
          color: #a1a1aa;
          font-weight: 600;
        }

        .push-to-talk-text.active {
          color: #10b981;
        }

        /* Right Panel - Exercises */
        .exercises-panel {
          width: 340px;
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.02);
          flex-shrink: 0;
        }

        .exercises-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }

        .exercises-header h2 {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .exercises-subtitle {
          font-size: 0.8125rem;
          color: #a1a1aa;
        }

        .exercises-list {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          min-height: 0;
        }

        .exercises-list::-webkit-scrollbar {
          width: 5px;
        }

        .exercises-list::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .exercises-list::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 3px;
        }

        .exercise-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          padding: 1rem;
          margin-bottom: 0.875rem;
          transition: all 0.3s ease;
        }

        .exercise-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .exercise-item.completed {
          opacity: 0.5;
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .exercise-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 0.65rem;
        }

        .exercise-name {
          font-size: 0.9375rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .exercise-body-part {
          font-size: 0.6875rem;
          color: #10b981;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .exercise-status {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid #71717a;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .exercise-status.completed {
          background: #10b981;
          border-color: #10b981;
        }

        .exercise-status.completed::after {
          content: '✓';
          color: white;
          font-size: 0.6875rem;
          font-weight: 700;
        }

        .exercise-details {
          display: flex;
          gap: 0.875rem;
          font-size: 0.8125rem;
          color: #a1a1aa;
        }

        .exercise-detail-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .exercise-detail-value {
          font-weight: 700;
          color: white;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .exercises-panel {
            width: 300px;
          }
        }

        @media (max-width: 768px) {
          .workout-main {
            flex-direction: column;
          }

          .chat-panel {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .exercises-panel {
            width: 100%;
            max-height: 35vh;
          }
        }
      `}</style>

            <div className="workout-page-wrapper">
                {/* Background Orbs */}
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>

                {/* Header */}
                <header className="workout-header">
                    <button onClick={handleBack} className="back-button">
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 className="hero-title header-title">
                            <span className="gradient-text">ACTIVE WORKOUT</span>
                        </h1>
                    </div>
                </header>

                {/* Main Content */}
                <div className="workout-main">
                    {/* Left Panel - Chat */}
                    <div className="chat-panel">
                        <div className="chat-header">
                            <h2 className="hero-title gradient-text">AI COACH</h2>
                            <p className="chat-subtitle">Your personal training assistant</p>
                        </div>

                        <div className="chat-messages">
                            {chatMessages.map((msg) => (
                                <div key={msg.id} className={`chat-message ${msg.sender}`}>
                                    <div className={`message-avatar ${msg.sender}`}>
                                        {msg.sender === 'ai' ? (
                                            <Dumbbell size={16} />
                                        ) : (
                                            'U'
                                        )}
                                    </div>
                                    <div className="message-content">
                                        <div className={`message-bubble ${msg.sender}`}>
                                            {msg.message}
                                        </div>
                                        <div className="message-time">
                                            {msg.timestamp.toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Push to Talk */}
                        <div className="push-to-talk-container">
                            <button
                                className={`push-to-talk-button ${isPushToTalk ? 'active' : ''}`}
                                onMouseDown={handlePushToTalkPress}
                                onMouseUp={handlePushToTalkRelease}
                                onMouseLeave={handlePushToTalkRelease}
                                onTouchStart={handlePushToTalkPress}
                                onTouchEnd={handlePushToTalkRelease}
                            >
                                <Mic size={28} color="white" />
                            </button>
                            <p className={`push-to-talk-text ${isPushToTalk ? 'active' : ''}`}>
                                {isPushToTalk ? 'Listening...' : 'Hold to Speak'}
                            </p>
                        </div>
                    </div>

                    {/* Right Panel - Exercises */}
                    <div className="exercises-panel">
                        <div className="exercises-header">
                            <h2 className="hero-title gradient-text">UP NEXT</h2>
                            <p className="exercises-subtitle">{exercises.filter(e => !e.completed).length} exercises remaining</p>
                        </div>

                        <div className="exercises-list">
                            {exercises.map((exercise, index) => (
                                <div key={index} className={`exercise-item ${exercise.completed ? 'completed' : ''}`}>
                                    <div className="exercise-header">
                                        <div>
                                            <div className="exercise-name">{exercise.name}</div>
                                            <div className="exercise-body-part">{exercise.bodyPart}</div>
                                        </div>
                                        <div className={`exercise-status ${exercise.completed ? 'completed' : ''}`}></div>
                                    </div>
                                    <div className="exercise-details">
                                        <div className="exercise-detail-item">
                                            <span className="exercise-detail-value">{exercise.sets}</span>
                                            <span>sets</span>
                                        </div>
                                        <span>×</span>
                                        <div className="exercise-detail-item">
                                            <span className="exercise-detail-value">{exercise.reps}</span>
                                            <span>reps</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}