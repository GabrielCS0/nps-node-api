import { getCustomRepository } from 'typeorm'
import request from 'supertest'
import { app } from '../../app'
import { ResearchesUsersRepository } from '../../repositories/ResearchesUsersRepository'

export const answerTest = () => describe('Research Answers', () => {
  it('Should be able to return researchUser with value property', async () => {
    const researchUserRepository = getCustomRepository(ResearchesUsersRepository)
    const researchUser = await researchUserRepository.findOne()

    const response = await request(app).get(`/answers/10?id=${researchUser.id}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('value')
    expect(response.body.value).toEqual(10)
  })

  it('Should not be able to return answer with a non-existent researchUser', async () => {
    const response = await request(app).get('/answers/10?id=645271938')
    expect(response.status).toBe(400)
  })
})
