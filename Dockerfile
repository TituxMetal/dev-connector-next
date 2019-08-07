FROM node:10-alpine AS builder

WORKDIR /app/build

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV production

RUN yarn build

FROM node:10-alpine AS runtime

WORKDIR /app/prod

COPY --from=builder /app/build/.next ./.next
COPY --from=builder /app/build/server ./server
COPY --from=builder /app/build/node_modules ./node_modules
COPY --from=builder /app/build/static ./static
COPY --from=builder /app/build/index.js ./
COPY --from=builder /app/build/package.json ./

EXPOSE 3000

ENV NODE_ENV production
ENV MONGO_URI mongodb://mongo:27017/dev-connector-next
ENV REDIS_HOST localhost
ENV REDIS_PORT 6379
ENV REDIS_PASSWORD password
ENV SESS_NAME sessionname
ENV SESS_SECRET sessionsecret
ENV SESS_LIFETIME 2000

CMD ["yarn", "start"]
