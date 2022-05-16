
# Build stage
FROM node:14-alpine AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build



# Production stage
FROM nginx AS production-stage

WORKDIR /usr/share/nginx/html

# ARG TIMETABLE_APP_URL
# ENV TIMETABLE_APP_URL ${TIMETABLE_APP_URL}

# COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/src/app/dist .

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
# CMD ["ls", "-l", "/usr/share/nginx/html"]
