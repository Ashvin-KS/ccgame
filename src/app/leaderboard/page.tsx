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

export default function LeaderboardPage() {
  const [games, setGames] = useState<GameData[]>([])
  const [sortBy, setSortBy] = useState<'score' | 'date'>('score')

  useEffect(() => {
    // Load games from localStorage
    const storedGames = JSON.parse(localStorage.getItem('guessTheNumberGames') || '[]')
    
    // Sort by score (descending) by default
    const sortedGames = [...storedGames].sort((a, b) => 
      sortBy === 'score' ? b.score - a.score : new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    
    setGames(sortedGames)
  }, [sortBy])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `#${rank}`
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const clearLeaderboard = () => {
    if (window.confirm('Are you sure you want to clear all leaderboard data?')) {
      localStorage.removeItem('guessTheNumberGames')
      setGames([])
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
      <div style={{ maxWidth: '500px', width: '100%' }}>
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
              🏆 Leaderboard
            </h1>
            
            {games.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                <button
                  onClick={() => setSortBy('score')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    backgroundColor: sortBy === 'score' ? '#667eea' : 'rgba(255, 255, 255, 0.8)',
                    color: sortBy === 'score' ? 'white' : '#4a5568',
                    cursor: 'pointer',
                    border: sortBy === 'score' ? 'none' : '1px solid rgba(255, 255, 255, 0.5)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Top Scores
                </button>
                <button
                  onClick={() => setSortBy('date')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    backgroundColor: sortBy === 'date' ? '#667eea' : 'rgba(255, 255, 255, 0.8)',
                    color: sortBy === 'date' ? 'white' : '#4a5568',
                    cursor: 'pointer',
                    border: sortBy === 'date' ? 'none' : '1px solid rgba(255, 255, 255, 0.5)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Recent Games
                </button>
              </div>
            )}
          </div>

          {games.length > 0 ? (
            <div style={{ marginBottom: '32px' }}>
              <div style={{ 
                maxHeight: '400px', 
                overflowY: 'auto',
                paddingRight: '8px',
                marginBottom: '16px'
              }}>
                {games.map((game, index) => (
                  <div 
                    key={index}
                    style={{ 
                      backgroundColor: index < 3 ? 'rgba(251, 191, 36, 0.1)' : 'rgba(255, 255, 255, 0.7)', 
                      borderRadius: '16px', 
                      padding: '16px', 
                      marginBottom: '12px',
                      border: index < 3 ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>
                          {getRankEmoji(index + 1)}
                        </span>
                        <div>
                          <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1a202c', marginBottom: '4px' }}>
                            {game.name}
                          </p>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span 
                              style={{ 
                                fontSize: '12px', 
                                fontWeight: '600',
                                color: 'white',
                                backgroundColor: getDifficultyColor(game.difficulty),
                                padding: '2px 8px',
                                borderRadius: '12px'
                              }}
                            >
                              {game.difficulty}
                            </span>
                            <span style={{ fontSize: '12px', color: '#718096' }}>
                              {formatDate(game.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a202c' }}>
                          {game.score}
                        </p>
                        <p style={{ fontSize: '12px', color: '#718096' }}>
                          {game.attempts} attempts
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={clearLeaderboard}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  fontWeight: '600',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                Clear Leaderboard
              </button>
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '48px 24px', 
              backgroundColor: 'rgba(255, 255, 255, 0.7)', 
              borderRadius: '16px', 
              marginBottom: '24px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '8px' }}>
                No games played yet!
              </p>
              <p style={{ fontSize: '14px', color: '#718096' }}>
                Be the first to play and set a high score.
              </p>
            </div>
          )}

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
            
            <Link href="/game" style={{ flex: 1 }}>
              <button style={{ 
                width: '100%', 
                padding: '14px', 
                background: 'linear-gradient(135deg, #10b981, #059669)', 
                color: 'white', 
                fontWeight: '600', 
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '16px',
                border: 'none',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                transition: 'all 0.3s ease'
              }}>
                Play Game
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}