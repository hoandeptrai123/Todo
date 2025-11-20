# Hướng Dẫn Deploy Todo App

## Tổng quan

Ứng dụng có thể deploy lên nhiều platform khác nhau. Dưới đây là các cách phổ biến:

---

## 🚀 Option 1: Deploy miễn phí (Khuyến nghị cho bắt đầu)

### Frontend: Vercel hoặc Netlify
### Backend: Railway, Render, hoặc Fly.io

---

## 📦 Option 2: Deploy Backend lên Railway (Miễn phí)

### Bước 1: Chuẩn bị
1. Đăng ký tài khoản tại https://railway.app (dùng GitHub)
2. Cài đặt Railway CLI (tùy chọn)

### Bước 2: Tạo project trên Railway
1. Tạo project mới
2. Chọn "Deploy from GitHub repo" hoặc "Empty Project"
3. Nếu dùng GitHub:
   - Connect repository
   - Railway sẽ tự động detect và deploy

### Bước 3: Cấu hình Environment Variables
Trong Railway dashboard, thêm các biến môi trường:
```
JWT_SECRET=your-very-secret-key-change-this
PORT=5000
NODE_ENV=production
```

### Bước 4: Cấu hình Database
- Railway có PostgreSQL miễn phí
- Hoặc tiếp tục dùng SQLite (file-based, dễ hơn)

### Bước 5: Lấy URL backend
- Railway sẽ cung cấp URL như: `https://your-app.railway.app`
- Copy URL này để cấu hình frontend

---

## 🌐 Option 3: Deploy Frontend lên Vercel (Miễn phí)

### Bước 1: Chuẩn bị
1. Đăng ký tại https://vercel.com (dùng GitHub)
2. Cài đặt Vercel CLI (tùy chọn): `npm i -g vercel`

### Bước 2: Cấu hình Environment Variables
Tạo file `.env.production` trong frontend:
```
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

### Bước 3: Deploy
**Cách 1: Qua Vercel Dashboard**
1. Import project từ GitHub
2. Vercel tự động detect React app
3. Thêm environment variable: `REACT_APP_API_URL`
4. Deploy!

**Cách 2: Qua CLI**
```bash
cd frontend
npm i -g vercel
vercel
```

### Bước 4: Cập nhật API URL
Sau khi deploy, cập nhật `REACT_APP_API_URL` trong Vercel dashboard trỏ đến backend URL.

---

## 🗄️ Option 4: Deploy Backend lên Render (Miễn phí)

### Bước 1: Đăng ký tại https://render.com

### Bước 2: Tạo Web Service
1. New → Web Service
2. Connect GitHub repository
3. Chọn thư mục `backend`
4. Build command: `npm install`
5. Start command: `npm start`

### Bước 3: Environment Variables
```
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=production
```

### Bước 4: Database (Optional)
- Render có PostgreSQL miễn phí
- Hoặc dùng SQLite (file-based)

---

## 🔧 Cần chỉnh sửa code trước khi deploy

### 1. Cập nhật CORS trong backend

File: `backend/server.js`
```javascript
// Thay đổi từ:
app.use(cors());

// Thành:
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-domain.vercel.app'
  ],
  credentials: true
}));
```

### 2. Cập nhật API URL trong frontend

File: `frontend/src/context/AuthContext.js`
```javascript
// Đảm bảo sử dụng environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### 3. Database cho production

Nếu muốn dùng PostgreSQL thay vì SQLite (khuyến nghị cho production):

**Cài thêm package:**
```bash
cd backend
npm install pg
```

**Tạo file `backend/database-pg.js`:**
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Tạo tables
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

pool.query(`
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    completed INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

module.exports = pool;
```

---

## 📝 Checklist trước khi deploy

- [ ] Cập nhật CORS để cho phép frontend domain
- [ ] Thêm environment variables (JWT_SECRET, API_URL)
- [ ] Test API endpoints
- [ ] Đảm bảo database hoạt động
- [ ] Kiểm tra logs khi deploy
- [ ] Test đăng ký/đăng nhập sau khi deploy

---

## 🆓 Platform miễn phí khác

### Backend:
- **Fly.io** - 3 VMs miễn phí
- **Heroku** - Có thể dùng (có giới hạn)
- **DigitalOcean App Platform** - Có free tier

### Frontend:
- **Netlify** - Tương tự Vercel
- **GitHub Pages** - Miễn phí (cần build static)

---

## 🔒 Bảo mật khi deploy

1. **JWT_SECRET**: Dùng secret key mạnh, không commit vào Git
2. **HTTPS**: Đảm bảo cả frontend và backend dùng HTTPS
3. **Environment Variables**: Không hardcode trong code
4. **CORS**: Chỉ cho phép domain frontend của bạn

---

## 🐛 Troubleshooting

### Backend không chạy
- Kiểm tra logs trên platform
- Đảm bảo PORT được set đúng
- Kiểm tra environment variables

### Frontend không kết nối được backend
- Kiểm tra CORS settings
- Đảm bảo REACT_APP_API_URL đúng
- Kiểm tra network tab trong browser console

### Database errors
- Đảm bảo database đã được tạo
- Kiểm tra connection string
- Xem logs để biết lỗi cụ thể

---

## 📚 Tài liệu tham khảo

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs


