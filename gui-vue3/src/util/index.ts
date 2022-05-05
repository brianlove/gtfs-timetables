
interface TimeObject {
    hours: number,
    minutes?: number,
};


function timeObjectToString(time: TimeObject|NonBoundedTime) {
    const hourStr = (time.hours % 24).toString().padStart(2, "0");
    if ( time.minutes ) {
        const minStr = time.minutes.toString().padStart(2, "0");
        return `${hourStr}:${minStr}`;
    } else {
        return `${hourStr}:00`;
    }
}


/**
 * A class representing a time that is not bound by 24 hours, but rather can
 * represent any number of hours and minutes after the start of a given day.
 */
class NonBoundedTime {
    hours: number;
    minutes: number;

    /**
     * @param hoursOrObject Either the number of hours or a `TimeObject` containing hours and minutes
     * @param minutes The minutes, if `hoursOrObject` was a number
     */
    constructor(hoursOrObject : number|TimeObject, minutes?: number) {
        if ( typeof hoursOrObject == 'number' ) {
            this.hours = hoursOrObject;
            this.minutes = minutes || 0;
        } else if ( typeof hoursOrObject == 'object' && hoursOrObject.hasOwnProperty('hours') ) {
            this.hours = hoursOrObject.hours;
            this.minutes = hoursOrObject.minutes || 0;
        } else {
            this.hours = 0;
            this.minutes = 0;
            throw TypeError(`Invalid parameters ${hoursOrObject}, ${minutes}`);
        }
    }

    compare(other: NonBoundedTime) : number {
        const thisHours = this.hours % 24;
        const otherHours = other.hours % 24;

        if ( thisHours < otherHours ) {
            return -2;
        } else if ( thisHours == otherHours ) {
            if ( this.minutes < other.minutes ) {
                return -1;
            } else if ( this.minutes == other.minutes ) {
                return 0;
            } else {
                return 1;
            }
        } else {
            return 2;
        }
    }

    subtract(other: NonBoundedTime) : number {
        return (this.hours * 60 + this.minutes) - (other.hours * 60 + other.minutes);
    }

    toString() : string {
        return timeObjectToString(this);
    }
}


export type {
    TimeObject,
};

export {
    NonBoundedTime,
    timeObjectToString,
};
