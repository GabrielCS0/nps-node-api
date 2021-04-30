import { Request, Response } from 'express'
import { ResearchesUsersService } from '../services/ResearchesUsersService'
import * as yup from 'yup'
import { AppError } from '../errors/AppError'

class SendMailController {
  async execute (req: Request, res: Response): Promise<Response> {
    const { email, researchId } = req.body

    const schema = yup.object().shape({
      email: yup.string().email().required(),
      researchId: yup.string().required()
    })

    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (err) {
      throw new AppError(err.errors)
    }

    const researchesUsersService = new ResearchesUsersService()

    try {
      const researchUser = await researchesUsersService.create({ email, researchId })
      return res.status(201).json(researchUser)
    } catch (err) {
      throw new AppError(err.message)
    }
  }
}

export default new SendMailController()
