FROM node:8-alpine

#Git for retrieving of packages specified by git repository
RUN apk update
RUN apk add --no-cache make gcc g++ python git

COPY ./ /app
WORKDIR /app

RUN npm install

CMD [ "npm", "run", "dev" ]

EXPOSE 3000
