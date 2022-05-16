
FROM node:14-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json tsconfig.json ./
COPY src/ ./src/
COPY index.ts server.ts ./
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
RUN npm install

EXPOSE 3000
CMD /wait && npm run dev
