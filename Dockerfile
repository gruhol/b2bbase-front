FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm start