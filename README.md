# Guess The Number Game

## Tech Stack Used
- **Frontend Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom inline styles
- **Language**: TypeScript
- **State Management**: React Hooks (useState, useEffect)
- **Data Persistence**: LocalStorage API
- **Deployment**: Netlify

## Screenshots / Demo Previews
### Landing Page
![Landing Page](./ss/landing.png)

### Game Page
![Game Page](./ss/game.png)

### Game Over Page
![Game Over Page](./ss/gameover.png)

### Leaderboard Page
![Leaderboard Page](./ss/leaderboard.png)

## GitHub Repository Link
[https://github.com/Ashvin-KS/ccgame.git](https://github.com/Ashvin-KS/ccgame.git)

## Deployment Link (if hosted)
[https://guessthenumbers6.netlify.app/](https://guessthenumbers6.netlify.app/)

## Brief Explanation (approach, features, challenges faced)
I built this number guessing game using Next.js 14 with the App Router. The game features four pages: Landing, Game, Game Over, and Leaderboard. 

**Approach**: Used React hooks for state management and localStorage for data persistence. Implemented a clean UI with gradient backgrounds and glass-morphism effects.

**Features**:
- Username input and difficulty selection
- Three difficulty levels (Easy: 1-50, Medium: 1-100, Hard: 1-200)
- Smart scoring system based on attempts and difficulty
- Persistent leaderboard with sorting options
- Responsive design for all devices

**Challenges Faced**:
1. Initially faced issues with Tailwind CSS classes not applying correctly, resolved by switching to inline styles
2. Ensuring game data persisted across page refreshes required careful localStorage implementation
3. Maintaining theme consistency across all pages
4. Creating a cohesive user experience with proper navigation between pages

The scoring system rewards fewer attempts and higher difficulty levels with appropriate multipliers.