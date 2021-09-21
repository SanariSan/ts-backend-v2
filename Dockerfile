FROM node:14 as build
WORKDIR /usr/ts-boilerplate-v2
COPY --chown=node:node package*.json yarn.lock ./
RUN yarn install --pure-lockfile
COPY --chown=node:node . .
RUN yarn build-linux

FROM node:14
WORKDIR /usr/ts-boilerplate-v2
COPY --chown=node:node package*.json yarn.lock ./
RUN yarn install --prod --pure-lockfile
COPY --chown=node:node --from=build /usr/ts-boilerplate-v2/dist ./dist
COPY --chown=node:node .env ./
USER node
CMD yarn launch-prod