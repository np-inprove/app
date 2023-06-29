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

interface InstitutionInviteLink {
  id: string
  code: string
  role: InstitutionRoles
  institution: Institution
}

type InstitutionRoles = 'admin' | 'educator' | 'member'

interface Group {
  id: number
  name: string
  shortName: string
  description: String
}
