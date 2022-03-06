FROM node:alpine

ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}
COPY .npmrc .npmrc  

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

RUN rm -f .npmrc

CMD ["npm", "run", "start:dev"]