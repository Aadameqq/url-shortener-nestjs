FROM node:18-alpine AS builder-deps
WORKDIR /home/app

COPY ./package*.json ./

RUN npm ci

COPY . .

FROM builder-deps AS tester
RUN npm run test

FROM tester AS linter
RUN npm run lint

FROM linter AS builder
RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /home/app

ENV NODE_ENV production
ENV PORT 3000

RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app

COPY ./package*.json ./

RUN npm ci

USER app

COPY --from=builder /home/app/dist ./

EXPOSE 3000

CMD ["node","main.js"]




