'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface GameData {
  name: string
  score: number
  attempts: number
  date: string
  difficulty: string
  targetNumber: number
  guessedNumber: number
}

export default function GameOverPage() {
  const [latestGame, setLatestGame] = useState<GameData | null>(null)

  useEffect(() => {
    // Get the latest game from localStorage
    const games = JSON.parse(localStorage.getItem('guessTheNumberGames') || '[]')
    if (games.length > 0) {
      setLatestGame(games[games.length - 1])
    }
  }, [])

  const getScoreMessage = (score: number) => {
    if (score >= 1500) return "🏆 Outstanding! You're a master!"
    if (score >= 1000) return "🎯 Excellent! Great job!"
    if (score >= 700) return "👍 Good work! Keep practicing!"
    return "💪 Nice try! You'll do better next time!"
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  return (
    <main style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '450px', width: '100%' }}>
        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
          borderRadius: '24px', 
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          padding: '32px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ 
              fontSize: '36px', 
              fontWeight: 'bold', 
              color: '#1a202c', 
              marginBottom: '16px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              Game Over!
            </h1>
            <p style={{ color: '#4a5568', fontSize: '18px', marginBottom: '8px' }}>
              Thanks for playing!
            </p>
          </div>

          {latestGame ? (
            <div style={{ marginBottom: '32px' }}>
              <div style={{ 
                textAlign: 'center', 
                padding: '32px', 
                background: 'linear-gradient(135deg, #fef3c7, #fde68a)', 
                borderRadius: '20px', 
                marginBottom: '24px',
                boxShadow: '0 8px 24px rgba(251, 191, 36, 0.25)'
              }}>
                <p style={{ fontSize: '18px', color: '#92400e', marginBottom: '12px', fontWeight: '500' }}>
                  Player: <span style={{ fontWeight: '700' }}>{latestGame.name}</span>
                </p>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#92400e', marginBottom: '16px' }}>
                  Score: {latestGame.score}
                </p>
                <p style={{ fontSize: '16px', color: '#b45309', marginBottom: '8px' }}>
                  {getScoreMessage(latestGame.score)}
                </p>
              </div>
              
              <div style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                borderRadius: '16px', 
                padding: '24px',
                marginBottom: '24px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a202c', marginBottom: '16px', textAlign: 'center' }}>
                  Game Statistics
                </h2>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: '#4a5568', fontWeight: '500' }}>Difficulty:</span>
                  <span style={{ color: getDifficultyColor(latestGame.difficulty), fontWeight: '700' }}>
                    {latestGame.difficulty}
                  </span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: '#4a5568', fontWeight: '500' }}>Attempts:</span>
                  <span style={{ color: '#1a202c', fontWeight: '700' }}>{latestGame.attempts}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: '#4a5568', fontWeight: '500' }}>Target Number:</span>
                  <span style={{ color: '#1a202c', fontWeight: '700' }}>{latestGame.targetNumber}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#4a5568', fontWeight: '500' }}>Your Guess:</span>
                  <span style={{ color: '#1a202c', fontWeight: '700' }}>{latestGame.guessedNumber}</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '32px', 
              backgroundColor: 'rgba(219, 234, 254, 0.9)', 
              borderRadius: '16px', 
              marginBottom: '24px',
              backdropFilter: 'blur(10px)'
            }}>
              <p style={{ fontSize: '18px', color: '#1e40af' }}>
                No game data found. Play a game first!
              </p>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/game">
              <button style={{ 
                width: '100%', 
                padding: '16px', 
                background: 'linear-gradient(135deg, #10b981, #059669)', 
                color: 'white', 
                fontWeight: '600', 
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '18px',
                border: 'none',
                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)',
                transition: 'all 0.3s ease'
              }}>
                Play Again
              </button>
            </Link>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href="/" style={{ flex: 1 }}>
                <button style={{ 
                  width: '100%', 
                  padding: '14px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  color: '#4a5568', 
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}>
                  Home
                </button>
              </Link>
              
              <Link href="/leaderboard" style={{ flex: 1 }}>
                <button style={{ 
                  width: '100%', 
                  padding: '14px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  color: '#4a5568', 
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}>
                  Leaderboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}