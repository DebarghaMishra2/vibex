"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getMatches, getNews } from "@/lib/api"

export default function Dashboard() {
  const [matches, setMatches] = useState<string[]>([])
  const [news, setNews] = useState<any[]>([])
  const [selectedMatch, setSelectedMatch] = useState<string|null>(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    getMatches().then(setMatches)
    getNews().then(setNews)
  }, [])

  const sendMessage = () => {
    // Here you would typically send the message to your backend
    // and handle the real-time chat functionality
    console.log(`Sending message to ${selectedMatch}: ${message}`)
    setMessage("")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-white/10 backdrop-blur-md text-white">
        <CardHeader>
          <CardTitle>Your Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {matches.map((match, index) => (
              <li key={index}>
                <Button
                  variant="outline"
                  onClick={() => setSelectedMatch(match)}
                  className="text-purple-300 border-purple-300 hover:bg-purple-300 hover:text-purple-900"
                >
                  {match}
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="bg-white/10 backdrop-blur-md text-white">
        <CardHeader>
          <CardTitle>Chat</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedMatch ? (
            <div className="space-y-4">
              <p>Chatting with {selectedMatch}</p>
              <div className="flex space-x-2">
                <Input
                  className="text-neutral-700"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <Button onClick={sendMessage} className="bg-purple-600 hover:bg-purple-700">
                  Send
                </Button>
              </div>
            </div>
          ) : (
            <p>Select a match to start chatting</p>
          )}
        </CardContent>
      </Card>
      <Card className="md:col-span-2 bg-white/10 backdrop-blur-md text-white">
        <CardHeader>
          <CardTitle>Curated News</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {news.map((item, index) => (
              <li key={index}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:underline"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

