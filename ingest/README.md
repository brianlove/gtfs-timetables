# timetable-ingest

The data ingest utility for _GTFS Timetable_.

## Installation and operation

Recommended installation and operation instructions are provided in the
[README file for the whole application](../README.md#installation-and-operation).

### Ingesting initial data

```bash
$ cd ingest/

$ docker build -t import-gtfs -f ingest.Dockerfile .

$ cd ..

## Note that the format of the `$(pwd)` may vary depending on your platform
$ docker run -d --volume "$(pwd)/data:/gtfs" -e PGHOST=timetable-db --network gtfs-timetables_default import-gtfs -- agency.txt feed_info.txt routes.txt stop_times.txt stops.txt transfers.txt trips.txt
```


