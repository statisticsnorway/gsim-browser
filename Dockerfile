FROM node:11.9.0-alpine as builder
WORKDIR /app
RUN apk --no-cache add curl tar gzip bash git

# Dependency as another step to speed up build.
COPY package.json yarn.lock ./
RUN yarn

# Actual build
COPY . ./
ENV REACT_APP_LDS "/lds"
RUN yarn build

FROM nginx:alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf.template
COPY docker/start_nginx.sh /start_nginx.sh
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["/bin/sh", "/start_nginx.sh"]
