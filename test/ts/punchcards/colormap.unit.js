var tape = require('tape');
var tapes = require('tapes');
var punchcards = require('./../../../dist/punchcards.js');

// tapes expands tape's functionality with beforeEach and afterEach methods:
var test = tapes(tape);


test('punchcards.ColorMap', function(t) {

    // In this test suite, I have defined .beforeEach and .afterEach methods
    // that are run for each test (they curently don't do anything but that's
    // ok). With this approach it's also easier to let each test run in its own
    // scope, so the 'actual' and 'expected' variables from one test can't
    // affect the result of another test.

    t.beforeEach(function(t) {
        // do some set up for each test
        // console.log('before each test, we do this...');
        t.end();
    });


    t.afterEach(function (t) {
        // do some tear down for each test
        // console.log('...and after each test, we do this.');
        t.end();
    });


    t.test('constructing with a string argument', function (t) {
        var actual, expected;
        actual = (new punchcards.ColorMap('default')) instanceof punchcards.ColorMap;
        expected = true;
        t.equal(actual, expected, '...should return an object of type \'ColorMap\' when called with a valid string.');
        t.end();
    });


    t.test('constructing with a string argument \'default\'', function (t) {
        var actual, expected;
        actual = (new punchcards.ColorMap('default')).colortable;
        expected = punchcards.ColorMap.defaultColorTable;
        t.deepEqual(actual, expected, '...should return a colortable equal to the class property \'defaultColorTable\'.');
        t.end();
    });


    t.test('constructing with no arguments', function (t) {
        var actual, expected;
        actual = (new punchcards.ColorMap()).colortable;
        expected = punchcards.ColorMap.defaultColorTable;
        t.deepEqual(actual, expected, '...should yield the default color table.');
        t.end();
    });


    t.test('constructing with a ColorTable argument', function (t) {
        var actual, expected, colortable;
        colortable = punchcards.ColorMap.defaultColorTable;
        actual = (new punchcards.ColorMap(colortable)).colortable;
        expected = punchcards.ColorMap.defaultColorTable;
        t.deepEqual(actual, expected, '...should yield a ColorMap with that ColorTable as .colortable.');
        t.end();
    });


    t.test('constructing with a Number', function (t) {
        var actual, expected;
        actual = function() {
            return new punchcards.ColorMap(8.682727);
        };
        expected = Error;
        t.throws(actual, expected, '...is undefined and results in an Error.');
        t.end();
    });

    // notify tape that there are no more tests in this suite
    t.end();

})



test('punchcards.ColorMap.addColor()', function(t) {

    function hascolor(colortable, testcolor) {
        // returns true is testcolor occurs in colortable
        var iColor,
            nColors,
            cond1,
            cond2,
            cond3,
            cond4,
            cond5;

        nColors = colortable.length;

        for (iColor = 0; iColor < nColors; iColor+=1) {
            cond1 = colortable[iColor].at === testcolor.at;
            cond2 = colortable[iColor].color[0] === testcolor.color[0];
            cond3 = colortable[iColor].color[1] === testcolor.color[1];
            cond4 = colortable[iColor].color[2] === testcolor.color[2];
            cond5 = colortable[iColor].color[3] === testcolor.color[3];
            if (cond1 & cond2 & cond3 & cond4 & cond5) {
                return true;
            }
        }
        return false;
    }

    var actual,
        expected,
        testcolor,
        cmgray;

    // instantiate the colormap object using the predefined gray colormap
    cmgray = new punchcards.ColorMap('gray');

    // define the color that we'll add later
    testcolor = {at: 0.5, color: [128, 128, 128, 0]};

    // check that the colormap.colortable does not already have a color that
    // matches the testcolor we're going to add.
    actual = hascolor(cmgray.colortable, testcolor);
    expected = false;
    t.equal(actual, expected, '...the colortable should not include the test color at this stage.');

    // add the test color
    cmgray.addColor(testcolor);

    // check that the colormap.colortable now includes the testcolor.
    actual = hascolor(cmgray.colortable, testcolor);
    expected = true;
    t.equal(actual, expected, '...the colortable should include the test color at this stage.');

    // notify tape that there are no more tests
    t.end();

})


test('punchcards.ColorMap.addColors()', function(t) {

    var colortable,
        colormap;

    // construct with a ColorTable
    colortable = [
        {
            at: 0.0,
            color: [0, 0, 0, 0]
        },
        {
            at: 1.0,
            color: [255, 255, 255, 0]
        }
    ];

    // make a colormap with an 'empty' colortable
    colormap = new punchcards.ColorMap('empty');

    // add the colortable info
    colormap.addColors(colortable);

    // get the colortable after we added the colors
    actual = colormap.colortable;
    expected = (new punchcards.ColorMap('gray')).colortable;

    t.deepEqual(actual, expected, '...constructing with a ColorTable argument should yield a ColorMap with that ColorTable.');

    // notify tape that there are no more tests
    t.end();

})



test('punchcards.ColorMap.getColorRGB()', function(t) {

    var actual,
        expected,
        cmgray;

    // instantiate the colormap object using the predefined gray colormap
    cmgray = new punchcards.ColorMap('gray');

    // check that the colormap.colortable now includes the testcolor.
    actual = cmgray.getColorRGB(0.0);
    expected = 'rgb(0,0,0)';
    t.equal(actual, expected, '...the rgb string representation of the color at value 0.0 should be \'rgb(0,0,0)\' when using the predefined \'gray\' colormap.');

    // notify tape that there are no more tests
    t.end();

})


