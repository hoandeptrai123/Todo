# Hướng Dẫn Push Code Lên GitHub và Deploy

## 📋 Quy trình đúng:

1. ✅ Push code lên GitHub
2. ✅ Deploy Backend lên Railway (connect GitHub repo)
3. ✅ Deploy Frontend lên Vercel (connect GitHub repo)

---

## 🚀 Bước 1: Khởi tạo Git và Push lên GitHub

### 1.1. Khởi tạo Git repository

```bash
cd C:\Users\hoann\Todo
git init
```

### 1.2. Thêm tất cả files

```bash
git add .
```

### 1.3. Commit lần đầu

```bash
git commit -m "Initial commit: Todo App with React and Node.js"
```

### 1.4. Tạo repository trên GitHub

1. Đăng nhập GitHub: https://github.com
2. Click **"New repository"** (hoặc dấu + ở góc trên)
3. Đặt tên: `todo-app` (hoặc tên bạn muốn)
4. **KHÔNG** tích "Initialize with README" (vì đã có code rồi)
5. Click **"Create repository"**

### 1.5. Kết nối và push code

GitHub sẽ hiển thị hướng dẫn, nhưng đây là lệnh:

```bash
# Thay YOUR_USERNAME và REPO_NAME bằng thông tin của bạn
git remote add origin https://github.com/YOUR_USERNAME/todo-app.git
git branch -M main
git push -u origin main
```

**Ví dụ:**
```bash
git remote add origin https://github.com/hoann/todo-app.git
git branch -M main
git push -u origin main
```

---

## 🚂 Bước 2: Deploy Backend lên Railway

### 2.1. Đăng ký Railway
1. Truy cập: https://railway.app
2. Click **"Login"** → Chọn **"Login with GitHub"**
3. Authorize Railway truy cập GitHub

### 2.2. Tạo Project mới
1. Click **"New Project"**
2. Chọn **"Deploy from GitHub repo"**
3. Chọn repository `todo-app` vừa push
4. Railway sẽ tự động detect Node.js project

### 2.3. Cấu hình
1. Railway sẽ tự động detect thư mục `backend`
2. Nếu không, vào **Settings** → **Root Directory** → chọn `backend`

### 2.4. Thêm Environment Variables
Vào **Variables** tab, thêm:

```
JWT_SECRET=your-very-secret-key-change-this-in-production-12345
PORT=5000
NODE_ENV=production
```

**Lưu ý:** Đợi deploy xong để lấy URL backend trước khi thêm `ALLOWED_ORIGINS`

### 2.5. Lấy Backend URL
- Sau khi deploy xong, Railway sẽ cung cấp URL
- Ví dụ: `https://todo-app-production.up.railway.app`
- Copy URL này để dùng cho frontend

### 2.6. Cập nhật CORS (sau khi có frontend URL)
Thêm biến môi trường:
```
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

---

## 🌐 Bước 3: Deploy Frontend lên Vercel

### 3.1. Đăng ký Vercel
1. Truy cập: https://vercel.com
2. Click **"Sign Up"** → Chọn **"Continue with GitHub"**
3. Authorize Vercel

### 3.2. Import Project
1. Click **"Add New..."** → **"Project"**
2. Chọn repository `todo-app` từ GitHub
3. Vercel sẽ tự động detect React app

### 3.3. Cấu hình Build
- **Framework Preset:** Create React App (tự động detect)
- **Root Directory:** `frontend` (chọn hoặc để trống nếu repo chỉ có frontend)
- **Build Command:** `npm run build` (tự động)
- **Output Directory:** `build` (tự động)

### 3.4. Thêm Environment Variable
Trong **Environment Variables**, thêm:

```
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

**Lưu ý:** Thay `your-backend-url.railway.app` bằng URL backend thực tế từ Railway

### 3.5. Deploy
1. Click **"Deploy"**
2. Đợi build và deploy (2-3 phút)
3. Vercel sẽ cung cấp URL: `https://todo-app.vercel.app`

### 3.6. Cập nhật CORS trên Railway
Quay lại Railway, cập nhật biến môi trường:
```
ALLOWED_ORIGINS=https://todo-app.vercel.app
```
Railway sẽ tự động redeploy.

---

## ✅ Checklist

- [ ] Code đã push lên GitHub
- [ ] Backend đã deploy trên Railway
- [ ] Environment variables backend đã set
- [ ] Backend URL đã có
- [ ] Frontend đã deploy trên Vercel
- [ ] REACT_APP_API_URL đã set với backend URL
- [ ] ALLOWED_ORIGINS trên Railway đã set với frontend URL
- [ ] Test đăng ký/đăng nhập hoạt động

---

## 🔄 Cập nhật code sau này

Mỗi khi bạn thay đổi code:

1. **Commit và push lên GitHub:**
```bash
git add .
git commit -m "Mô tả thay đổi"
git push
```

2. **Railway và Vercel sẽ tự động deploy lại** (nếu đã bật auto-deploy)

---

## 🐛 Troubleshooting

### Backend không chạy trên Railway
- Kiểm tra logs trong Railway dashboard
- Đảm bảo PORT và JWT_SECRET đã set
- Kiểm tra Root Directory đúng là `backend`

### Frontend không kết nối được backend
- Kiểm tra REACT_APP_API_URL đúng chưa
- Kiểm tra CORS trên Railway (ALLOWED_ORIGINS)
- Xem Network tab trong browser console

### Database không hoạt động
- SQLite sẽ hoạt động trên Railway
- Nếu có vấn đề, có thể cần chuyển sang PostgreSQL

---

## 📝 Lưu ý quan trọng

1. **Không commit file `.env`** - đã có trong .gitignore
2. **JWT_SECRET phải mạnh** - dùng random string dài
3. **HTTPS bắt buộc** - cả frontend và backend phải dùng HTTPS
4. **Environment variables** - phải set trên mỗi platform

