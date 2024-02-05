FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
FROM nginx:latest
COPY --from=build /app/dist/* /usr/share/nginx/html/
COPY proxy.config.json /usr/share/nginx/html
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
