import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
  try {
    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || '5432'),
    });

    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();

    return NextResponse.json({ 
      status: 'success', 
      time: result.rows[0].now 
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      message: error instanceof Error ? error.message : '不明なエラー' 
    }, { status: 500 });
  }
}