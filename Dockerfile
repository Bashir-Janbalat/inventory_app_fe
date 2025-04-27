# استخدم نسخة Node الرسمية
FROM node:latest

# تحديد مجلد العمل داخل الحاوية
WORKDIR /app

# نسخ ملفات الاعتماديات (package.json و package-lock.json)
COPY package.json package-lock.json ./

# تثبيت الاعتماديات
RUN npm install

# نسخ جميع ملفات المشروع بما في ذلك src و public
COPY . .

# بناء المشروع باستخدام Vite
# هذا سيقوم بإنشاء ملفات البناء داخل مجلد dist
RUN npm run build

# تثبيت serve لتقديم التطبيق (ملف dist الذي تم إنشاؤه)
RUN npm install -g serve

# فتح المنفذ 3000
EXPOSE 3000

# تشغيل التطبيق باستخدام serve
CMD ["serve", "-s", "dist", "-l", "3000"]
