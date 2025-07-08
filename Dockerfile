# 🧱 مرحلة البناء
FROM node:20 AS builder
WORKDIR /app

# نسخ وإعداد الحزم
COPY package*.json ./
RUN npm install

# نسخ المشروع بالكامل
COPY . .

# تمرير المتغيرات إلى البيئة
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL


# تنفيذ البناء
RUN VITE_API_BASE_URL=$VITE_API_BASE_URL npm run build

# 🚀 مرحلة التشغيل (باستخدام Nginx)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# نسخ إعدادات Nginx إن وُجدت
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

