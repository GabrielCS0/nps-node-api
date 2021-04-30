import { getCustomRepository } from 'typeorm'
import request from 'supertest'
import { app } from '../../app'
import { ResearchesRepository } from '../../repositories/ResearchesRepository'

const createUserResearch = async (email: string, researchId: string) => {
  return await request(app).post('/sendMail').send({
    email,
    researchId
  })
}

export const researchUserTest = () => describe('Create User Research', () => {
  it('Should be able to create a new User Research', async () => {
    const researchRepository = getCustomRepository(ResearchesRepository)
    const research = await researchRepository.findOne()

    const response = await createUserResearch('user@gmail.com', research.id)

    expect(response.status).toBe(201)
  })

  it('Should not be able to create a User Research with a non-existent user', async () => {
    const researchRepository = getCustomRepository(ResearchesRepository)
    const research = await researchRepository.findOne()

    const response = await createUserResearch('nonexistentemail@gmail.com', research.id)

    expect(response.status).toBe(400)
  })

  it('Should not be able to create a User Research with a non-existent research', async () => {
    const response = await createUserResearch('user@gmail.com', '00000000-0000-0000-0000-000000000000')
    expect(response.status).toBe(400)
  })

  it('Should not be able to create a User Research with invalid variables', async () => {
    const response = await createUserResearch('usergmail.com', '000000')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
  })
})
