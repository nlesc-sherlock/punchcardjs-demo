/*
 * tests requiring DOM manipulation for punchcards.DateRect from dist/punchcards.js
 */

describe('punchcards DateRect class...', function() {

    var fixtures, cf;

    beforeEach(function() {

        var data;

        // set the base directory for loading of fixtures
        fixture.setBase('test/fixtures');

        // load the html and json fixtures
        fixtures = fixture.load('date-rect.fixture.html',
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
        expected = '<div id="punchcard-date-rect"></div>';
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



    it('...constructor should return an instance of punchcards.DateRect when called with valid arguments', function() {
        var actual, daterect;
        daterect = new punchcards.DateRect(cf, 'punchcard-date-rect');
        actual = daterect instanceof punchcards.DateRect;
        expect(actual).toBe(true);
    });



    it('...after calling .drawHorizontalAxis(), the chart should have an ' +
        'SVG g element of class "horizontal-axis" attached to it', function() {
        var actual, daterect;
        daterect = new punchcards.DateRect(cf, 'punchcard-date-rect');
        daterect.defineDimensions();
        daterect.drawSvg();
        daterect.drawHorizontalAxis();
        actual = daterect.svg.select('g.horizontal-axis')[0][0];
        expect(actual).not.toBe(null);
    });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" attached to it', function() {
        var actual, daterect;
        daterect = new punchcards.DateRect(cf, 'punchcard-date-rect');
        daterect.defineDimensions();
        daterect.drawSvg();
        daterect.drawHorizontalAxis();
        daterect.drawVerticalAxis();
        daterect.drawSymbols();
        actual = daterect.svg.select('g.symbol')[0][0];
        expect(actual).not.toBe(null);
    });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 139 SVG rects of class ' +
        '"symbol" attached to it', function() {
        var actual, daterect, symbols;
        daterect = new punchcards.DateRect(cf, 'punchcard-date-rect');
        daterect.defineDimensions();
        daterect.drawSvg();
        daterect.drawHorizontalAxis();
        daterect.drawVerticalAxis();
        daterect.drawSymbols();
        symbols = daterect.svg.select('g.symbol').selectAll('rect.symbol')[0];
        actual = symbols.length;;
        expect(actual).toEqual(139);
    });



})


