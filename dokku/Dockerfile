FROM node:6.9.5

COPY src /app
COPY dokku/CHECKS /app/CHECKS

EXPOSE 80

WORKDIR /app

ENV NODE_ENV production

CMD [ "node", "index" ]
