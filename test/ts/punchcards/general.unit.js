/*
 * Tests whether the general testing setup works
 */

describe('punchcards general testing functionality\n', function() {

    it('...should know about Punchcards', function() {
        expect(punchcards).not.toBe(null);
    });


    it('...should have loaded the crossfilter library', function() {
        expect(crossfilter).not.toBe(null);
    });


    it('...should have loaded the d3 library', function() {
        expect(d3).not.toBe(null);
    });


    it('...should have loaded the moment library', function() {
        expect(moment).not.toBe(null);
    });


    it('...should have loaded the test data', function() {
        fixture.base = 'test/json';
        var data = fixture.load('cityofchicago-police-data.fixture.json');
        expect(data).not.toBe(null);
    });


    it('...should have created a crossfilter object out of the test data', function() {
        fixture.base = 'test/json';
        var data = fixture.load('cityofchicago-police-data.fixture.json');
        var cf = crossfilter(data);
        expect(cf).not.toBe(null);
    });


    it('...should be able to find the html fixtures', function() {
        fixture.base = 'test/html';
        var html = fixture.load('base.fixture.html');
        expect(html).not.toBe(null);
    });


})
