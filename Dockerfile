FROM node:latest AS build
WORKDIR /app
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:latest AS ngi
COPY --from=build /app/dist/* /usr/share/nginx/html/
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

COPY /etc/letsencrypt/live/b2bpoint.pl/fullchain.pem /fullchain.pem
COPY /etc/letsencrypt/live/b2bpoint.pl/privkey.pem /privkey.pem

EXPOSE 80
EXPOSE 443