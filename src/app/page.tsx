'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [username, setUsername] = useState('')
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium')

  const handleStartGame = () => {
    if (username.trim()) {
      // Save username and difficulty to localStorage
      localStorage.setItem('playerName', username.trim())
      localStorage.setItem('selectedDifficulty', difficulty)
      // Navigate to game page
      window.location.href = '/game'
    } else {
      alert('Please enter your name to start playing!')
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
      <div style={{
        width: '100%',
        maxWidth: '450px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        padding: '40px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '12px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            Guess the Number
          </h1>
          <p style={{
            color: '#4a5568',
            fontSize: '18px',
            fontWeight: '500'
          }}>
            Can you guess the secret number?
          </p>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              width: '140px',
              height: '140px',
              margin: '0 auto',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
              transition: 'transform 0.3s ease'
            }}>
              <span style={{
                fontSize: '60px',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}>
                ?
              </span>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              textAlign: 'left',
              marginBottom: '8px',
              color: '#4a5568',
              fontWeight: '600'
            }}>
              Your Name:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0'
              }}
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              textAlign: 'left',
              marginBottom: '12px',
              color: '#4a5568',
              fontWeight: '600'
            }}>
              Select Difficulty:
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['Easy', 'Medium', 'Hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  style={{
                    flex: 1,
                    padding: '12px 8px',
                    border: '2px solid',
                    borderColor: difficulty === level ? '#667eea' : '#e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: difficulty === level ? '#667eea' : 'white',
                    color: difficulty === level ? 'white' : '#4a5568',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {level}
                </button>
              ))}
            </div>
            <p style={{
              fontSize: '12px',
              color: '#718096',
              marginTop: '8px',
              textAlign: 'left'
            }}>
              {difficulty === 'Easy' && 'Numbers from 1-50 (+50% score bonus)'}
              {difficulty === 'Medium' && 'Numbers from 1-100 (standard scoring)'}
              {difficulty === 'Hard' && 'Numbers from 1-200 (+25% score bonus)'}
            </p>
          </div>
          
          <button
            onClick={handleStartGame}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontWeight: 'bold',
              padding: '18px 24px',
              borderRadius: '12px',
              fontSize: '18px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
              transform: 'translateY(0)'
            }}
          >
            Start Game
          </button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px' }}>
          <Link href="/leaderboard">
            <button style={{
              padding: '12px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: '#4a5568',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}>
              Leaderboard
            </button>
          </Link>
          <Link href="/about">
            <button style={{
              padding: '12px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: '#4a5568',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}>
              About
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}