import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // ضروري لمعالجة multipart/form-data
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uploadDir = "/tmp/uploads";
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
  } catch {}

  const form = formidable({
    multiples: true,
    uploadDir,
    keepExtensions: true,
    maxFileSize: 50 * 1024 * 1024, // 50MB
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Parse error", detail: err.message });
    }

    // normalize to array
    const arr = Array.isArray(files.files) ? files.files : [files.files].filter(Boolean);

    const payload = arr.map(f => ({
      originalFilename: f.originalFilename,
      mimetype: f.mimetype,
      size: f.size,
      savedTo: path.basename(f.filepath), // اسم الملف المحفوظ داخل /tmp/uploads
    }));

    // ملاحظة: /tmp مؤقتة وتُحذف بعد انتهاء الدالة.
    // هنا مكان مناسب لرفع الملفات لخدمة تخزين خارجية (S3, R2, etc.)
    return res.status(200).json({ ok: true, files: payload });
  });
}