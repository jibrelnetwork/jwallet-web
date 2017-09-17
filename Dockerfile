FROM node:8-alpine

COPY ./ /app
WORKDIR /app
RUN npm install

CMD [ "npm", "run", "dev" ]
EXPOSE 3000
