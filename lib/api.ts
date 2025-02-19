// This file would contain actual API calls in a real application
// For now, we'll use placeholder data

export async function getTotalUsers() {
  // Simulating an API call
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(Math.floor(Math.random() * 10000)), 500)
  })
}

export async function getInterestingFact(interest: string) {
  // Simulating an API call
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      const facts = {
        entertainment: "The first feature-length film was made in Australia in 1906.",
        "science and tech": "The first computer programmer was a woman named Ada Lovelace.",
        spirituality: "The word 'yoga' comes from the Sanskrit word 'yuj', meaning to yoke or bind.",
        sports: "The modern Olympic Games were first held in Athens, Greece, in 1896.",
      }
      //@ts-ignore
      resolve(facts[interest] || "Did you know? Learning new things is good for your brain!")
    }, 500)
  })
}

export async function getMatches() {
  // Simulating an API call
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(["Alice", "Bob", "Charlie", "Diana"])
    }, 500)
  })
}

export async function getNews() {
  // Simulating an API call
  return new Promise<{ title: string; url: string }[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { title: "New breakthrough in quantum computing", url: "#" },
        { title: "Scientists discover new species in the Amazon", url: "#" },
        { title: "SpaceX launches another batch of Starlink satellites", url: "#" },
      ])
    }, 500)
  })
}

