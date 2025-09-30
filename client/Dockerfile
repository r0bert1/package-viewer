FROM node:10

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV REACT_APP_BACKEND_URL="http://localhost:8080/api"

RUN npm run build

RUN npm install -g serve@11.3.2

CMD ["serve", "build"]