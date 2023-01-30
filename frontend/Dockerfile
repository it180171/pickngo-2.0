#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --base-href=/d.altenhofer/ --deploy-url=/d.altenhofer/

#stage 2
FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/pickngo-angular /usr/share/nginx/html