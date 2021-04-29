import { Request, Response } from 'express'
import { ResearchesUsersService } from '../services/ResearchesUsersService'

class SendMailController {
  async execute (req: Request, res: Response): Promise<Response> {
    const { email, researchId } = req.body

    const researchesUsersService = new ResearchesUsersService()

    try {
      const researchUser = await researchesUsersService.create({ email, researchId })
      return res.status(201).json(researchUser)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

export default new SendMailController()
