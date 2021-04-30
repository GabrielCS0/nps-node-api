import { Request, Response } from 'express'
import { NpsService } from '../services/NpsService'
import { AppError } from '../errors/AppError'

class NpsController {
  async execute (req: Request, res: Response): Promise<Response> {
    const { researchId } = req.params

    const npsService = new NpsService()

    try {
      const result = await npsService.execute(researchId)
      return res.json(result)
    } catch (err) {
      throw new AppError(err.message)
    }
  }
}

export default new NpsController()
