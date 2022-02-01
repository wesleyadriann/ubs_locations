FROM node:16-alpine3.11

RUN \
  echo "UPDATING SYSTEM" && \
  apk update && \
  apk add --update

WORKDIR /app

COPY ./package*.json .

RUN npm ci

COPY . .

EXPOSE 3000

ENTRYPOINT npm start
