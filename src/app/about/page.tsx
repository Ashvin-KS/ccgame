import Link from 'next/link'

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f0fdfa', padding: '16px' }}>
      <div style={{ maxWidth: '672px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>About Guess the Number</h1>
            <p style={{ color: '#4b5563' }}>Learn how to play and improve your skills</p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ backgroundColor: '#eff6ff', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e40af', marginBottom: '16px' }}>How to Play</h2>
              <div style={{ color: '#374151' }}>
                <p style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ color: '#3b82f6', marginRight: '8px', fontWeight: 'bold' }}>1.</span>
                  <span>I'll think of a secret number between 1 and 100 (or your chosen range)</span>
                </p>
                <p style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ color: '#3b82f6', marginRight: '8px', fontWeight: 'bold' }}>2.</span>
                  <span>You try to guess what the number is</span>
                </p>
                <p style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ color: '#3b82f6', marginRight: '8px', fontWeight: 'bold' }}>3.</span>
                  <span>I'll tell you if your guess is too high or too low</span>
                </p>
                <p style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ color: '#3b82f6', marginRight: '8px', fontWeight: 'bold' }}>4.</span>
                  <span>Keep guessing until you find the secret number!</span>
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: '#f0fdf4', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534', marginBottom: '16px' }}>Scoring System</h2>
              <div style={{ color: '#374151' }}>
                <p style={{ marginBottom: '8px' }}>• Your score starts at 1000 points</p>
                <p style={{ marginBottom: '8px' }}>• Each guess reduces your score by 10 points</p>
                <p style={{ marginBottom: '8px' }}>• Minimum score is 100 points</p>
                <p>• Fewer guesses = Higher score!</p>
              </div>
            </div>

            <div style={{ backgroundColor: '#faf5ff', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#6b21a8', marginBottom: '16px' }}>Difficulty Levels</h2>
              <div style={{ color: '#374151' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontWeight: '600', color: '#7c3aed' }}>Easy (1-50)</h3>
                    <p style={{ fontSize: '14px' }}>Perfect for beginners</p>
                  </div>
                  <span style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '4px 12px', borderRadius: '9999px', fontSize: '14px', fontWeight: '600' }}>+50% bonus</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontWeight: '600', color: '#7c3aed' }}>Medium (1-100)</h3>
                    <p style={{ fontSize: '14px' }}>Standard challenge</p>
                  </div>
                  <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '4px 12px', borderRadius: '9999px', fontSize: '14px', fontWeight: '600' }}>Normal scoring</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontWeight: '600', color: '#7c3aed' }}>Hard (1-200)</h3>
                    <p style={{ fontSize: '14px' }}>For experts only</p>
                  </div>
                  <span style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '4px 12px', borderRadius: '9999px', fontSize: '14px', fontWeight: '600' }}>+25% bonus</span>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#fef3c7', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#92400e', marginBottom: '16px' }}>Tips & Strategies</h2>
              <div style={{ color: '#374151' }}>
                <p style={{ marginBottom: '8px' }}>• Start with numbers in the middle of the range</p>
                <p style={{ marginBottom: '8px' }}>• Use the "too high/too low" feedback to narrow down your guesses</p>
                <p style={{ marginBottom: '8px' }}>• Try to divide the remaining range in half with each guess</p>
                <p>• Practice makes perfect - your best scores will improve over time</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', paddingTop: '24px', marginBottom: '16px' }}>
            <p style={{ color: '#4b5563', marginBottom: '16px' }}>Ready to test your skills?</p>
            <Link href="/game">
              <button style={{
                padding: '12px 32px',
                background: 'linear-gradient(to right, #10b981, #059669)',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '8px',
                cursor: 'pointer',
                border: 'none',
                fontSize: '16px'
              }}>
                Start Playing
              </button>
            </Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', paddingTop: '16px' }}>
            <Link href="/">
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                borderRadius: '8px',
                cursor: 'pointer',
                border: 'none'
              }}>
                Home
              </button>
            </Link>
            <Link href="/leaderboard">
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                borderRadius: '8px',
                cursor: 'pointer',
                border: 'none'
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