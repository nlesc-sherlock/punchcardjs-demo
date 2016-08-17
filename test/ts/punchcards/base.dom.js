/*
 * tests requiring DOM manipulation for punchcards.Base from dist/punchcards.js
 */

describe('The punchcards.Base constructor...\n', function() {


    beforeEach(function() {

        // load the data fixture
        var data, cf;

        console.log(fixture);

        // load the html fixture
        // fixture.setBase('test/html');
        this.html = fixture.load('/test/html/base.fixture.html');

        // // fixture.setBase('test/data');
        this.data = fixture.load('/test/json/cityofchicago-police-data.fixture.json');
        // cf = crossfilter(this.data);


    });


    // afterEach(function(){
    //     // clean up the DOM
    // });


    it('...hello world example should work', function() {
        var actual, expected;
        actual = this.html[0].innerHTML;
        expected = '<p>hello world from fixture</p>';
        expect(actual).toEqual(expected);
    });
})
