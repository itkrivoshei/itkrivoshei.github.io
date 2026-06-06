# syntax=docker/dockerfile:1

ARG NODE_VERSION=22
ARG NPM_VERSION=11.16.0

FROM node:${NODE_VERSION}-alpine AS deps
ARG NPM_VERSION
WORKDIR /app

RUN npm install --global npm@${NPM_VERSION}
COPY package*.json ./
RUN npm ci

FROM deps AS build

ENV ASTRO_TELEMETRY_DISABLED=1

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
