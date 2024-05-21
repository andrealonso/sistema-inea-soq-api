# docker image build -t api-soq . --no-cache
FROM node:19-alpine as img-api-tamandua

WORKDIR /api

COPY ./package*.json ./
RUN yarn

COPY ./ /api/

RUN npx prisma generate


EXPOSE 3000
CMD [ "yarn","start" ]