import { Pool, PoolConfig, QueryConfig } from 'pg'

class PGPool {
  private pool: any

  connect(connectionOptions: PoolConfig) {
    this.pool = new Pool(connectionOptions)
  }

  async query(queryConfig: string, values?: any) {
    return await this.pool.query(queryConfig, values)
  }
}

export default new PGPool()
