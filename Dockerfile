# Etap budowy (build stage)
FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etap produkcyjny
FROM nginx:latest

# Kopiuj pliki z etapu budowy do katalogu serwera NGINX
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Kopiuj plik konfiguracyjny proxy
COPY proxy.conf.json /etc/nginx/conf.d/default.conf

# Dodaj konfigurację proxy do pliku NGINX
RUN echo "location /api/ {" >> /etc/nginx/conf.d/default.conf
RUN echo "    proxy_pass http://$TINYAPI/;" >> /etc/nginx/conf.d/default.conf
RUN echo "}" >> /etc/nginx/conf.d/default.conf

# Uruchom NGINX
CMD ["nginx", "-g", "daemon off;"]
