FROM node:10.15.0

COPY src /app
COPY dokku/CHECKS /app/CHECKS

EXPOSE 80

WORKDIR /app

ENV NODE_ENV production

CMD [ "node", "server/index.js" ]
