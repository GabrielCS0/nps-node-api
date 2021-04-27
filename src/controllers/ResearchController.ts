import { Request, Response } from 'express'
import { ResearchesService } from '../services/ResearchesService'

class ResearchController {
  async create (req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body

    const researchesService = new ResearchesService()

    const research = await researchesService.create({ title, description })

    return res.status(201).json(research)
  }

  async showAll (req: Request, res: Response): Promise<Response> {
    const researchesService = new ResearchesService()
    const allResearches = await researchesService.showAll()
    return res.json(allResearches)
  }
}

export default new ResearchController()
