FROM node:8-onbuild AS build

ENV MAIN_RPC_ADDR=main.jnode.network \
    ROPSTEN_RPC_ADDR=ropsten.jnode.network

RUN npm r lint-staged
RUN npm run build:clean

FROM nginx:alpine

RUN wget -q https://github.com/jibrelnetwork/dockerize/releases/latest/download/dockerize-alpine-linux-amd64-latest.tar.gz \
 && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-latest.tar.gz \
 && rm dockerize-alpine-linux-amd64-latest.tar.gz

COPY --from=build /usr/src/app/build/. /app/
COPY version.txt /app/
COPY nginx.conf /etc/nginx/
COPY run.sh /bin/run.sh

CMD ["run.sh", "start"]
