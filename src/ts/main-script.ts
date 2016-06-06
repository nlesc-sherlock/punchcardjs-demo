/// <reference path="../../typings/globals/moment/index.d.ts" />
/// <reference path="../../typings/globals/moment-node/index.d.ts" />
/// <reference path="idatarow.ts" />

var start:moment.Moment;


// record the start of the visualization for performance analysis
start = moment();
console.log('+' + moment().diff(start, 'second', true).toFixed(3) + ' s: script starts');

import * as punchcards from './punchcards';


function doit(data: IDataRow[]) {

    let dateCircle   : punchcards.DateCircle;
    let dateRect     : punchcards.DateRect;
    let weekdayCircle: punchcards.WeekdayCircle;
    let weekdayRect  : punchcards.WeekdayRect;

    console.log('+' + moment().diff(start, 'second', true).toFixed(3) + ' s: doit() starts');

    let cf:CrossFilter.CrossFilter<IDataRow> = crossfilter(data);
    console.log('+' + moment().diff(start, 'second', true).toFixed(3) + ' s: crossfilter object done');

    // draw the punchcard-weekday with svg circles using the crossfilter object and D3
    weekdayCircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
    weekdayCircle.defineDimensions();
    weekdayCircle.draw();
    console.log('+' + moment().diff(start, 'second', true).toFixed(3) + ' s: WeekdayCircle done');

    // draw the punchcard-weekday with svg rects using the crossfilter object and D3
    weekdayRect = new punchcards.WeekdayRect(cf, 'punchcard-weekday-rect');
    weekdayRect.defineDimensions();
    weekdayRect.draw();
    console.log('+' + moment().diff(start, 'second', true).toFixed(3) + ' s: WeekdayRect done');

    // draw the punchcard-date with svg circles using the crossfilter object and D3
    dateCircle = new punchcards.DateCircle(cf, 'punchcard-date-circle');
    dateCircle.defineDimensions();
    dateCircle.draw();
    console.log('+' + moment().diff(start, 'second', true).toFixed(3) + ' s: DateCircle done');

    // draw the punchcard-date with svg rects using the crossfilter object and D3
    dateRect = new punchcards.DateRect(cf, 'punchcard-date-rect');
    dateRect.defineDimensions();
    dateRect.draw();
    console.log('+' + moment().diff(start, 'second', true).toFixed(3) + ' s: DateRect done');

    console.log('+' + moment().diff(start, 'second', true).toFixed(3) + ' s: doit() done');

};


// make a new dataloader
let dataloader: DataLoader = new DataLoader();

// configure the dataloader
dataloader.limit = 5000;

// set the offset to a large value to get to the more recent records (the
// results are sorted by increasing date); the more recent records are more
// likely to have valid coordinates.
dataloader.offset = 5559000;

// load the data
dataloader.loadData(doit);



