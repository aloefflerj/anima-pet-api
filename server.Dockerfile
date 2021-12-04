FROM node:12

WORKDIR /app

COPY ./api/package.json . 

RUN npm cache clean --force

RUN npm install

COPY ./api .a

EXPOSE 3000

# CMD npm start
CMD [ "node", "server.js" ]