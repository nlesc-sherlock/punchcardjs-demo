split out big chicago repo into 4 smaller ones, generalized 3 for estepping

 - metrochartjs
 - spiraljs
 - punchcardjs

```
PunchcardBase.ts
   PunchcardDateRect.ts
       PunchcardDateCircle.ts
   PunchcardWeekdayRect.ts
        PunchcardWeekdayCircle.ts
```     

```
gulp dev-watch
show localhost:3000
```

then we focused on **unit testing** with Tape and Jasmin

infrastructure works:

 - travis-ci,
 - yaml stuff
 - gulp tasks for 
      - generate typedoc 
      - start tests

```javascript
var test = require('tape').test;
var add = require('./../lib/js/add.js').add;

test('The add method...', function(t) {

    var actual,
        expected;

    actual = add(1, 2);
    expected = 3;

    t.equal(actual, expected, '...should add two Numbers correctly.');

    // notify tape that there are no more tests
    t.end();

})

```


Had trouble finding a good way to transpile into 1 JS file that can be required in the test (only with manual editing).


Pair programmed about 75% of the time, worked OK.
