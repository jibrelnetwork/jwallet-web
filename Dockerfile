FROM node:8-onbuild AS build

ENV MAIN_RPC_ADDR=main.node.jwallet.network \
    ROPSTEN_RPC_ADDR=ropsten.node.jwallet.network

RUN npm run compile:prod

FROM nginx:alpine

COPY --from=build /usr/src/app/build/. /app/
COPY version.txt /app/
COPY nginx.conf /etc/nginx/
COPY run.sh /bin/run.sh

RUN ["run.sh", "check"]
CMD ["run.sh", "start"]
