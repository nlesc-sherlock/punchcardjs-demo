/*
 * tests requiring DOM manipulation for punchcards.WeekdayCircle from dist/punchcards.js
 */

describe('punchcards WeekdayCircle class...', function() {

    var fixtures, cf;

    beforeEach(function() {

        var data;

        // set the base directory for loading of fixtures
        fixture.setBase('test/fixtures');

        // load the html and json fixtures
        fixtures = fixture.load('weekday-circle.fixture.html',
            'cityofchicago-police-data.fixture.json');

        data = fixtures[1];
        cf = crossfilter(data);

    });



    afterEach(function(){
        // clean up the DOM
        fixture.cleanup();
        cf = undefined;
    });



    it('...html fixture should have loaded correctly', function() {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-weekday-circle"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly', function() {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["casenumber", "datestr", "description", "latitude", "longitude", "primary"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have 5000 records', function() {
        var actual, expected;
        actual = cf.size();
        expected = 5000;
        expect(actual).toEqual(expected);
    });



    it('...constructor should return an instance of punchcards.WeekdayCircle when called with valid arguments', function() {
        var actual, weekdaycircle;
        weekdaycircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
        actual = weekdaycircle instanceof punchcards.WeekdayCircle;
        expect(actual).toBe(true);
    });

    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" attached to it', function() {
        var actual, weekdaycircle;
        weekdaycircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
        weekdaycircle.defineDimensions();
        weekdaycircle.drawSvg();
        weekdaycircle.drawHorizontalAxis();
        weekdaycircle.drawVerticalAxis();
        weekdaycircle.drawSymbols();
        actual = weekdaycircle.svg.select('g.symbol')[0][0];
        expect(actual).not.toBe(null);
    });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 139 SVG circles of class ' +
        '"symbol" attached to it', function() {
        var actual, weekdaycircle, symbols;
        weekdaycircle = new punchcards.WeekdayCircle(cf, 'punchcard-weekday-circle');
        weekdaycircle.defineDimensions();
        weekdaycircle.drawSvg();
        weekdaycircle.drawHorizontalAxis();
        weekdaycircle.drawVerticalAxis();
        weekdaycircle.drawSymbols();
        symbols = weekdaycircle.svg.select('g.symbol').selectAll('circle.symbol')[0];
        actual = symbols.length;;
        expect(actual).toEqual(139);
    });



})


