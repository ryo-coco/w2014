import { NextResponse } from "next/server";
import { Pool } from "pg";

export async function GET() {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
  });

  try {
    const client = await pool.connect();
    const result = await client.query(
      `
      SELECT
        c1.id as country_id
        , p1.id as player_id
        , c1.name as country
        , p1.name as player_name
        , count(player_id) AS player_goals 
      FROM
        goals g1 
      INNER JOIN players p1 
          ON g1.player_id = p1.id 
      INNER JOIN countries c1 
          ON p1.country_id = c1.id 
      GROUP BY
        c1.id
        , p1.id 
        , c1.name 
        , p1.name 
      HAVING
        count(player_id) >= 3 
      ORDER BY
        player_goals DESC
      `
    );
    client.release();
    return NextResponse.json({
      status: "success",
      data: result.rows,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "不明なエラー",
      },
      { status: 500 }
    );
  }
}
