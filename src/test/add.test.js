var test = require('tape').test;
var add = require('./../lib/js/add.js').add;


test('The add method...', function(t) {

    var actual,
        expected;

    actual = add(1, 2);
    expected = 4;

    t.equal(actual, expected, '...should add two Numbers correctly.');

    // notify tape that there are no more tests
    t.end();

})

