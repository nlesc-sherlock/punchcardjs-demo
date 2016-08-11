**notes**

- A tape test runner that runs your tests in a (headless) browser and returns 0/1 as exit code, so you can use it as your npm test script (https://github.com/juliangruber/tape-run).
- useful video about unit testing with Mocha https://www.youtube.com/watch?v=P7SEDhHtbbo
- [jasmine-fixture](https://github.com/searls/jasmine-fixture) can add elements to the DOM before each jasmine test and clean up afterwards.
- [js-fixtures]((https://github.com/badunk/js-fixtures)) is a library that helps you load html code from a fixture file
- [Karma (previously Testacular)](https://karma-runner.github.io/1.0/index.html) was specifically developed as a test runner for code that manipulates the DOM (i.e Angular)
- karma [tutorial](http://www.bradoncode.com/blog/2015/02/27/karma-tutorial/) simple project with DOM interactions and fixtures, [karma-seed](https://github.com/bbraithwaite/karma-seed) project on github 
- various browserify [articles](http://browserify.org/articles.html)
- https://www.npmjs.com/package/karma-coverage plugin is actually using istanbul for generating code coverage, should be easy to integrate with my setup



**plan**

- use karma to run tests in real browsers and do DOM interactions
- the tests themselves can be tape-style (I think), although it may be easier to use Jasmine's/Mocha's (?) beforeEach() and afterEach() methods to make sure we have a clean DOM. Note: I just found https://github.com/scottcorgan/tapes which suggests it is now possible to combine tape style tests with beforeEach etc. Need to look into this.
- we'll need to make some fixtures, i.e. html pertaining to a test for instance when we need a DOM element as input to the constructor of a class. The fixture's html code can be loaded from file using npm package fixtures, or (probably more convenient) the karma plugin thereof, called karma-fixtures
- code coverage is currently set up to use istanbul, but only generates code coverage statistics for tests that run in node, not those that run in the browser. We'll need to set that up, possibly using npm:karma-coverage, which in fact uses istanbul.

