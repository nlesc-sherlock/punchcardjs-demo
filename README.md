[![devDependency Status](https://david-dm.org/nlesc-sherlock/punchcardjs/dev-status.svg)](https://david-dm.org/nlesc-sherlock/punchcardjs#info=devDependencies)
[![Build Status](https://travis-ci.org/nlesc-sherlock/punchcardjs.svg?branch=master)](https://travis-ci.org/nlesc-sherlock/punchcardjs)

# Setting up the development environment (Linux Ubuntu)

The punchcards are written in TypeScript, and use a variety of TypeScript and JavaScript related tools in its build and run-time environment. All of these need to be installed for the program to work.

## JavaScript runtime environment: Node.js

The base of the development environment is Node.js. Node.js is a runtime environment for JavaScript. 

Node.js comes with a package manager for installing add-on packages, which is called `npm`. Install it from the [Nodejs website](https://nodejs.org/en/download/package-manager/), i.e. not through your system's package manager.

```sh
# install curl
sudo apt-get install curl

# add new PPA and install nodejs version from it, not from the Ubuntu repo.
# Do not do sudo apt-get install npm
sudo curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get update
sudo apt-get install nodejs
```

Some of the tools we will install later contain V8 plugins that are written
in C++. To be able to install these, we'll need a C++ compiler and `make`.

```sh
sudo apt-get install g++
sudo apt-get install make
```

## TypeScript

TypeScript is a typed superset of JavaScript, which is transpiled into
JavaScript for execution on Node.js (or inside a browser). So to use it, we
need at least a compiler, which is available through `npm`. The following
command will install it globally (for all users on the system). `npm` can
also install packages locally (within your project directory), which is
used when installing packages containing dependencies. For tools, a global
install is recommended.

# Getting the source

The punchcardjs code is on Github. You can clone it using:

```sh
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

```sh
# run npm install, bower install, typings install through one command
npm install
```

Next, the software needs to be built. We use `npm` for that as well. We've defined a few built tasks under `scripts` in `packages.json`.

```sh
# lint the typescript code
npm run tslint

# transpile the typescript code to javascript
npm run tsc

# make a distributable js file, punchcards.js
npm run dist

# run the unit tests against the distributable
npm run test
```

