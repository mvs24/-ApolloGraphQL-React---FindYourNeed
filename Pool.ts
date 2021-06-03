import { Pool, PoolConfig, QueryConfig } from 'pg'

class PGPool {
  private pool: Pool = null

  connect(connectionOptions: PoolConfig) {
    this.pool = new Pool(connectionOptions)
  }

  query(queryConfig: string, values?: any) {
    return this.pool.query(queryConfig, values)
  }
}

export default new PGPool()
