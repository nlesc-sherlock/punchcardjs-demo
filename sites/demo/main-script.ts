
function doit(data: IDataRow[]) {

    let dateCircle   : punchcards.DateCircle;
    let dateRect     : punchcards.DateRect;
    let weekdayCircle: punchcards.WeekdayCircle;
    let weekdayRect  : punchcards.WeekdayRect;

    let cf:CrossFilter.CrossFilter<IDataRow> = crossfilter(data);

    // draw the punchcard-weekday with svg circles using the crossfilter object and D3
    weekdayCircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
    weekdayCircle.defineDimensions();
    weekdayCircle.draw();

    // draw the punchcard-weekday with svg rects using the crossfilter object and D3
    weekdayRect = new punchcards.WeekdayRect(cf, 'punchcard-weekday-rect');
    weekdayRect.defineDimensions();
    weekdayRect.draw();

    // draw the punchcard-date with svg circles using the crossfilter object and D3
    dateCircle = new punchcards.DateCircle(cf, 'punchcard-date-circle');
    dateCircle.defineDimensions();
    dateCircle.draw();

    // draw the punchcard-date with svg rects using the crossfilter object and D3
    dateRect = new punchcards.DateRect(cf, 'punchcard-date-rect');
    dateRect.defineDimensions();
    dateRect.draw();

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



