# Etap 1: Budowanie aplikacji Angular
FROM node:14 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Etap 2: Uruchomienie aplikacji na Nginx
FROM nginx:alpine
# Skopiuj skompilowane pliki z etapu 1
COPY --from=builder /app/dist /usr/share/nginx/html
# Skopiuj plik proxy.config.json do katalogu /usr/share/nginx/html
COPY proxy.config.json /usr/share/nginx/html

EXPOSE 4200
# Komenda startowa - bez dodatkowych ustawień Nginx
CMD ["nginx", "-g", "daemon off;"]
