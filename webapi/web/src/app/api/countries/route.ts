import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
  });

  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT id, name, ranking, group_name FROM countries ORDER BY id'
    );
    client.release();

    return NextResponse.json({ 
      status: 'success', 
      data: result.rows 
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      message: error instanceof Error ? error.message : '不明なエラー' 
    }, { status: 500 });
  }
}