import createConnection from '../database'
import { getConnection } from 'typeorm'
import request from 'supertest'
import { app } from '../app'

describe('Researches', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.close()
  })

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
})
