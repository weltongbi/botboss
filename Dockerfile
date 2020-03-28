FROM node:10.16.3-slim@sha256:d5dc8e967cf60394ed8361f20ec370b66bc7260d70bbe0ea3137dbfb573fcea9

ENV TZ America/Bahia
ENV NODE_ENV production 

COPY . .

RUN npm i 

CMD [ "npm", "start" ]