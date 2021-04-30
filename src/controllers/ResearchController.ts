import { Request, Response } from 'express'
import { ResearchesService } from '../services/ResearchesService'
import * as yup from 'yup'
import { AppError } from '../errors/AppError'

class ResearchController {
  async create (req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body

    const schema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required()
    })

    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (err) {
      throw new AppError(err.errors)
    }

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
