FROM node:21-alpine as builder

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

COPY . .

RUN npm run build 


FROM node:21-alpine

ENV NODE_ENV production

WORKDIR /app
RUN chown node:node /app 

COPY --chown=node:node package.json package.json
COPY --chown=node:node package-lock.json package-lock.json

RUN ls -al
RUN whoami

RUN npm ci --production

COPY --chown=node:node --from=builder /app/dist ./dist

RUN ls -al
RUN ls -al /app/dist/

USER node
CMD ["node", "dist/index.js"]

