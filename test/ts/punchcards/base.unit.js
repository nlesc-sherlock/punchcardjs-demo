/*
 * Unit tests for punchcards.Base from dist/punchcards.js
 */

describe('The punchcards.Base constructor...\n', function() {

    it('...should be able to find the html fixtures', function() {
        fixture.base = 'test/html';
        var html = fixture.load('calculator.fixture.html');
        expect(html).not.toBe(null);
    });



})
