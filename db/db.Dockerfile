
FROM postgis/postgis:14-3.1-alpine

COPY init.sql /docker-entrypoint-initdb.d/
