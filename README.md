# Guess the Number Game

A fun and interactive number guessing game built with Next.js and Tailwind CSS.

## Features

- **Landing Page**: Welcome screen with game introduction and play button
- **Game Page**: Interactive number guessing game with multiple difficulty levels
- **Game Over Page**: Displays final score and game statistics
- **Leaderboard Page**: Shows top scores and player rankings
- **About Page**: Instructions and tips for playing the game

## Game Mechanics

1. The game generates a random number within a specified range
2. Players try to guess the number by entering their guess
3. The game provides feedback if the guess is too high or too low
4. Score is calculated based on the number of attempts and difficulty level
5. Top scores are saved to the leaderboard

## Difficulty Levels

- **Easy (1-50)**: 50% score bonus
- **Medium (1-100)**: Standard scoring
- **Hard (1-200)**: 25% score bonus

## Scoring System

- Base score: 1000 points
- Penalty: -10 points per attempt
- Minimum score: 100 points
- Difficulty bonuses applied based on selected level

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd codef_ruined_gtng
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Project Structure

```
codef_ruined_gtng/
├── src/
│   ├── app/
│   │   ├── about/          # About page
│   │   ├── game/           # Game page
│   │   ├── game-over/      # Game over page
│   │   ├── leaderboard/    # Leaderboard page
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   ├── components/         # Reusable components
│   └── lib/
│       └── gameUtils.ts    # Game utilities and functions
├── public/                 # Static assets
├── package.json            # Project dependencies
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## Technologies Used

- **Next.js**: React framework for server-side rendering
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React**: JavaScript library for building user interfaces

## Game Data Storage

Player scores and game statistics are stored in the browser's localStorage. The leaderboard displays the top 50 scores from recent games.

## Customization

You can easily customize:
- Game difficulty ranges
- Scoring system
- Visual styling through Tailwind CSS classes
- Game messages and feedback

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).