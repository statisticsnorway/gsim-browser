FROM node:11.9.0-alpine as builder
WORKDIR /app
RUN apk --no-cache add curl tar gzip bash git

# Dependency as another step to speed up build.
COPY package.json yarn.lock ./
RUN yarn

# Actual build
COPY ./src ./src
COPY ./public ./public
COPY ./.env ./.env
RUN yarn build

FROM nginx:alpine
RUN apk --no-cache add curl tar gzip bash
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
COPY ./docker/env.bash ./env.sh
COPY .env .
RUN chmod +x ./env.sh
EXPOSE 5000
CMD ["/bin/bash", "-c", "echo \"Configured LDS endpoint: $REACT_APP_LDS\" && /usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
