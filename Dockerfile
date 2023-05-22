# Dockerfile

# base image
FROM registry.tech1a.co:81/repository/tech1a-docker-registry/node:14.18
#FROM node:alpine

ENV TZ=Asia/Tehran


#RUN apt-get update
#RUN apt-get install tzdata -y


#Set BaseUrl
ENV IDP_URL=https://cluster.tech1a.co
ENV SEJAM_URL=http://172.24.65.20:9072
ENV FILE_SERVER_URL=http://172.24.65.20:9073
ENV CAPTCHA_URL=https://cluster.tech1a.co:8543

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# set permission
RUN chmod +x /usr/src/entrypoint.sh
CMD /usr/src/entrypoint.sh

# install dependencies
RUN yarn install

# start app
RUN yarn run build
EXPOSE 3000

#RUN rm -rf /usr/src/node_modules
RUN yarn cache clean


#Start App
ENTRYPOINT /bin/bash -x ./entrypoint.sh SEJAM_URL=${SEJAM_URL} IDP_URL=${IDP_URL} FILE_SERVER_URL=${FILE_SERVER_URL} CAPTCHA_URL=${CAPTCHA_URL} && mv ./env-config.js ./public/static/assets/js && yarn start
