FROM node:14

RUN npm install -g npm@latest

WORKDIR /ermosoengenharia

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]