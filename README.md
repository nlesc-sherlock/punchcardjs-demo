[![devDependency Status](https://david-dm.org/nlesc-sherlock/punchcardjs/dev-status.svg)](https://david-dm.org/nlesc-sherlock/punchcardjs#info=devDependencies)
[![Build Status](https://travis-ci.org/nlesc-sherlock/punchcardjs.svg?branch=master)](https://travis-ci.org/nlesc-sherlock/punchcardjs)

Get a local copy of the punchcardjs repository using ``git``:

```bash
# use package manager to install git
sudo apt-get install git

# make a local copy of this repository
git clone https://github.com/nlesc-sherlock/punchcardjs.git

# change into punchcardjs directory
cd punchcardjs
```

# Setting up, building and running

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
npm run site
# ...and transpile a few more typescript files not directly related to the library
node_modules/.bin/tsc --target es5 site/ts/*.ts --outDir site/js

# change directory to the demo site
cd site

# start a webserver in that directory that serves the
# webpage at localhost:8089
python3 -m http.server 8089

# you should be able to debug the TypeScript code from the browser (uses source maps)
```

**some other useful tasks**

```bash

# clean up generated files
npm run clean

# do an npm run clean and additionally throw away any downloaded files
npm run purge

# generate the TypeDoc, inspect afterwards in a browser (output will be at <projectroot>/dist/doc)
npm run tsdoc

# generate code coverage in various formats. output will be at <projectroot>/test-coverage/, e.g.
# test-coverage/coverage-remapped/index.html
npm run istanbul

```






