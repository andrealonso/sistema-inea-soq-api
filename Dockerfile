# docker image build -t api-soq . --no-cache
FROM node:19-alpine as api-soq-inea

WORKDIR /api

COPY ./package*.json ./
RUN yarn

COPY ./ /api/

EXPOSE 3000

CMD [ "yarn","start" ]