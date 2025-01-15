# 起動

docker compose up
docker container ls

# DB へ接続し、データが登録されていることを確認する。

※ポート 5432 を使用していないことを確認する

docker exec -it webapi-db-1 bash
psql -U postgres
\l
\c w2014
\dt
select _ from countries limit 1;
select _ from goals limit 1;
select _ from match_type limit 1;
select _ from pairings limit 1;
select \* from players limit 1;
\q
exit

# web へ接続し、npm をインストールして実行

# 初回のみ

docker exec -it web bash
cd /workspace
npm install
npm install pg
npm run dev

# ２回目以降

docker exec -it web bash
cd /workspace
npm run dev

# ブラウザで確認

http://localhost:3000

# 停止方法

exit
docker container ls -a
docker container stop webapi-db-1
docker container stop web

# コンテナの削除

docker container ls
docker container rm webapi-db-1
docker container rm web

# イメージの削除

docker image ls
docker image rm postgres:15
docker image rm node:18
docker image ls

# ボリュームの削除

docker volume ls
docker volume rm webapi_db-storage
docker volume ls

# ネットワークの削除

docker network ls
docker network rm webapi_default
docker network ls
