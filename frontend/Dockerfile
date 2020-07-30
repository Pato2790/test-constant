FROM node:14.6.0-alpine as app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.13.12-alpine

COPY --from=app /usr/src/app/dist/test-constant /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
