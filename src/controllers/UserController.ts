import { Request, Response } from 'express'
import { UsersService } from '../services/UsersService'
import * as yup from 'yup'
import { AppError } from '../errors/AppError'

class UserController {
  async create (req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required()
    })

    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (err) {
      throw new AppError(err.errors)
    }

    const usersService = new UsersService()

    try {
      const user = await usersService.create({ name, email })
      return res.status(201).json(user)
    } catch (err) {
      throw new AppError(err.message)
    }
  }
}

export default new UserController()
