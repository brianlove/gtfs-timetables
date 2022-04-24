# GTFS Timetable - GUI notes

## Definitions

* **Corridor** &ndash; A geographic area over which one or more _routes_ operate (for example, Northeast Corridor, or Keystone Corridor).
* **Route** &ndash; A group of trips that is presented as a single service to riders (for example, _Acela_, _California Zephyr_, etc).  Represented by the `routes` database table and `routes.txt` in GTFS.
* **Train** &ndash; A specific instance of a route, each numbered as presented to riders (for example, 2103, 67, etc).  Depending on specifics of the schedule, a train may be represented in the model as more than one _trip_.
* **Trip** &ndash; An instance of a _train_ that has a specific schedule.  Represented by the `trips` database table and `trips.txt` in GTFS.



## Routes list
List all named routes (Acela, Empire Builder, Wolverine, etc) and link to pages specific to the route.


### Route detail
Specific information about a route, including a list of individual trains serving the route, stations where the trains stop, and a timetable showing the times at which the individual trains (or trips) stop at those stations.




## Corridor list



## Station list
List all stations and link to pages specific to the station.







