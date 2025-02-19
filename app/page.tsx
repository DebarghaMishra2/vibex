import type { Metadata } from "next"
import Header from "@/components/header"
import Dashboard from "@/components/dashboard"
import Background from "@/components/background"

export const metadata: Metadata = {
  title: "VibeX Dashboard",
  description: "Your personalized VibeX dashboard",
}

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Background />
      <Header />
      <main className="flex-grow p-4">
        <Dashboard />
      </main>
    </div>
  )
}

