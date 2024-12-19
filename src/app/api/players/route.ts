import { NextRequest, NextResponse } from "next/server";
import { log } from "node:console";
import { Pool } from "pg";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

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
      `SELECT
		    id              
		    , country_id    
		    , uniform_num   as number
		    , position      
		    , name          
		    , club          
		    , to_char(birth, 'YYYY/MM/DD')         as birthDate
		    , height        
		    , weight        
		  FROM
		    players 
		  WHERE
		    country_id = ${id}
      ORDER BY 
        id
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
