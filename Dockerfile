FROM node:16 as build
USER node
WORKDIR /usr/ts-backend-v2
COPY --chown=node:node package*.json yarn.lock ./
RUN yarn install --pure-lockfile --frozen-lockfile
COPY --chown=node:node . .
RUN yarn build-linux

FROM node:16
USER node
WORKDIR /usr/ts-backend-v2
COPY --chown=node:node package*.json yarn.lock ./
RUN yarn install --prod --pure-lockfile --frozen-lockfile
COPY --chown=node:node --from=build /usr/ts-backend-v2/dist ./dist
COPY --chown=node:node .env ./
CMD yarn launch-dev