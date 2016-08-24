/*
 * tests requiring DOM manipulation for punchcards.DateCircle from dist/punchcards.js
 */

/*global describe, beforeEach, fixture, crossfilter, afterEach, it, expect, punchcards*/

describe('punchcards DateCircle class...', function () {
    'use strict';

    var fixtures, cf;

    beforeEach(function () {

        var data;

        // set the base directory for loading of fixtures
        fixture.setBase('test');

        // load the html and json fixtures
        fixtures = fixture.load('date-circle.fixture.html',
            'cityofchicago-police-data.fixture.json');

        data = fixtures[1];
        cf = crossfilter(data);

    });



    afterEach(function () {
        // clean up the DOM
        fixture.cleanup();
        cf = undefined;
    });



    it('...html fixture should have loaded correctly', function () {
        var actual, expected;
        actual = fixtures[0][0].outerHTML;
        expected = '<div id="punchcard-date-circle"></div>';
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have loaded correctly', function () {
        var actual, expected;
        actual = Object.keys(fixtures[1][0]).sort();
        expected = ["casenumber", "datestr", "description", "latitude", "longitude", "primary"];
        expect(actual).toEqual(expected);
    });



    it('...json fixture should have 5000 records', function () {
        var actual, expected;
        actual = cf.size();
        expected = 5000;
        expect(actual).toEqual(expected);
    });



    it('...constructor should return an instance of punchcards.DateCircle when called with valid arguments', function () {
        var actual, datecircle;
        datecircle = new punchcards.DateCircle(cf, 'punchcard-date-circle');
        actual = datecircle instanceof punchcards.DateCircle;
        expect(actual).toBe(true);
    });

    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" attached to it', function () {
            var actual, datecircle;
            datecircle = new punchcards.DateCircle(cf, 'punchcard-date-circle');
            datecircle.defineDimensions();
            datecircle.drawSvg();
            datecircle.drawHorizontalAxis();
            datecircle.drawVerticalAxis();
            datecircle.drawSymbols();
            actual = datecircle.svg.select('g.symbol')[0][0];
            expect(actual).not.toBe(null);
        });



    it('...after calling .drawSymbols(), the chart should have an ' +
        'SVG g element of class "symbol" with 139 SVG circles of class ' +
        '"symbol" attached to it', function () {
            var actual, datecircle, symbols;
            datecircle = new punchcards.DateCircle(cf, 'punchcard-date-circle');
            datecircle.defineDimensions();
            datecircle.drawSvg();
            datecircle.drawHorizontalAxis();
            datecircle.drawVerticalAxis();
            datecircle.drawSymbols();
            symbols = datecircle.svg.select('g.symbol').selectAll('circle.symbol')[0];
            actual = symbols.length;
            expect(actual).toEqual(139);
        });

    
});


