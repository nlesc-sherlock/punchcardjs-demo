
# Setting up the development environment (Linux Ubuntu)

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
