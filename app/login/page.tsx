import type { Metadata } from "next"
import LoginForm from "@/components/login-form"
import Background from "@/components/background"

export const metadata: Metadata = {
  title: "VibeX - Connect with like-minded people",
  description: "Find and chat with people who share your interests",
}

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Background />
      <main className="flex-grow flex items-center justify-center p-4">
        <LoginForm />
      </main>
    </div>
  )
}

