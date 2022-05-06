# GTFS Timetables

View GTFS data as conventional timetables such as those formerly published by
Amtrak.

Initially this was designed for Amtrak's GTFS feed, but I hope to add support
for other providers in the future.

## Installation and operation

1. Clone the repository
    ```bash
    $ git clone git@github.com:brianlove/gtfs-timetables.git
    $ cd gtfs-timetables
    ```

2. Download a GTFS dataset, such as Amtrak's feed from 6 October 2021: https://transitfeeds.com/p/amtrak/1136/20211006.  Unzip the data into the `data/` directory
    ```bash
    $ mkdir data
    $ unzip gtfs.zip -d data/
    ```

3. Create `database.env` file in the root directory to configure the database username and password:
    ```
    POSTGRES_PASSWORD=password
    POSTGRES_USER=timetable
    ```

4. Start the containers via Docker Compose:
    ```bash
    $ docker-compose up --build
    ```

5. Build and run the ingest container to populate the database with the provided data:
    ```bash
    $ cd ingest/

    $ docker build -t import-gtfs -f ingest.Dockerfile .

    $ cd ..

    ## Note that the format of the `$(pwd)` may vary depending on your platform
    $ docker run -d --name timetable-ingest --volume "$(pwd)/data:/gtfs" -e PGHOST=timetable-db --network gtfs-timetables_default import-gtfs -- agency.txt feed_info.txt routes.txt stop_times.txt stops.txt transfers.txt trips.txt
    ```

6. Check that the ingest worked properly
    ```bash
    ## View the logs for the ingest container.  Output should include a bunch of
    ## SQL commands, such as "CREATE INDEX" and "CREATE VIEW", ending with "COMMIT"
    $ docker container logs timetable-ingest

    ## View the Postgres database to ensure that the data were imported
    $ docker container exec -it timetable-db psql -U timetable
    timetable> \d                       # view list of tables and relations
    timetable> SELECT * FROM routes;    # View the routes table
    timetable> exit                     # exit
    ```

7. Access GTFS Timetables via http://localhost:8080


## General layout

The _GTFS Timetable_ app consists of ___ Docker containers, three of which are
used during operation and one for the initial ingest of data.

The [**`timetable-db`**](db/) container is a PostgreSQL database that stores
our application data.  It has a named volume (`timetable-data`) to persist the
data across sessions.

The [**`timetable-api`**](api/) container is a Node.js/Typescript application
providing the API to interact with the database.  Database queries are handled
via Sequelize and the API routing uses Express.

The [**`timetable-gui-vue3`**](gui-vue3/) container is a Vue 3 frontend to
display the GTFS data as timetables.

The [**`timetable-ingest`**](ingest/) container uses the
[`gtfs-via-postgres`](https://github.com/derhuerst/gtfs-via-postgres) library
to ingest the raw GTFS data into the Postgres database.


## Notes and warnings

Note: right now there are hardcoded passwords (albeit `password`) in the
[ingest Dockerfile](ingest/ingest.Dockerfile).  **_Do not_** deploy this app in
a public environment.  This situation is terrible, but I was having difficulty
getting the Dockerfile to pull from `database.env` correctly.  Hopefully the
issues can be worked out in the near future and everything can pull from a
single config file.
