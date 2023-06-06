interface Institution {
  id: number
  name: string
  shortName: string
  adminDomain: string
  studentDomain: string
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
