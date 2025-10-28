import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Guess the Number Game',
  description: 'A fun number guessing game built with Next.js and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}