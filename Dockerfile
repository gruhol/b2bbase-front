FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:latest
COPY --from=build /app/dist/* /usr/share/nginx/html/
COPY proxy.config.json /usr/share/nginx/html
COPY proxy.config.json /etc/nginx/conf.d/proxy.config.json
CMD ["nginx", "-g", "daemon off;"]
