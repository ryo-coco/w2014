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
      // 'select p.id, to_char(p.kickoff, \'YYYY/MM/DD HH24:MI\') as kick_off, c1.name as home_team, c2.name as away_team from pairings as p inner join countries as c1 on p.my_country_id = c1.id inner join countries as c2 on p.enemy_country_id = c2.id where p.id <= 64 order by p.id'
      "\
				WITH PAIRINGS_AND_GOALS AS ( \
				select \
				  p1.* \
				  , count(g1.pairing_id) as goals \
				from \
				    pairings p1  \
				  Left outer join goals g1  \
				        on p1.id = g1.pairing_id \
				group by \
				  p1.id \
				  , p1.kickoff \
				  , p1.my_country_id \
				  , p1.enemy_country_id \
				  , p1.match_type_id \
				order by p1.id \
				) SELECT \
				    pg1.id as pg1_id  \
				    , to_char(pg1.kickoff, 'YYYY/MM/DD HH24:MI') as kick_off \
				    , c1.name as home_team\
				    , pg1.goals as home_goals \
				    ,pg2.id  as pg2_id  \
				    , c2.name as away_team\
				    , pg2.goals as away_goals \
				    , pg2.match_type_id as match_type_id \
				 \
				FROM \
				    PAIRINGS_AND_GOALS as pg1 \
				        inner join PAIRINGS_AND_GOALS as pg2  \
				        on pg1.kickoff = pg2.kickoff  \
				        and pg1.my_country_id = pg2.enemy_country_id  \
				        and pg1.enemy_country_id = pg2.my_country_id  \
				        inner join countries as c1 \
				        on pg1.my_country_id = c1.id \
				        inner join countries as c2 \
				        on pg2.my_country_id = c2.id \
				where \
				    pg1.id <= 64  \
				order by \
				    pg1.id \
      "
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
