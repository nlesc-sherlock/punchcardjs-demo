var test = require('tape').test;
var punchcards = require('./../../../dist/punchcards.js');



test('punchcards.ColorMap', function(t) {

    var actual,
        expected;

    actual = (new punchcards.ColorMap('default')) instanceof punchcards.ColorMap;
    expected = true;
    t.equal(actual, expected, '...constructor should return an object of type \'ColorMap\' when called with a valid string.');

    actual = (new punchcards.ColorMap('default')).colortable;
    expected = punchcards.ColorMap.defaultColorTable;
    t.deepEqual(actual, expected, '...constructing with string argument \'default\' should return a colortable equal to the class property \'defaultColorTable\'.');

    // notify tape that there are no more tests
    t.end();

})

