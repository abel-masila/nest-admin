FROM node:16.17

WORKDIR /app
COPY package*.json .
RUN yarn install
COPY . .


CMD yarn start:dev