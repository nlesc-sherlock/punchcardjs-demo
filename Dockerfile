## First install docker on your machine
## Then you can build the docker image with this command (the build looks
## in this file):
# docker build -t image-punchcardjs-demo .
## Then run the docker container using this command:
# docker run -p 5002:80 --name prosperous-punchcards image-punchcardjs-demo
##
## Now you should be able to open a browser (on the host) and navigate to
## http://localhost:5002 and see the webapp being served.
##
## When you're done, run
# docker stop prosperous-punchcards
## (you may have to start a new terminal for that)
##
## Check what containers you have:
# docker ps -a
##
## Removing a container goes as follows:
# docker rm prosperous-punchcards
##
## Check what images you have with:
# docker images
##
## Removing the image goes like this:
# docker rmi image-punchcardjs-demo

# start from Node's offical docker image, version 7.0 (https://hub.docker.com/r/library/node/)
FROM node:7.0

# open network port (at outside of the container)
EXPOSE 80

# do the updates
RUN apt-get update

# install python3
RUN apt-get install -y python3

# prepare a directory to copy the repository to
RUN mkdir /punchcardjs-demo

# add files from the docker context to the directory we just prepared
ADD . /punchcardjs-demo/

# set the work directory using absolute paths
WORKDIR /punchcardjs-demo

# install the dependencies listed in package.json
RUN npm install

# fill the sites/demo/ directory with the demo website's content
RUN npm run demo

# change into the demo directory
WORKDIR /punchcardjs-demo/docs/sites/demo

# define the container's task: serving the app
CMD python3 -m http.server 80
