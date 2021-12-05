
# From https://github.com/derhuerst/gtfs-via-postgres/blob/master/readme.md#with-docker

FROM derhuerst/gtfs-via-postgres

RUN apk add --no-cache postgresql-client

ENV PGPORT=5432 PGUSER=postgres PGPASSWORD=password

WORKDIR /gtfs

# pass all arguments into gtfs-via-postgres, pipe output into psql:
ENTRYPOINT ["/bin/sh", "-c", "env | grep PG; gtfs-via-postgres --trips-without-shape-id $0 $@ | psql -b"]
# ENTRYPOINT ["ls", "-la"]
# ENTRYPOINT ["pwd"]
