# docker image build -t img-severo-api . --no-cache
FROM node:19-alpine as img-severo-api

WORKDIR /app

COPY ./severosystemapi/package*.json ./
RUN yarn

COPY ./severosystemapi/ /app/

EXPOSE 3000

CMD [ "yarn","start" ]