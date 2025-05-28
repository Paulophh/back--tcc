import { FastifyRequest, FastifyReply } from 'fastify'
import { BaseController } from './base.controller'
import { AuthService } from '../services/auth.service'
import { z } from 'zod'

const authService = new AuthService()

const registerSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['ADMIN', 'MECHANIC', 'RECEPTIONIST'])
})

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string()
})

export class AuthController extends BaseController {
  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = registerSchema.parse(request.body)
      const result = await authService.register(
        data.name,
        data.email,
        data.password,
        data.role
      )
      return this.sendResponse(reply, result, 201)
    } catch (error) {
      return this.sendError(reply, error as Error)
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = loginSchema.parse(request.body)
      const result = await authService.login(data.email, data.password)
      return this.sendResponse(reply, result)
    } catch (error) {
      return this.sendError(reply, error as Error)
    }
  }
} 