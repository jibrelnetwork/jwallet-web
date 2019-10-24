FROM node:10 AS build

RUN mkdir /app
WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json .
RUN npm install && npm cache clean --force
COPY . .

RUN npm run build:clean
RUN npm run storybook:build

FROM nginx:alpine

ENV NODE_ENV ${NODE_ENV:-production}
ENV MAIN_RPC_ADDR=main.jnode.network
ENV ROPSTEN_RPC_ADDR=ropsten.jnode.network

RUN wget -q https://github.com/jibrelnetwork/dockerize/releases/latest/download/dockerize-alpine-linux-amd64-latest.tar.gz \
 && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-latest.tar.gz \
 && rm dockerize-alpine-linux-amd64-latest.tar.gz

COPY docker/nginx.tpl.conf /etc/nginx/nginx.tpl.conf
COPY docker/run.sh /bin/run.sh

COPY --from=build /app/build/. /app/
COPY --from=build /app/docs/. /docs/
COPY version.txt /app/

CMD ["run.sh", "start"]
