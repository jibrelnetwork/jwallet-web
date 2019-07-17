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

COPY --from=build /app/build/. /app/
COPY --from=build /app/docs/. /docs/
COPY version.txt /app/
COPY docker/nginx /etc/nginx/
COPY docker/run.sh /bin/run.sh

RUN ["run.sh", "check"]
CMD ["run.sh", "start"]
