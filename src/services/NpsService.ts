import { ResearchUser } from '@models/ResearchUser'
import { ResearchesUsersRepository } from '../repositories/ResearchesUsersRepository'
import { getCustomRepository, IsNull, Not, Repository } from 'typeorm'

class NpsService {
  private researchesUsersRepository: Repository<ResearchUser>

  constructor () {
    this.researchesUsersRepository = getCustomRepository(ResearchesUsersRepository)
  }

  async execute (researchId: string) {
    const researchesUsers = await this.researchesUsersRepository.find({
      researchId,
      value: Not(IsNull())
    })

    const detractors = researchesUsers.filter(
      research => research.value >= 0 && research.value <= 6
    ).length

    const passives = researchesUsers.filter(
      research => research.value >= 7 && research.value <= 8
    ).length

    const promoters = researchesUsers.filter(
      research => research.value >= 9 && research.value <= 10
    ).length

    const totalAnswers = researchesUsers.length

    const calculate = Number(
      (((promoters - detractors) / totalAnswers) * 100).toFixed(2)
    )

    return {
      detractors,
      promoters,
      passives,
      totalAnswers,
      nps: calculate + '%'
    }
  }
}

export { NpsService }
