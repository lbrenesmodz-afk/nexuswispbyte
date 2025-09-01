# NEXUS HUB (Vercel)

## Deploy
1. أنشئ مشروع جديد على Vercel.
2. ارفع الملفات:
   - index.html, upload.html, style.css, script.js
   - api/upload.js
   - package.json
   - vercel.json
3. تأكد من تثبيت تبعيات `formidable` تلقائيًا عبر Vercel.

## ملاحظات
- رفع الملفات يتم إلى `/tmp` داخل الدالة وهو مؤقت.
- اربط الرفع بمخزن خارجي (S3/R2) لو حابب ملفاتك تبقى.
- أزرار Start/Stop/Status في `index.html` تجريبية؛ اربطها بـ API خاصتك إذا عندك سيرفر لإدارة البوتات.