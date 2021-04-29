import { ResearchUser } from '@models/ResearchUser'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(ResearchUser)
class ResearchesUsersRepository extends Repository<ResearchUser> {}

export { ResearchesUsersRepository }
