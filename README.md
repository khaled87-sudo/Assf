# Teekafit

مشروع تطبيق للياقة البدنية والتغذية (Teekafit) — تمت استعادة هذا المحتوى من نسخة احتياطية تم سحبها من Manus بعد حذف المشروع السابق بالخطأ.

## المحتوى

### `teekafit-app/`
**كود المشروع الفعلي** (Full-stack TypeScript: React 19 + Vite + Tailwind + shadcn/ui من جهة العميل، Express + tRPC + Drizzle ORM (MySQL) من جهة السيرفر، مصادقة عبر Manus OAuth). هذا هو الأساس التقني الحقيقي للتطبيق.

⚠️ **مهم:** هذا حاليًا **مجرد سكافولد/قالب فارغ** من Manus (قالب "Web App (db,user)")، وليس تطبيقًا مبنيًا فعليًا:
- `client/src/pages/Home.tsx` لسا صفحة مثال ("Example Page") — ما فيه أي شاشة من شاشات Teekafit (Dashboard، Workout Builder، Nutrition Tracker، ...).
- `drizzle/schema.ts` فيه فقط جدول `users` الأساسي للمصادقة — بدون جداول التمارين/الوجبات/الأهداف/الـ streak.
- `server/routers.ts` فيه فقط `auth` — بدون أي راوترات لميزات فعلية.
- `todo.md` يوثّق الخطة الكاملة، لكن معظم بنودها غير منجزة بعد (فقط "التخطيط الأساسي" ✅).

راجع [`teekafit-app/todo.md`](teekafit-app/todo.md) للخطة الكاملة و[`teekafit-app/package.json`](teekafit-app/package.json) للتشغيل (`pnpm install` ثم `pnpm dev`، ويحتاج `DATABASE_URL` وباقي متغيرات البيئة الخاصة بـ Manus OAuth).

### `docs/`
مستندات بحثية ومقترحات تخص تسمية المشروع وهوية العلامة التجارية وتجربة المستخدم:

- **مقترحات تسمية مشروع اللياقة والتغذية العالمي.md** — مقترحات أولية لاسم المشروع.
- **مقترحات أسماء رياضية رنانة (Global & Punchy).md** — أسماء بديلة ذات طابع عالمي وقوي.
- **تحليل اسم "Teeka" لتطبيق اللياقة والتغذية.md** — تحليل تفصيلي لاسم "Teeka" المُختار.
- **ابتكارات تجربة المستخدم (UX) لواجهة الترحيب في تطبيق Teekafit.md** — أفكار لتصميم شاشة الترحيب (Onboarding/Splash).

### `assets/branding/`
أصول تصميمية (شعارات، شاشات ترحيب، خطوط) لعلامة Teekafit التجارية:

- `teekafit_logo_1.png` … `teekafit_logo_3.png` — تصاميم شعار.
- `tt_logo_1.png` … `tt_logo_4.png` — تصاميم شعار مختصرة (TT).
- `teekafit_splash_1.png`, `teekafit_splash_2.png` — تصاميم شاشة البداية (Splash Screen).
- `teekafit_font_1.png` … `teekafit_font_3.png` — عيّنات خطوط مقترحة.
- `teekafit_logo_modified_1.png`, `teekafit_logo_modified_2.png` — نسخ معدّلة من الشعار.
- `IMG_0225.JPG` — صورة مرجعية إضافية.

### `components/`
مكوّن كود واحد (React + Tailwind) لشاشة البداية (Splash Screen)، وصل من مانوس قبل الحصول على السكافولد الكامل:

- **TeekafitSplashScreen.jsx** — مكوّن واجهة لعرض شعار Teekafit مع تأثيرات حركية بسيطة. لم يُدمج بعد داخل `teekafit-app/` (يستخدم Tailwind classes مباشرة بدون بنية shadcn/ui المستخدمة في السكافولد).

## ملاحظة

عندنا الآن سكافولد تقني حقيقي (`teekafit-app/`) بالإضافة إلى المستندات البحثية والأصول التصميمية، لكن لا توجد بعد أي شاشة أو ميزة من ميزات Teekafit الفعلية مبنية داخل الكود — الخطوة التالية هي تنفيذ بنود `todo.md` (قاعدة البيانات، شاشة الترحيب، المصادقة، الداشبورد، جدول التمارين، متتبع التغذية، مكتبة التمارين).
