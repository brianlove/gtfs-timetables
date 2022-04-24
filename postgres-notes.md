# Postgres notes

## Connecting via Docker
```bash
$ docker container exec -it CONTAINER_NAME psql -U DATABASE_USER
```



## Describing a table
From https://www.postgresqltutorial.com/postgresql-describe-table/

```sql
```

Example:
```sql
SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_name='routes';
```


