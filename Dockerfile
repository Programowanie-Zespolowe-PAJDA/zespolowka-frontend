FROM node:18 AS build

ARG VITE_API_BACKEND_URL
ARG VITE_API_FRONTEND_URL

ENV VITE_API_BACKEND_URL=$VITE_API_BACKEND_URL
ENV VITE_API_FRONTEND_URL=$VITE_API_FRONTEND_URL

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]