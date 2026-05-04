from node:24-alpine

WORKDIR /index

COPY package*.json ./

RUN npm ci

copy . .

EXPOSE 3000

CMD ["npm", "start"]