FROM node

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run client_install
RUN npm run client_build
RUN npm run server_build


EXPOSE 3001

CMD [ "npm", "start" ]
