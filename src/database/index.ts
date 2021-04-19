import { Connection, getConnectionOptions, createConnection } from 'typeorm'

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()
  const database = process.env.NODE_ENV === 'test'
    ? 'db_test-nps-node-api'
    : defaultOptions.database

  return createConnection(
    Object.assign(defaultOptions, { database })
  )
}
