import { NextRequest, NextResponse } from "next/server";
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

    const whereClause1 = "p1.id = $1";
    const whereClause2 = "g1.pairing_id = $1";

    const queryText = `
		SELECT
		    g1.id as goal_id
		    , COALESCE(c1.name, 
		        (SELECT c2.name
		         FROM pairings p1
		         INNER JOIN countries c2 ON p1.my_country_id = c2.id
		         WHERE ${whereClause1})
		    ) as country
		    , COALESCE(pl1.name, 'オウンゴール') as player
		    , g1.goal_time
		    , CASE 
		        WHEN g1.goal_time LIKE '前半%' THEN 1 
		        WHEN g1.goal_time LIKE '後半%' THEN 2 
		        WHEN g1.goal_time LIKE '延前%' THEN 3 
		        WHEN g1.goal_time LIKE '延後%' THEN 4 
		      END AS half_type   
		    , regexp_replace(regexp_replace(g1.goal_time, '^(前半|後半|延前|延後)', ''), '分$', '')::INTEGER AS goal_minute 
		FROM
		    goals g1 
		    LEFT OUTER JOIN players pl1 ON pl1.id = g1.player_id 
		    LEFT OUTER JOIN countries c1 ON pl1.country_id = c1.id 
		WHERE
		    ${whereClause2}
		ORDER BY
		    half_type
		    , goal_minute
    `;

    const queryParams = [id];
    const result = await client.query(queryText, queryParams);
    // console.log(result.rows);

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
