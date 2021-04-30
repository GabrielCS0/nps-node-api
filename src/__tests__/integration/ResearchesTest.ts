import request from 'supertest'
import { app } from '../../app'

export const researchesTest = () => describe('Researches', () => {
  it('Should be able to create a new research', async () => {
    const response = await request(app).post('/researches').send({
      title: 'New Research',
      description: 'Research Description'
    })

    expect(response.status).toBe(201)
  })

  it('Should be able to get all researches', async () => {
    const response = await request(app).get('/researches')
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
  })

  it('Should not be able to create a Research with invalid variables', async () => {
    const response = await request(app).post('/researches')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
  })
})
