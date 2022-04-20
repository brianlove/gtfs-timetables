
import Agency from './agency.model';
import Calendar from './calendar.model';
import CalendarDate from './calendar_date.model';
import FareAttribute from './fare_attribute.model';
import FareRule from './fare_rule.model';
import FeedInfo from './feed_info.model';
import Frequency from './frequency.model';
import Route from './route.model';
import Shape from './shape.model';
import Stop from './stop.model';
import StopTime from './stop_time.model';
import Transfer from './transfer.model';
import Trip from './trip.model';

// Establish the relationships between the models.
// These might be better located elsewhere (allegedly there's a Model.associate function?)

Agency.hasMany(Route, { foreignKey: 'agency_id' });
Route.belongsTo(Agency, { foreignKey: 'agency_id' });

Calendar.hasMany(CalendarDate, { foreignKey: 'service_id' });
CalendarDate.belongsTo(Calendar, { foreignKey: 'service_id' });

Calendar.hasMany(Trip, { foreignKey: 'service_id' });
Trip.belongsTo(Calendar, { foreignKey: 'service_id' });

FareAttribute.hasMany(FareRule, { foreignKey: 'fare_id' });
FareRule.belongsTo(FareAttribute, { foreignKey: 'fare_id' });

// TODO: FareRule's relationships with Route and Stop

Route.hasMany(Trip, { foreignKey: 'route_id' });
Trip.belongsTo(Route, { foreignKey: 'route_id' });

Stop.hasMany(StopTime, { foreignKey: 'stop_id' });
StopTime.belongsTo(Stop, { foreignKey: 'stop_id' });

// TODO: Stop's relationships with FareRule and Transfer

Trip.hasMany(Frequency, { foreignKey: 'trip_id' });
Frequency.belongsTo(Trip, { foreignKey: 'trip_id' });

Trip.hasMany(StopTime, { foreignKey: 'trip_id' });
StopTime.belongsTo(Trip, { foreignKey: 'trip_id' });


export {
    Agency,
    Calendar,
    CalendarDate,
    FareAttribute,
    FareRule,
    FeedInfo,
    Frequency,
    Route,
    Shape,
    Stop,
    StopTime,
    Transfer,
    Trip,
};
