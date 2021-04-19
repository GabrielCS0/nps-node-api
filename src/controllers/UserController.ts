import { Request, Response } from 'express'
import { UsersService } from '../services/UsersService'

class UserController {
  async create (req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body

    const usersService = new UsersService()

    try {
      const user = await usersService.create({ name, email })
      return res.status(201).json(user)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

export default new UserController()
