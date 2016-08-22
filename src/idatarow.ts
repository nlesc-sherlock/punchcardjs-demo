/// <reference path="../typings/globals/moment/index.d.ts" />
/// <reference path="../typings/globals/moment-node/index.d.ts" />


export interface IDataRow {
    datestr          : string;
    moment           : moment.Moment;
    momentStartOfDay : moment.Moment;
    casenumber       : string;
    dayOfWeek        : number;
    description      : string;
    primary          : string;
    latitude         : number;
    longitude        : number;
    timeOfDay        : number;
}
