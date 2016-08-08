var test = require('tape').test;
var punchcards = require('./../../../dist/punchcards.js');



test('punchcards.ColorMap constructor', function(t) {

    var actual,
        expected,
        colormap;

    actual = (new punchcards.ColorMap('default')) instanceof punchcards.ColorMap;
    expected = true;
    t.equal(actual, expected, '...constructor should return an object of type \'ColorMap\' when called with a valid string.');

    actual = (new punchcards.ColorMap('default')).colortable;
    expected = punchcards.ColorMap.defaultColorTable;
    t.deepEqual(actual, expected, '...constructing with string argument \'default\' should return a colortable equal to the class property \'defaultColorTable\'.');

    // construct without arguments

    // construct with a ColorTable

    // notify tape that there are no more tests
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


