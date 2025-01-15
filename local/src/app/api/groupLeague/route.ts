import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const group = searchParams.get("group");

  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
  });

  try {
    const client = await pool.connect();
    // WHERE句を別々に構築
    const whereClause = `pg2.match_type_id = 1
 		 ${group ? `AND c1.group_name = $1` : ""}`;

    const queryText = `
	WITH PAIRINGS_AND_GOALS AS (
	  select
		p1.*,
		count(g1.pairing_id) as goals
	  from
		pairings p1
		Left outer join goals g1 on p1.id = g1.pairing_id
	  group by
		p1.id,
		p1.kickoff,
		p1.my_country_id,
		p1.enemy_country_id,
		p1.match_type_id
	  order by p1.id
	)
	SELECT
	  c1.id,
	  c1.name as countryname,
	  c1.group_name as groupname,
	  sum(case when (pg1.goals - pg2.goals) > 0 then 1 else 0 end) * 3 + sum(case when (pg1.goals - pg2.goals) = 0 then 1 else 0 end) as winpoints,
	  count(c1.name) as games,
	  sum(case when (pg1.goals - pg2.goals) > 0 then 1 else 0 end) as wins,
	  sum(case when (pg1.goals - pg2.goals) = 0 then 1 else 0 end) as draws,
	  sum(case when (pg1.goals - pg2.goals) < 0 then 1 else 0 end) as losses,
	  sum(pg1.goals) as goals,
	  sum(pg2.goals) as goalsagainst,
	  sum(pg1.goals - pg2.goals)::smallint as goalsdiff
	FROM
	  PAIRINGS_AND_GOALS as pg1
	  inner join PAIRINGS_AND_GOALS pg2 on pg1.kickoff = pg2.kickoff and pg1.my_country_id = pg2.enemy_country_id and pg1.enemy_country_id = pg2.my_country_id
	  inner join countries c1 on pg1.my_country_id = c1.id
	  inner join countries c2 on pg2.my_country_id = c2.id
	  inner join match_type m1 on pg2.match_type_id = m1.id
	WHERE ${whereClause}
	GROUP BY c1.id, c1.name, c1.group_name
	ORDER BY c1.group_name, winPoints DESC, goalsDiff DESC
  `;

    const queryParams = group ? [group] : [];
    const result = await client.query(queryText, queryParams);
    client.release();

    return NextResponse.json({
      status: "success",
      data: result.rows,
    });
  } catch (error) {
    console.error("SQL Error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "不明なエラー",
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
