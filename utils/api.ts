interface Institution {
  id: number
  name: string
  shortName: string
  description: string
}

interface User {
  institution: Institution | null | undefined
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
  description: string
}

interface GroupInviteLink {
  id: string
  code: string
  role: GroupRoles
  group: Group
}

type GroupRoles = 'owner' | 'educator' | 'member'
