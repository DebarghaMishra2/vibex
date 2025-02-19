"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-purple-900/50 backdrop-blur-md text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-300">
          VibeX.com
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/dashboard" className="hover:text-purple-300">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-purple-300">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-purple-300">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

