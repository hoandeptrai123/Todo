# Các Platform Miễn Phí Để Deploy Backend

Railway hiện tại có thể yêu cầu trả phí. Dưới đây là các lựa chọn **MIỄN PHÍ** khác:

---

## 🆓 Option 1: Render (Khuyến nghị - Miễn phí)

### Ưu điểm:
- ✅ **Hoàn toàn miễn phí** cho Web Services
- ✅ Tự động deploy từ GitHub
- ✅ PostgreSQL miễn phí (hoặc dùng SQLite)
- ✅ SSL/HTTPS tự động
- ✅ Dễ sử dụng

### Cách deploy:

1. **Đăng ký:** https://render.com (dùng GitHub)
2. **Tạo Web Service:**
   - New → Web Service
   - Connect GitHub repository
   - Chọn repo `todo-app`
3. **Cấu hình:**
   - **Name:** `todo-backend` (hoặc tên bạn muốn)
   - **Environment:** Node
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Root Directory:** `backend` (quan trọng!)
4. **Environment Variables:**
   ```
   JWT_SECRET=your-secret-key-here
   PORT=5000
   NODE_ENV=production
   ```
5. **Deploy!**
   - Render sẽ cung cấp URL: `https://todo-backend.onrender.com`
   - **Lưu ý:** Free tier có thể sleep sau 15 phút không dùng, lần đầu truy cập sẽ mất ~30s để wake up

---

## 🆓 Option 2: Fly.io (Miễn phí - 3 VMs)

### Ưu điểm:
- ✅ 3 VMs miễn phí
- ✅ Không bị sleep
- ✅ Nhanh hơn Render

### Cách deploy:

1. **Cài đặt Fly CLI:**
   ```bash
   # Windows (PowerShell)
   iwr https://fly.io/install.ps1 -useb | iex
   ```

2. **Đăng ký:** https://fly.io (dùng GitHub)

3. **Login:**
   ```bash
   fly auth login
   ```

4. **Tạo app:**
   ```bash
   cd C:\Users\hoann\Todo\backend
   fly launch
   ```
   - Chọn region gần bạn
   - Không tạo Postgres (dùng SQLite)

5. **Tạo file `fly.toml`** (Fly sẽ tự tạo, nhưng kiểm tra):
   ```toml
   app = "todo-backend"
   primary_region = "sin"  # hoặc region gần bạn

   [build]

   [http_service]
     internal_port = 5000
     force_https = true
     auto_stop_machines = false
     auto_start_machines = true
     min_machines_running = 1

   [[vm]]
     memory_mb = 256
   ```

6. **Set secrets:**
   ```bash
   fly secrets set JWT_SECRET=your-secret-key
   fly secrets set NODE_ENV=production
   ```

7. **Deploy:**
   ```bash
   fly deploy
   ```

8. **Lấy URL:**
   ```bash
   fly info
   ```

---

## 🆓 Option 3: Cyclic.sh (Miễn phí)

### Ưu điểm:
- ✅ Hoàn toàn miễn phí
- ✅ Tự động deploy từ GitHub
- ✅ Không bị sleep

### Cách deploy:

1. **Đăng ký:** https://cyclic.sh (dùng GitHub)
2. **Deploy từ GitHub:**
   - Click "Deploy Now"
   - Chọn repository
   - Chọn thư mục `backend`
3. **Environment Variables:**
   - Thêm trong dashboard
4. **Done!**

---

## 🆓 Option 4: Koyeb (Miễn phí)

### Ưu điểm:
- ✅ Free tier với 2 services
- ✅ Tự động deploy từ GitHub
- ✅ Không bị sleep

### Cách deploy:

1. **Đăng ký:** https://www.koyeb.com (dùng GitHub)
2. **Create App:**
   - Connect GitHub
   - Chọn repo và thư mục `backend`
3. **Environment Variables:**
   - Thêm trong settings
4. **Deploy!**

---

## 🆓 Option 5: Replit (Miễn phí - Dễ nhất)

### Ưu điểm:
- ✅ Rất dễ sử dụng
- ✅ Có editor online
- ✅ Miễn phí

### Cách deploy:

1. **Đăng ký:** https://replit.com
2. **Import từ GitHub:**
   - New Repl → Import from GitHub
   - Chọn repository
3. **Chọn thư mục backend**
4. **Set Environment Variables**
5. **Run!**

---

## 🆓 Option 6: Glitch (Miễn phí)

### Ưu điểm:
- ✅ Miễn phí
- ✅ Dễ sử dụng
- ✅ Có editor online

### Cách deploy:

1. **Đăng ký:** https://glitch.com
2. **New Project → Import from GitHub**
3. **Chọn repository và thư mục backend**
4. **Set Environment Variables**
5. **Deploy!**

---

## 📊 So sánh nhanh:

| Platform | Free Tier | Sleep? | Tốc độ | Dễ dùng |
|----------|-----------|--------|--------|---------|
| **Render** | ✅ Có | ⚠️ Có (15 phút) | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Fly.io** | ✅ 3 VMs | ❌ Không | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Cyclic** | ✅ Có | ❌ Không | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Koyeb** | ✅ 2 services | ❌ Không | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Replit** | ✅ Có | ⚠️ Có | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Glitch** | ✅ Có | ⚠️ Có | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🎯 Khuyến nghị:

1. **Render** - Nếu không ngại sleep (dễ nhất)
2. **Fly.io** - Nếu muốn không bị sleep (cần CLI)
3. **Cyclic** - Cân bằng tốt

---

## ⚙️ Cập nhật code cho các platform

### Cho Render/Koyeb/Cyclic:
Không cần thay đổi gì, chỉ cần:
- Set Root Directory: `backend`
- Set Build Command: `cd backend && npm install` (hoặc `npm install` nếu root là backend)
- Set Start Command: `cd backend && npm start` (hoặc `npm start`)

### Cho Fly.io:
Cần file `fly.toml` (xem ở trên)

---

## 🔄 Sau khi deploy backend:

1. **Lấy Backend URL** (ví dụ: `https://todo-backend.onrender.com`)
2. **Deploy Frontend lên Vercel** (vẫn miễn phí)
3. **Set REACT_APP_API_URL** = backend URL
4. **Cập nhật CORS** trên backend với frontend URL

---

## 💡 Lưu ý về "Sleep":

- **Render, Replit, Glitch:** Có thể sleep sau 15 phút không dùng
  - Lần đầu truy cập sau khi sleep sẽ mất ~30s để wake up
  - Không ảnh hưởng nhiều nếu app có người dùng thường xuyên

- **Fly.io, Cyclic, Koyeb:** Không bị sleep
  - Luôn sẵn sàng, nhưng có thể có giới hạn khác

---

## 🚀 Quick Start với Render (Khuyến nghị):

1. Đăng ký Render: https://render.com
2. New → Web Service
3. Connect GitHub → Chọn repo
4. Settings:
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
5. Environment Variables:
   ```
   JWT_SECRET=your-secret-key
   PORT=5000
   NODE_ENV=production
   ```
6. Deploy!
7. Copy URL và dùng cho frontend

