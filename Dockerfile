# مرحلة البناء
FROM node:20-alpine AS builder

# استلام المتغير كـ build argument من GitHub Actions
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

WORKDIR /app
COPY . .
RUN npm install && npm run build

# مرحلة التشغيل
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# نسخ إعدادات NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
