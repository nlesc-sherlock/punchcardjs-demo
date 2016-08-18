/*
 * tests requiring DOM manipulation for punchcards.Base from dist/punchcards.js
 */

describe('punchcards Base class...', function() {

    var fixtures, cf;

    beforeEach(function() {

        var data;

        // set the base directory for loading of fixtures
        fixture.setBase('test/fixtures');

        // load the html and json fixtures
        fixtures = fixture.load('base.fixture.html',
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
        expected = '<div id="punchcard-base"></div>';
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



    it('...constructor should return an instance of punchcards.Base when called with valid arguments', function() {
        var actual, base;
        base = new punchcards.Base(cf, 'punchcard-base');
        actual = base instanceof punchcards.Base;
        expect(actual).toBe(true);
    });



    it('...calling .drawSvg() method should add an SVG svg to the DOM.', function() {
        // should match the string <svg></svg>
        var actual, expected, base, div, re;

        base = new punchcards.Base(cf, 'punchcard-base');
        base.defineDimensions();

        base.drawSvg();

        div = fixtures[0][0];
        // capture the svg opening and closing tags using a regular expression
        // see https://regex101.com/ for testing/debugging regular expressions
        re = new RegExp(/^<svg.*>.*<\/svg>$/)
        actual = re.test(div.innerHTML);
        expected = true;
        expect(actual).toEqual(expected);
    });



    it('...after calling .drawSvg(), the SVG svg element should have a ' +
        '"width" property with a numerical value.', function() {
        // use a regular expression to verify that there is a 'width' property
        // attached to the svg opening tag with a numerical value.
        // see https://regex101.com/ for testing/debugging regular expressions
        //
        // should match the strings
        //
        // <svg width='56'></svg>
        // <svg width="83637"></svg>
        // <svg width = "83637"></svg>
        // <svg width="112" height="34566"></svg>
        // <svg width='112' height='34566'></svg>
        // <svg height='34566' width='112'></svg>
        // <svg width='200%' height='100%'></svg>
        //
        // but not
        //
        // <svg></svg>
        // <svg width=""></svg>
        // <svg width="abc"></svg>

        var actual, expected, base, div, re;

        base = new punchcards.Base(cf, 'punchcard-base');
        base.defineDimensions();
        base.drawSvg();

        div = fixtures[0][0];
        // use a regular expression to verify that there is a 'width' property
        // attached to the svg opening tag with a numerical value.
        // see https://regex101.com/ for testing/debugging regular expressions
        re = new RegExp(/^<svg.*width\s*=\s*["']\d{1,}\%?["'].*>.*<\/svg>$/)
        actual = re.test(div.innerHTML);
        expected = true;
        expect(actual).toEqual(expected);
    });



    it('...after calling .drawSvg(), the SVG svg element should have a ' +
        '"height" property with a numerical value.', function() {
        // use a regular expression to verify that there is a 'height' property
        // attached to the svg opening tag with a numerical value.
        // see https://regex101.com/ for testing/debugging regular expressions
        //
        // should match the strings
        //
        // <svg height='56'></svg>
        // <svg height="83637"></svg>
        // <svg height = "83637"></svg>
        // <svg height="112" width="34566"></svg>
        // <svg height='112' width='34566'></svg>
        // <svg width='34566' height='112'></svg>
        // <svg height='200%' width='100%'></svg>
        //
        // but not
        //
        // <svg></svg>
        // <svg height=""></svg>
        // <svg height="abc"></svg>

        var actual, expected, base, div, re;

        base = new punchcards.Base(cf, 'punchcard-base');
        base.defineDimensions();
        base.drawSvg();

        div = fixtures[0][0];
        re = new RegExp(/^<svg.*height\s*=\s*["']\d{1,}\%?["'].*>.*<\/svg>$/)
        actual = re.test(div.innerHTML);
        expected = true;
        expect(actual).toEqual(expected);
    });



    it('...after calling .drawSvg(), the instance should have a .svg member.', function() {

        var actual, base;

        base = new punchcards.Base(cf, 'punchcard-base');
        base.defineDimensions();
        base.drawSvg();

        actual = base.svg;
        expect(actual).not.toBe(undefined);
    });



    it('...after calling .drawChartBody(), the chart should have ' +
       'an SVG g element of class "chartbody".', function() {

        var actual, base;

        base = new punchcards.Base(cf, 'punchcard-base');
        base.defineDimensions();
        base.drawSvg();
        base.drawChartBody();

        actual = base.svg.select('g.chartbody');
        expect(actual).not.toBe(null);
    });




    it('...after calling .drawChartBody(), the chart should have an ' +
        'SVG g element of class "chartbody" with an SVG rect element attached ' +
        'to it.', function() {

        var actual, base;

        base = new punchcards.Base(cf, 'punchcard-base');
        base.defineDimensions();
        base.drawSvg();
        base.drawChartBody();

        actual = base.svg.select('g.chartbody').select('rect.chartbody');
        expect(actual).not.toBe(null);
    });




    it('...after calling .drawHorizontalAxisLabel(), the chart should have an ' +
        'SVG g element of class "horizontal-axis-label" attached to it.', function() {

        var actual, base;

        base = new punchcards.Base(cf, 'punchcard-base');
        base.defineDimensions();
        base.drawSvg();
        base.drawHorizontalAxisLabel();

        actual = base.svg.select('g.horizontal-axis-label')[0][0];
        expect(actual).not.toBe(null);
    });




    it('...after calling .drawHorizontalAxisLabel(), the chart should have an ' +
        'SVG g element of class "horizontal-axis-label" with an SVG text ' +
        'element of class "horizontal-axis-label" attached to it.', function() {

        var actual, base;

        base = new punchcards.Base(cf, 'punchcard-base');
        base.defineDimensions();
        base.drawSvg();
        base.drawHorizontalAxisLabel();

        actual = base.svg.select('g.horizontal-axis-label').select('text.horizontal-axis-label')[0][0];
        expect(actual).not.toBe(null);
    });




    it('...after calling .drawVerticalAxis(), the chart should have an ' +
        'SVG g element of class "vertical-axis" attached to it.', function() {

        var actual, base;

        base = new punchcards.Base(cf, 'punchcard-base');
        base.defineDimensions();
        base.drawSvg();
        base.drawVerticalAxis();

        actual = base.svg.select('g.vertical-axis')[0][0];
        expect(actual).not.toBe(null);
    });




    it('...after calling .drawVerticalAxisLabel(), the chart should have an ' +
        'SVG g element of class "vertical-axis-label" attached to it.', function() {

        var actual, base;

        base = new punchcards.Base(cf, 'punchcard-base');
        base.defineDimensions();
        base.drawSvg();
        base.drawVerticalAxisLabel();

        actual = base.svg.select('g.vertical-axis-label')[0][0];
        expect(actual).not.toBe(null);
    });




    it('...after calling .drawVerticalAxisLabel(), the chart should have an ' +
        'SVG g element of class "vertical-axis-label" with an SVG text ' +
        'element of class "vertical-axis-label" attached to it.', function() {

        var actual, base;

        base = new punchcards.Base(cf, 'punchcard-base');
        base.defineDimensions();
        base.drawSvg();
        base.drawVerticalAxisLabel();

        actual = base.svg.select('g.vertical-axis-label').select('text.vertical-axis-label')[0][0];
        expect(actual).not.toBe(null);
    });




    it('...after calling .drawTitle(), the chart should have an ' +
        'SVG g element of class "title" attached to it.', function() {

        var actual, base;

        base = new punchcards.Base(cf, 'punchcard-base');
        base.defineDimensions();
        base.drawSvg();
        base.drawTitle();

        actual = base.svg.select('g.title')[0][0];
        expect(actual).not.toBe(null);
    });




    it('...after calling .drawTitle(), the chart should have an ' +
        'SVG g element of class "title" with an SVG text ' +
        'element of class "title" attached to it.', function() {

        var actual, base;

        base = new punchcards.Base(cf, 'punchcard-base');
        base.defineDimensions();
        base.drawSvg();
        base.drawTitle();

        actual = base.svg.select('g.title').select('text.title')[0][0];
        expect(actual).not.toBe(null);
    });




    it('...after calling .drawBox(), the chart should have an ' +
        'SVG g element of class "chartbody-box" attached to it.', function() {

        var actual, base;

        base = new punchcards.Base(cf, 'punchcard-base');
        base.defineDimensions();
        base.drawSvg();
        base.drawBox();

        actual = base.svg.select('g.chartbody-box')[0][0];
        expect(actual).not.toBe(null);
    });




    it('...after calling .drawTitle(), the chart should have an ' +
        'SVG g element of class "chartbody-box" with an SVG rect ' +
        'element of class "chartbody-box" attached to it.', function() {

        var actual, base;

        base = new punchcards.Base(cf, 'punchcard-base');
        base.defineDimensions();
        base.drawSvg();
        base.drawBox();

        actual = base.svg.select('g.chartbody-box').select('rect.chartbody-box')[0][0];
        expect(actual).not.toBe(null);
    });



    // drawLegend()
    // defineDimensions()


})


