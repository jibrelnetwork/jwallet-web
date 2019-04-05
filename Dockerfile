FROM node:8-onbuild AS build

RUN npm r lint-staged
RUN npm run build:clean
RUN npm run storybook:build

FROM nginx:alpine

ENV MAIN_RPC_ADDR=main.jnode.network
ENV ROPSTEN_RPC_ADDR=ropsten.jnode.network
ENV ENV=production

COPY --from=build /usr/src/app/build/. /app/
COPY --from=build /usr/src/app/docs/. /docs/
COPY version.txt /app/
COPY docker/nginx /etc/nginx/
COPY docker/run.sh /bin/run.sh

RUN ["run.sh", "check"]
CMD ["run.sh", "start"]
