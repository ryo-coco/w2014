create table countries (
  id integer not null
  , name character varying(50) default NULL
  , ranking integer
  , group_name character varying(1) default NULL
  , constraint countries_PKC primary key (id)
) ;

create table goals (
  id integer not null
  , pairing_id integer
  , player_id integer
  , goal_time character varying(10) default NULL
) ;

create table match_type (
  id integer not null
  , name character varying(10)
) ;

create table pairings (
  id integer not null
  , kickoff timestamp(6) with time zone
  , my_country_id integer
  , enemy_country_id integer
  , match_type_id integer
) ;

create table players (
  id integer not null
  , country_id integer
  , uniform_num integer
  , position character varying(2) default NULL
  , name character varying(50) default NULL
  , club character varying(50) default NULL
  , birth date
  , height integer
  , weight integer
) ;

comment on table countries is 'countries';
comment on column countries.id is 'ID';
comment on column countries.name is '国名';
comment on column countries.ranking is 'ランキング';
comment on column countries.group_name is 'グループ名';

comment on table goals is 'goals';
comment on column goals.id is 'id';
comment on column goals.pairing_id is 'pairing_id';
comment on column goals.player_id is 'player_id';
comment on column goals.goal_time is 'goal_time';

comment on table match_type is 'match_type';
comment on column match_type.id is 'id';
comment on column match_type.name is 'name';

comment on table pairings is 'pairings';
comment on column pairings.id is 'id';
comment on column pairings.kickoff is 'kickoff';
comment on column pairings.my_country_id is 'my_country_id';
comment on column pairings.enemy_country_id is 'enemy_country_id';
comment on column pairings.match_type_id is 'match_type_id';

comment on table players is 'players';
comment on column players.id is 'id';
comment on column players.country_id is 'country_id';
comment on column players.uniform_num is 'uniform_num';
comment on column players.position is 'position';
comment on column players.name is 'name';
comment on column players.club is 'club';
comment on column players.birth is 'birth';
comment on column players.height is 'height';
comment on column players.weight is 'weight';

