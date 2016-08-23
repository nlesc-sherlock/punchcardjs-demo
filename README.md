[![devDependency Status](https://david-dm.org/nlesc-sherlock/punchcardjs/dev-status.svg)](https://david-dm.org/nlesc-sherlock/punchcardjs#info=devDependencies)
[![Build Status](https://travis-ci.org/nlesc-sherlock/punchcardjs.svg?branch=master)](https://travis-ci.org/nlesc-sherlock/punchcardjs)

- For the demo website, go [here](http://nlesc-sherlock.github.io/punchcardjs/demo/);
- For the code coverage report, go [here](http://nlesc-sherlock.github.io/punchcardjs/coverage/remapped/src/index.html);
- For TypeDoc documentation of the code, go [here](http://nlesc-sherlock.github.io/punchcardjs/tsdoc/);

# Setting up, building and running

Get a local copy of the punchcardjs repository using ``git``:

```bash
# use package manager to install git
sudo apt-get install git

# make a local copy of this repository
git clone https://github.com/nlesc-sherlock/punchcardjs.git

# change into punchcardjs directory
cd punchcardjs
```

After getting the source, three things need to be done: `npm` needs to install
local copies of the development tools, `bower` needs to fetch client-side dependencies of
our code, and `typings` needs to get the typescript annotations for those. You can
do all of these in one go using:

```bash
# run npm install, bower install, typings install through one command
npm install
```

Next, the software needs to be built. We use `npm` for that as well. We've defined a few build tasks under `scripts` in `packages.json`.

```bash
# lint the typescript code
npm run tslint

# transpile the typescript code to javascript
npm run tsc

# make a distributable js file, punchcards.js
npm run dist

# run the unit tests against the distributable
npm run test

# do the above steps plus some other things to get a demo website...
npm run demo

# ...and transpile a few more typescript files not directly related to the
# library (compiles into JavaScript despite errors)
node_modules/.bin/tsc --target es5 sites/demo/*.ts --outDir sites/demo

# change directory to the demo site
cd sites/demo/

# start a webserver in that directory that serves the
# webpage at localhost:8089
python3 -m http.server 8089

# you should be able to debug the TypeScript code from the browser (uses source maps)
```

## some other useful tasks

```bash

# clean up generated files
npm run clean

# do an npm run clean and additionally throw away any downloaded files
npm run purge

# generate the TypeDoc, inspect afterwards in a browser (output will be at <projectroot>/sites/tsdoc)
npm run tsdoc

# generate code coverage in various formats. output will be at <projectroot>/sites/coverage/, e.g.
# sites/coverage/remapped/ts/punchcards/index.html
npm run cover

```

# Project layout with explanation:

```text
.                                      # project root directory
├── bower.json                         # defines the client-side dependencies
├── CONTRIBUTING                       # outlines the rules/for contributing to this repository
├── doc                                # directory containing files that help document the repository
│   ├── example-date-circle.png        # example image of DateCircle class
│   ├── example-date-rect.png          # example image of DateRect class
│   ├── example-weekday-circle.png     # example image of WeekdayCircle class
│   ├── example-weekday-rect.png       # example image of WeekdayRect class
│   └── installing-node.md             # some notes on how to install nodejs
├── karma.conf.js                      # configuration file for Karma, the test runner
├── LICENSE                            # describes the license for dissemination and use of this software
├── notes.md
├── package.json                       # the Node package manager file describes the server-side / development dependencies
├── README.md                          # this file
├── sites                              # there are a few websites associated with this repository:
│   └── demo                           # the demo website serves as an illustration of the punchcards library
│       ├── dataloader.ts              # script that helps load the data for the demo website
│       ├── fonts                      # required directory for bootstrap (contents added by an npm run task)
│       ├── index.html                 # the demo website's main file
│       ├── main-script.ts             # the demo website's main script
│       └── README.md                  #
├── src                                # this directory contains all the sources (css, ts) for the punchcards library
│   ├── base.css                       # the CSS for the Base class
│   ├── base.ts                        # the TypeScript for the Base class
│   ├── colormap.ts                    # the TypeScript for the ColorMap class
│   ├── date-circle.css                # the CSS for the DateCircle class
│   ├── date-circle.ts                 # the TypeScript for the DateCircle class
│   ├── date-rect.css                  # the CSS for the DateRect class
│   ├── date-rect.ts                   # the TypeScript for the DateRect class
│   ├── idatarow.ts                    # the TypeScript for the IDataRow interface
│   ├── legend.css                     # the CSS for the Legend class
│   ├── legend.ts                      # the TypeScript for the Legend class
│   ├── punchcards.ts                  # the TypeScript for the punchcards module
│   ├── weekday-circle.css             # the CSS for the WeekdayCircle class
│   ├── weekday-circle.ts              # the TypeScript for the WeekdayCircle class
│   ├── weekday-rect.css               # the CSS for the WeekdayRect class
│   └── weekday-rect.ts                # the TypeScript for the WeekdayRect class
├── test                               # this directory contains all the sources (*.dom.js, *.unit.js, *.fixture.html, *.fixture.json) for testing the code from src/
│   ├── base.dom.js                    # DOM test of the Base class
│   ├── base.fixture.html              # HTML fixture for the DOM test of the Base class
│   ├── cityofchicago-police-data.fixture.json # JSON fixture containing a test data set
│   ├── colormap.unit.js               # unit tests of the ColorMap class
│   ├── date-circle.dom.js             # DOM test of the DateCircle class
│   ├── date-circle.fixture.html       # HTML fixture for the DOM test of the DateCircle class
│   ├── date-rect.dom.js               # DOM test of the DateRect class
│   ├── date-rect.fixture.html         # HTML fixture for the DOM test of the DateRect class
│   ├── general.unit.js                # some general unit tests to test the testing setup
│   ├── README.md
│   ├── weekday-circle.dom.js          # DOM test of the WeekdayCircle class
│   ├── weekday-circle.fixture.html    # HTML fixture for the DOM test of the WeekdayCircle class
│   ├── weekday-rect.dom.js            # DOM test of the WeekdayRect class
│   └── weekday-rect.fixture.html      # HTML fixture for the DOM test of the WeekdayRect class
├── tsconfig.json                      # configuration file for the TypeScript compiler
├── tslint.json                        # configuration file for linting/static analysis of the TypeScript code
└── typings.json                       # type information for the client-side libraries
```


## How it all fits together

### General

So you wrote some **source code**. A **distributable** can be created from the source code. Distributables are great, because that's what people can use in their own websites later. However, distributables are only good if they work --you don't want to break other people's websites, now do you? So, the distributable needs to be tested using **unit tests**. For this you typically need to do two things: first, you need to be able to do **assertions**. Assertions help you test different kinds of equality (''is the test result what it is supposed to be?''). Secondly, you need a  **test runner**, i.e. something that runs the tests (and then, typically, reports on their results). Now that you have tests, you also want to generate **code coverage** reports. Code coverage helps to make transparent which parts of the code are covered by tests.

### In our case

- Our **source code** lives at ``src``. The meat of it is written in TypeScript.
- We create the **distributable** using ``npm run`` scripting, so there are no Gulp or Grunt files.
- We use **unit tests** written in the style of [``Jasmine``](http://jasmine.github.io/2.0/introduction.html) (i.e. ``describe()`` and ``it()``).
- Our **assertion** library is [Karma](https://karma-runner.github.io/1.0/index.html) (e.g. ``expect(actual).toEqual(expected)``).
- Karma is also the **test runner**.
- We generate code coverage in different formats using [``karma-coverage``](https://www.npmjs.com/package/karma-coverage). However, this gives us code coverage of the (generated) JavaScript, which is not really what we're interested in. So we have [``remap-istanbul``](https://www.npmjs.com/package/remap-istanbul) figure out which parts of the generated JavaScript correspond with which parts of the (written) TypeScript.

# Examples

Here are some examples of the type of visualizations you can make with this library:

![example-date-circle.png](https://github.com/nlesc-sherlock/punchcardjs/raw/testing/doc/example-date-circle.png "example-date-circle.png")

![example-date-rect.png](https://github.com/nlesc-sherlock/punchcardjs/raw/testing/doc/example-date-rect.png "example-date-rect.png")

![example-weekday-circle.png](https://github.com/nlesc-sherlock/punchcardjs/raw/testing/doc/example-weekday-circle.png "example-weekday-circle.png")

![example-weekday-rect.png](https://github.com/nlesc-sherlock/punchcardjs/raw/testing/doc/example-weekday-rect.png "example-weekday-rect.png")
