FROM node:20.18 AS base

CMD [ "bash" ]

# Build
FROM base AS build
COPY . /workspace
WORKDIR /workspace
ARG REACT_APP_API_SERVER
RUN npm ci && npm run build

# hosting in nginx
FROM nginx:latest AS prod
COPY --from=build /workspace/build /var/www/
COPY nginx.conf /etc/nginx/conf.d/default.conf

