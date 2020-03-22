FROM node:12.16.1

RUN mkdir -p /home/node/eshop

WORKDIR /home/node/eshop

COPY . /home/node/eshop

RUN npm i

EXPOSE 7001

CMD npm start