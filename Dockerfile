FROM node:18.15-bullseye-slim

RUN apt-get update -y && \
    apt-get install -y curl

WORKDIR /src
COPY . .

RUN yarn install --prod
EXPOSE 3000

CMD node index.js
