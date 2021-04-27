import { Research } from '@models/Research'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Research)
class ResearchesRepository extends Repository<Research> {}

export { ResearchesRepository }
