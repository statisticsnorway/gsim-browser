FROM node:11.9.0-alpine as builder
WORKDIR /app
COPY . ./
RUN apk --no-cache add curl tar gzip bash git
RUN yarn install
RUN yarn build

FROM nginx:alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
