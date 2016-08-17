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

        data = fixtures[1][0];
        cf = crossfilter(data);

    });



    afterEach(function(){
        // clean up the DOM
        fixture.cleanup();
        cf = undefined;
    });



    it('\n...html fixture should have loaded correctly', function() {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-date-rect"></div>';
        expect(actual).toEqual(expected);
    });



    it('\n...json fixture should have loaded correctly', function() {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["casenumber", "datestr", "description", "latitude", "longitude", "primary"];
        expect(actual).toEqual(expected);
    });



    it('\n...constructor should return an instance of punchcards.DateRect when called with valid arguments', function() {

        var actual, daterect;
        daterect = new punchcards.DateRect(cf, 'punchcard-date-rect');
        actual = daterect instanceof punchcards.DateRect;
        expect(actual).toBe(true);

    });




    // it('\n...after calling .drawBox(), the chart should have an ' +
    //     'SVG g element of class "chartbody-box" attached to it.', function() {
    //
    //     var actual, base;
    //
    //     base = new punchcards.Base(cf, 'punchcard-base');
    //     base.defineDimensions();
    //     base.drawSvg();
    //     base.drawBox();
    //
    //     actual = base.svg.select('g.chartbody-box')[0][0];
    //     expect(actual).not.toBe(null);
    // });
    //
    //
    //
    //
    // it('\n...after calling .drawTitle(), the chart should have an ' +
    //     'SVG g element of class "chartbody-box" with an SVG rect ' +
    //     'element of class "chartbody-box" attached to it.', function() {
    //
    //     var actual, base;
    //
    //     base = new punchcards.Base(cf, 'punchcard-base');
    //     base.defineDimensions();
    //     base.drawSvg();
    //     base.drawBox();
    //
    //     actual = base.svg.select('g.chartbody-box').select('rect.chartbody-box')[0][0];
    //     expect(actual).not.toBe(null);
    // });





})


