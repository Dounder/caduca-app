import type { User } from '../../user/interfaces/user.interface'

export interface AuthResponse {
  user: User
  token: string
}
