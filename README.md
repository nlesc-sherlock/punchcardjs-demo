[![devDependency Status](https://david-dm.org/nlesc-sherlock/punchcardjs/dev-status.svg)](https://david-dm.org/nlesc-sherlock/punchcardjs#info=devDependencies)
[![Build Status](https://travis-ci.org/nlesc-sherlock/punchcardjs.svg?branch=master)](https://travis-ci.org/nlesc-sherlock/punchcardjs)

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
node_modules/.bin/tsc --target es5 sites/demo/ts/*.ts --outDir sites/demo/js

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
# sites/coverage/coverage-remapped/index.html
npm run cover

```

# Project layout with explanation:

```bash
.                                              # project root directory
├── bower.json                                 # defines the client-side dependencies
├── CONTRIBUTING                               # outlines the rules/for contributing to this repository
├── doc                                        # directory containing files that help document the repository
│   └── installing-node.md                     #
├── karma.conf.js                              # configuration file for Karma, the test runner
├── LICENSE                                    # describes the license for dissemination and use of this software
├── notes.md                                   #
├── package.json                               # the Node package manager file describes the server-side / development dependencies
├── README.md                                  # this file
├── sites                                      # there are a few websites associated with this repository:
│   └── demo                                   # the demo website serves as an illustration of the punchcards library
│       ├── index.html                         # the demo website's main file
│       ├── README.md                          #
│       └── ts                                 # some TypeScript files that are needed to display the demo site:
│           ├── dataloader.ts                  # a script that loads data from the web
│           └── main-script.ts                 # a script that calls dataloader, then passes its data to the punchcards library
├── src                                        # the source code in this directory constitutes the heart of this repository
│   ├── css                                    # there are corresponding style files for most TypeScript files in 'src/ts/punchcards'
│   │   └── punchcards                         #
│   │       ├── base.css                       # the base appearance that is shared by all types of punchcards
│   │       ├── date-circle.css                # style file determining the appearance of the DateCircle punchcard
│   │       ├── date-rect.css                  # style file determining the appearance of the DateRect punchcard
│   │       ├── legend.css                     # style file determining the appearance of the Legend
│   │       ├── weekday-circle.css             # style file determining the appearance of the WeekdayCircle punchcard
│   │       └── weekday-rect.css               # style file determining the appearance of the WeekdayRect punchcard
│   └── ts                                     # contains the TypeScript source code that get transpiled into JavaScript
│       ├── idatarow.ts                        # interface definition for the data structure that punchcards expects
│       ├── punchcards                         #
│       │   ├── base.ts                        # the punchcards Base class
│       │   ├── colormap.ts                    # the punchcards ColorMap class
│       │   ├── date-circle.ts                 # the punchcards DateCircle class (inherits from DateRect)
│       │   ├── date-rect.ts                   # the punchcards DateRect class (inherits from Base)
│       │   ├── legend.ts                      # the punchcards Legend class
│       │   ├── weekday-circle.ts              # the punchcards WeekdayCircle class (inherits from WeekdayRect)
│       │   └── weekday-rect.ts                # the punchcards WeekdayRect class (inherits from Base)
│       └── punchcards.ts                      #
├── test                                       # the test directory has the exact same structure as 'src'
│   ├── README.md                              #
│   ├── html                                   # html files pertaining to the tests (so-called fixtures)
│   │   └── punchcards                         # format is *.test.html
│   │       └── base.test.html                 # html fixture file pertaining to the test of the Base class from 'src/ts/punchcards/'
│   └── ts                                     #
│       └── punchcards                         # format is *.test.js
│           ├── base.test.js                   # JavaScript unit test file pertaining to the test of the Base class from 'src/ts/punchcards/'
│           ├── colormap.test.js               # JavaScript unit test file pertaining to the test of the ColorMap class from 'src/ts/punchcards/'
├── tsconfig.json                              # configuration file for the TypeScript compiler
├── tslint.json                                # configuration file for linting/static analysis of the TypeScript code
└── typings.json                               # type information for the client-side libraries
```


## How it all fits together

### General

So you wrote some **source code**. A **distributable** can be created from the source code. Distributables are great, because that's what people can use in their own websites later. However, distributables are only good if they work --you don't want to break other people's websites, now do you? So, the distributable needs to be tested using **unit tests**. For this you typically need to do two things: first, you need to be able to do **assertions**. Assertions help you test different kinds of equality (''is the test result what it is supposed to be?''). Secondly, you need a  **test runner**, i.e. something that runs the tests (and then, typically, reports on their results). Now that you have tests, you also want to generate **code coverage** reports. Code coverage helps to make transparent which parts of the code are covered by tests.

### In our case

- Our **source code** lives at ``src``. The meat of it is written in TypeScript.
- We create the **distributable** using ``npm run`` scripting, so there are no Gulp or Grunt files.
- We use **unit tests** written in the style of [``tape``](https://www.npmjs.com/package/tape).
- Tape also provides a simple **assertion** library. We expand [``tape``](https://www.npmjs.com/package/tape) with [``tapes``](https://www.npmjs.com/package/tapes) in order to do ``beforeEach`` and ``afterEach``.
- Tape is also the **test runner**; well, it's one of the ways in which to run the tests. It is a versatile little library.
- We generate code coverage in different formats using [``istanbul``](https://www.npmjs.com/package/istanbul). However, this gives us code coverage of the (generated) JavaScript, which is not really what we're interested in. So we have [``remap-istanbul``](https://www.npmjs.com/package/remap-istanbul) figure out which parts of the generated JavaScript correspond with which parts of the (written) TypeScript.
- We currently [don't have a working setup](https://github.com/nlesc-sherlock/punchcardjs/issues/15) for running any tests in the browser.

