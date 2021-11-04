import 'fastify'
import { AuthUserDto } from '../app/auth/dto/auth-user.dto'

declare module 'fastify' {
  interface FastifyRequest {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locals: Record<string, any>
    user: Partial<AuthUserDto>
  }
}
