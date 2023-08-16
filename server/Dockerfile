FROM node:18

RUN npm install -g npm@latest

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

RUN npx prisma generate

# RUN npm run prisma:migrate:dev

# CMD ["npm", "run", "dev"]