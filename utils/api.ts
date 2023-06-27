interface Institution {
  id: number
  name: string
  shortName: string
  description: string
}

interface User {
  firstName: string
  lastName: string
  email: string
  points?: number
  pointsAwardedCount?: number
  pointsAwardedResetTime?: string
  godMode?: boolean
}
