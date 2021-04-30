import { getConnection, getCustomRepository } from 'typeorm'
import request from 'supertest'
import { app } from '../../app'
import { ResearchesRepository } from '../../repositories/ResearchesRepository'

export const npsTest = () => describe('NPS', () => {
  afterAll(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to return NPS informations', async () => {
    const researchRepository = getCustomRepository(ResearchesRepository)
    const research = await researchRepository.findOne()

    const response = await request(app).get(`/nps/${research.id}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('nps')
  })
})
