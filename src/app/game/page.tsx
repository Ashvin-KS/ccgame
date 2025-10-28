'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GamePage() {
  const [targetNumber, setTargetNumber] = useState<number>(0)
  const [guess, setGuess] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [attempts, setAttempts] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const [range, setRange] = useState<number>(100)
  const [playerName, setPlayerName] = useState<string>('')
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium')

  useEffect(() => {
    // Load player data from localStorage
    const storedName = localStorage.getItem('playerName')
    const storedDifficulty = localStorage.getItem('selectedDifficulty') as 'Easy' | 'Medium' | 'Hard'
    
    if (storedName) {
      setPlayerName(storedName)
    }
    
    if (storedDifficulty) {
      setDifficulty(storedDifficulty)
      // Set range based on difficulty
      const difficultyRange = storedDifficulty === 'Easy' ? 50 : storedDifficulty === 'Hard' ? 200 : 100
      setRange(difficultyRange)
    }
    
    startNewGame(difficulty || 'Medium')
  }, [])

  const startNewGame = (selectedDifficulty?: 'Easy' | 'Medium' | 'Hard') => {
    const currentDifficulty = selectedDifficulty || difficulty
    const difficultyRange = currentDifficulty === 'Easy' ? 50 : currentDifficulty === 'Hard' ? 200 : 100
    const newTarget = Math.floor(Math.random() * difficultyRange) + 1
    setTargetNumber(newTarget)
    setGuess('')
    setMessage('')
    setAttempts(0)
    setGameOver(false)
    setScore(0)
    setRange(difficultyRange)
    if (selectedDifficulty) {
      setDifficulty(selectedDifficulty)
      localStorage.setItem('selectedDifficulty', selectedDifficulty)
    }
  }

  const handleGuess = () => {
    const guessNumber = parseInt(guess)
    
    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > range) {
      setMessage(`Please enter a valid number between 1 and ${range}`)
      return
    }

    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    if (guessNumber === targetNumber) {
      // Calculate score with difficulty bonus
      let calculatedScore = Math.max(1000 - (newAttempts * 10), 100)
      if (difficulty === 'Easy') {
        calculatedScore = Math.floor(calculatedScore * 1.5)
      } else if (difficulty === 'Hard') {
        calculatedScore = Math.floor(calculatedScore * 1.25)
      }
      
      setScore(calculatedScore)
      
      // Save game to localStorage
      const gameData = {
        name: playerName,
        score: calculatedScore,
        attempts: newAttempts,
        date: new Date().toISOString().split('T')[0],
        difficulty: difficulty,
        targetNumber: targetNumber,
        guessedNumber: guessNumber
      }
      
      const existingGames = JSON.parse(localStorage.getItem('guessTheNumberGames') || '[]')
      existingGames.push(gameData)
      localStorage.setItem('guessTheNumberGames', JSON.stringify(existingGames))
      
      setMessage(`🎉 Congratulations! You guessed the number ${targetNumber} in ${newAttempts} attempts!`)
      setGameOver(true)
    } else if (guessNumber < targetNumber) {
      setMessage('📈 Too low! Try a higher number.')
    } else {
      setMessage('📉 Too high! Try a lower number.')
    }

    setGuess('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !gameOver) {
      handleGuess()
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
              fontSize: '32px', 
              fontWeight: 'bold', 
              color: '#1a202c', 
              marginBottom: '12px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              Guess the Number
            </h1>
            <p style={{ color: '#4a5568', fontSize: '16px', marginBottom: '4px' }}>
              I'm thinking of a number between 1 and {range}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', padding: '0 8px' }}>
              <p style={{ fontSize: '14px', color: '#718096', fontWeight: '500' }}>
                Player: {playerName || 'Guest'}
              </p>
              <p style={{ fontSize: '14px', color: '#718096', fontWeight: '500' }}>
                Difficulty: {difficulty}
              </p>
            </div>
            <p style={{ fontSize: '14px', color: '#718096', marginTop: '8px', fontWeight: '600' }}>
              Attempts: {attempts}
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={gameOver}
                placeholder="Enter your guess"
                style={{ 
                  flex: 1, 
                  padding: '14px 16px', 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '12px', 
                  outline: 'none',
                  fontSize: '16px',
                  backgroundColor: gameOver ? 'rgba(255, 255, 255, 0.5)' : 'white',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => {
                  if (!gameOver) e.target.style.borderColor = '#667eea'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0'
                }}
              />
              <button
                onClick={handleGuess}
                disabled={gameOver}
                style={{ 
                  padding: '14px 32px', 
                  background: gameOver ? 'linear-gradient(135deg, #9ca3af, #6b7280)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                  color: 'white', 
                  fontWeight: '600', 
                  borderRadius: '12px',
                  cursor: gameOver ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  border: 'none',
                  boxShadow: gameOver ? 'none' : '0 8px 20px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                Guess
              </button>
            </div>

            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              {message && (
                <div style={{ 
                  padding: '20px', 
                  borderRadius: '16px',
                  backgroundColor: gameOver ? 'rgba(209, 250, 229, 0.9)' : 'rgba(219, 234, 254, 0.9)',
                  color: gameOver ? '#065f46' : '#1e40af',
                  fontWeight: '500',
                  fontSize: '16px',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${gameOver ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`
                }}>
                  {message}
                </div>
              )}
            </div>
          </div>

          {gameOver && (
            <div style={{ marginBottom: '32px' }}>
              <div style={{ 
                textAlign: 'center', 
                padding: '24px', 
                background: 'linear-gradient(135deg, #fef3c7, #fde68a)', 
                borderRadius: '16px', 
                marginBottom: '20px',
                boxShadow: '0 8px 20px rgba(251, 191, 36, 0.2)'
              }}>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#92400e', marginBottom: '8px' }}>
                  Your Score: {score}
                </p>
                <p style={{ fontSize: '14px', color: '#b45309' }}>Fewer attempts = Higher score!</p>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => startNewGame(difficulty)}
                  style={{ 
                    flex: 1, 
                    padding: '12px 20px', 
                    background: 'linear-gradient(135deg, #10b981, #059669)', 
                    color: 'white', 
                    fontWeight: '600', 
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Play Again
                </button>
                <Link href="/game-over">
                  <button style={{ 
                    flex: 1, 
                    padding: '12px 20px', 
                    background: 'linear-gradient(135deg, #6366f1, #4f46e5)', 
                    color: 'white', 
                    fontWeight: '600', 
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
                    transition: 'all 0.3s ease'
                  }}>
                    Game Over
                  </button>
                </Link>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <button
              onClick={() => startNewGame('Easy')}
              disabled={!gameOver}
              style={{ 
                flex: 1, 
                padding: '12px 8px', 
                fontSize: '14px', 
                fontWeight: '600', 
                borderRadius: '12px',
                background: difficulty === 'Easy' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.8)',
                color: difficulty === 'Easy' ? 'white' : '#4a5568',
                cursor: !gameOver ? 'not-allowed' : 'pointer',
                border: difficulty === 'Easy' ? 'none' : '1px solid rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
            >
              Easy (1-50)
            </button>
            <button
              onClick={() => startNewGame('Medium')}
              disabled={!gameOver}
              style={{ 
                flex: 1, 
                padding: '12px 8px', 
                fontSize: '14px', 
                fontWeight: '600', 
                borderRadius: '12px',
                background: difficulty === 'Medium' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.8)',
                color: difficulty === 'Medium' ? 'white' : '#4a5568',
                cursor: !gameOver ? 'not-allowed' : 'pointer',
                border: difficulty === 'Medium' ? 'none' : '1px solid rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
            >
              Medium (1-100)
            </button>
            <button
              onClick={() => startNewGame('Hard')}
              disabled={!gameOver}
              style={{ 
                flex: 1, 
                padding: '12px 8px', 
                fontSize: '14px', 
                fontWeight: '600', 
                borderRadius: '12px',
                background: difficulty === 'Hard' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.8)',
                color: difficulty === 'Hard' ? 'white' : '#4a5568',
                cursor: !gameOver ? 'not-allowed' : 'pointer',
                border: difficulty === 'Hard' ? 'none' : '1px solid rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
            >
              Hard (1-200)
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', paddingTop: '16px' }}>
            <Link href="/">
              <button style={{ 
                padding: '12px 20px', 
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
            <Link href="/leaderboard">
              <button style={{ 
                padding: '12px 20px', 
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
    </main>
  )
}