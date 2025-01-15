import { Pool } from 'pg';

// データベース接続プールの作成
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

// データベース接続をテストする関数
export async function testDatabaseConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    return { 
      success: true, 
      time: result.rows[0].now 
    };
  } catch (error) {
    console.error('データベース接続エラー:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '不明なエラー' 
    };
  }
}