import { Research } from '@models/Research'
import { ResearchesRepository } from '../repositories/ResearchesRepository'
import { getCustomRepository, Repository } from 'typeorm'

interface ICreateResearch {
  title: string;
  description: string;
}

class ResearchesService {
  private researchesRepository: Repository<Research>

  constructor () {
    this.researchesRepository = getCustomRepository(ResearchesRepository)
  }

  async create ({ title, description }: ICreateResearch) {
    const research = this.researchesRepository.create({
      title,
      description
    })

    await this.researchesRepository.save(research)

    return research
  }

  async showAll () {
    const all = await this.researchesRepository.find()
    return all
  }
}

export { ResearchesService }
