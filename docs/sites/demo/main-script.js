
function doit(data) {

    var dateCircle,
        dateCircleControls,
        dateRect,
        dateRectControls,
        weekdayCircle,
        weekdayCircleControls,
        weekdayRect,
        weekdayRectControls;

    var cf = crossfilter(data);

    // draw the punchcard-weekday with svg circles using the crossfilter object and D3
    weekdayCircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
    weekdayCircle.draw();
    weekdayCircleControls = new Controls('punchcard-weekday-circle');
    weekdayCircleControls.drawControls();

    // draw the punchcard-weekday with svg rects using the crossfilter object and D3
    weekdayRect = new punchcards.WeekdayRect(cf, 'punchcard-weekday-rect');
    weekdayRect.draw();
    weekdayRectControls = new Controls('punchcard-weekday-rect');
    weekdayRectControls.drawControls();

    // draw the punchcard-date with svg circles using the crossfilter object and D3
    dateCircle = new punchcards.DateCircle(cf, 'punchcard-date-circle');
    dateCircle.draw();
    dateCircleControls = new Controls('punchcard-date-circle');
    dateCircleControls.drawControls();

    // draw the punchcard-date with svg rects using the crossfilter object and D3
    dateRect = new punchcards.DateRect(cf, 'punchcard-date-rect');
    dateRect.draw();
    dateRectControls = new Controls('punchcard-date-rect');
    dateRectControls.drawControls();

};


// make a new dataloader
var dataloader = new DataLoader();

// configure the dataloader
dataloader.limit = 5000;

// set the offset to a large value to get to the more recent records (the
// results are sorted by increasing date); the more recent records are more
// likely to have valid coordinates.
dataloader.offset = 5559000;

// load the data
dataloader.loadData(doit);



