import createConnection from '../../database'
import request from 'supertest'
import { app } from '../../app'

export const usersTest = () => describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      email: 'user@gmail.com',
      name: 'User'
    })

    expect(response.status).toBe(201)
  })

  it('Should not be able to create a new user with exists email', async () => {
    const response = await request(app).post('/users').send({
      email: 'user@gmail.com',
      name: 'User 2'
    })

    expect(response.status).toBe(400)
  })

  it('Should not be able to create a new user with invalid variables', async () => {
    const response = await request(app).post('/users')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
  })
})
