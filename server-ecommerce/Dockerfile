FROM node:20-alpine

# Instalamos openssl que puede ser requerido por los engines de Prisma en alpine
RUN apk add --no-cache openssl

WORKDIR /app

# Copiamos archivos de dependencias y schema de prisma
COPY package*.json ./
COPY prisma ./prisma/

# Instalamos todas las dependencias (incluyendo devDependencies para poder compilar auth/testing temporal)
RUN npm ci

# Copiamos el resto del código
COPY . .

# Generamos el Prisma Client y realizamos la compilación TypeScript de la app
RUN npm run build

EXPOSE 8000

# El comando start por default ejecuta 'npm run migrate:prod && node dist/server.js'
CMD ["npm", "start"]
