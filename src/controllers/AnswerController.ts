import { Request, Response } from 'express'
import { AnswersService } from '../services/AnswersService'
import { AppError } from '../errors/AppError'

class AnswerController {
  async execute (req: Request, res: Response): Promise<Response> {
    const { value } = req.params
    const { id } = req.query

    const answersService = new AnswersService()

    try {
      const researchUser = await answersService.execute({ value: Number(value), id: String(id) })
      return res.json(researchUser)
    } catch (err) {
      throw new AppError(err.message)
    }
  }
}

export default new AnswerController()
