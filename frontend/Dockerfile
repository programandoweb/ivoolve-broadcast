# Get NPM packages
FROM node:20-alpine AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN apk add --update tzdata
ENV TZ=America/Bogota
ENV NEXT_PUBLIC_BACKEND=https://evolve.backend.dev.programandoweb.net/api/v1/
#RUN npm ci --only=production
RUN npm install

# Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
#RUN npm install -g npm@10.2.5
RUN npm run build

# Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001


COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env


RUN mkdir -p /app/public
COPY public /app/public

USER nextjs
EXPOSE 3000

RUN cat .env
CMD ["npm", "start"]


#docker system prune -a
#npm run build
#docker build -t programandoweb/ivoolve:ivoolve-broadcast .
#sudo docker push programandoweb/evolve:ivoolve-broadcast
#sudo docker run -d --name ivoolve-broadcast -p3010:3000 --restart=always programandoweb/ivoolve:ivoolve-broadcast
#sudo docker stop ivoolve-broadcast
#sudo docker rm ivoolve-broadcast