import type { User } from '@/modules/user'

export interface AuthResponse {
  user: User
  token: string
}
