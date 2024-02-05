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

# Skopiuj konfigurację Nginx
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

# Dodaj flagę proxy-config do komendy startowej
CMD ["nginx", "-g", "daemon off;", "--proxy-config", "/usr/share/nginx/html/proxy.config.json"]
