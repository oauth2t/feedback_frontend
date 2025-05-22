import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Form Application',
  description: 'A simple form application with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="navbar">
          <div className="navbar-content">
            <span className="nav-link">Form App</span>
            <div className="nav-links">
              <Link href="/" className="nav-link">
                Form Page
              </Link>
              <Link href="/display" className="nav-link">
                Display Data
              </Link>
            </div>
          </div>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
} 