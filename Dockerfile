FROM node:11.9.0-alpine as builder
WORKDIR /app
COPY . ./
RUN apk --no-cache add curl tar gzip bash git
RUN yarn install
RUN yarn build

FROM nginx:alpine
RUN apk --no-cache add curl tar gzip bash
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
COPY ./docker/env.bash ./env.sh
COPY ./docker/env ./.env
RUN chmod +x ./env.sh
EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
