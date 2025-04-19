FROM node:22

WORKDIR /app

COPY package*.json ./

COPY start.sh ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["sh", "./start.sh"]