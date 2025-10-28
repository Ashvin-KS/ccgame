export interface GameStats {
  score: number
  attempts: number
  timeElapsed: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  targetNumber: number
  guessedNumber: number
  date: string
}

export function calculateScore(attempts: number, difficulty: 'Easy' | 'Medium' | 'Hard'): number {
  const baseScore = 1000
  const penaltyPerAttempt = 10
  const minimumScore = 100

  // Calculate base score
  let score = baseScore - (attempts * penaltyPerAttempt)
  
  // Apply difficulty bonus
  if (difficulty === 'Easy') {
    score = Math.floor(score * 1.5)
  } else if (difficulty === 'Hard') {
    score = Math.floor(score * 1.25)
  }

  // Ensure minimum score
  return Math.max(score, minimumScore)
}

export function generateTargetNumber(maxRange: number): number {
  return Math.floor(Math.random() * maxRange) + 1
}

export function getDifficultyRange(difficulty: 'Easy' | 'Medium' | 'Hard'): number {
  switch (difficulty) {
    case 'Easy':
      return 50
    case 'Medium':
      return 100
    case 'Hard':
      return 200
    default:
      return 100
  }
}

export function saveGameToLocalStorage(stats: GameStats): void {
  const existingGames = getGamesFromLocalStorage()
  existingGames.push(stats)
  
  // Keep only the last 50 games
  const recentGames = existingGames.slice(-50)
  
  localStorage.setItem('guessTheNumberGames', JSON.stringify(recentGames))
}

export function getGamesFromLocalStorage(): GameStats[] {
  if (typeof window === 'undefined') {
    return []
  }
  
  try {
    const stored = localStorage.getItem('guessTheNumberGames')
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return []
  }
}

export function getTopScores(count: number = 10): GameStats[] {
  const games = getGamesFromLocalStorage()
  
  // Sort by score (highest first) and return top N
  return games
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  
  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  
  return `${seconds}s`
}

export function validateGuess(guess: number, min: number, max: number): boolean {
  return guess >= min && guess <= max && !isNaN(guess)
}