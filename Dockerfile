FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm build
FROM nginx:latest

COPY --from=build /app/dist/* /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]