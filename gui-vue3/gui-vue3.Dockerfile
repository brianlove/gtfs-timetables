
FROM node:14-alpine

ENV PATH /app/node_modules/.bin:$PATH
ENV CHOKIDAR_USEPOLLING true

WORKDIR /usr/src/app

ARG TIMETABLE_APP_URL
ENV TIMETABLE_APP_URL ${TIMETABLE_APP_URL}

COPY package*.json ./
RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]
