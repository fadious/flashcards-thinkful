FROM node:20-alpine

WORKDIR /FLASHCARDS/

COPY public/ /FLASHCARDS/public/
COPY src/ /FLASHCARDS/src/
COPY package.json /FLASHCARDS/

RUN npm install

CMD ["npm", "start"]