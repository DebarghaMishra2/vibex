"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { getInterestingFact, getTotalUsers } from "@/lib/api"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const interests = ["Entertainment", "Science and Tech", "Spirituality", "Sports"]

export default function LoginForm() {
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [interest, setInterest] = useState("")
  const [fact, setFact] = useState("")
  const [totalUsers, setTotalUsers] = useState(0)
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    getTotalUsers().then(setTotalUsers)
  }, [])

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state !== "denied") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation(position.coords)
              setLocationError(null)
            },
            (error) => {
              setLocationError("Unable to retrieve your location. Please enable location services and try again.")
            },
          )
        } else {
          setLocationError("You have denied location access. Please enable location services and try again.")
        }
      })
    } else {
      setLocationError("Geolocation is not supported by your browser.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!location) {
      setLocationError("Please provide your location before submitting.")
      return
    }
    // Here you would typically send the data to your backend
    // including the location data
    const newFact = await getInterestingFact(interest)
    setFact(newFact)
    router.push("/dashboard")
  }

  return (
    <Card className="w-full max-w-md bg-white/10 backdrop-blur-md text-white">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-purple-300">VibeX.com</CardTitle>
        <CardDescription className="text-center text-purple-200">Connect with like-minded people</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" required value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup value={gender} onValueChange={setGender}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Interest</Label>
            <RadioGroup value={interest} onValueChange={setInterest}>
              {interests.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <RadioGroupItem value={item.toLowerCase()} id={item.toLowerCase()} />
                  <Label htmlFor={item.toLowerCase()}>{item}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Button type="button" onClick={requestLocation} className="w-full bg-purple-600 hover:bg-purple-700">
              {location ? "Location Provided" : "Provide Location"}
            </Button>
            {locationError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{locationError}</AlertDescription>
              </Alert>
            )}
            {location && (
              <p className="text-sm text-purple-200">
                Location provided: {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Login / Register
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <p className="text-sm text-purple-200">Total registered users: {totalUsers}</p>
        {fact && <p className="mt-2 text-sm italic text-purple-100">{fact}</p>}
      </CardFooter>
    </Card>
  )
}

