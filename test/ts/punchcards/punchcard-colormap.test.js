var test = require('tape').test;
var PunchcardColorMap = require('./../../../dist/punchcards.js').PunchcardColorMap;


test('PunchcardColorMap', function(t) {

    var actual,
        expected;

    actual = (new PunchcardColorMap('default')) instanceof PunchcardColorMap;
    expected = true;
    t.equal(actual, expected, '...constructor should return an object of type \'PunchcardColorMap\' when called with a valid string.');

    actual = (new PunchcardColorMap('default')).colortable;
    expected = PunchcardColorMap.defaultColorTable;
    t.deepEqual(actual, expected, '...constructing with string argument \'default\' should return a colortable equal to the class property \'defaultColorTable\'.');

    // notify tape that there are no more tests
    t.end();

})

