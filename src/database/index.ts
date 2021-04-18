import { Connection, getConnectionOptions, createConnection } from 'typeorm'

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()

  return createConnection(
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === 'test'
        ? 'db_test-nps-node-api'
        : defaultOptions.database
    })
  )
}
