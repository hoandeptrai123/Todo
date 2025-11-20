# Hướng Dẫn Environment Variables

## Environment Variables là gì?

Environment Variables (Biến môi trường) là các giá trị cấu hình mà ứng dụng cần để chạy, nhưng **không được hardcode** trong code vì lý do bảo mật.

---

## 🔐 Các biến cần thiết cho Backend:

### 1. `JWT_SECRET`
- **Mục đích:** Secret key để mã hóa/giải mã JWT token
- **Tại sao cần:** Để bảo mật authentication
- **Giá trị:** Một chuỗi ngẫu nhiên, dài, phức tạp
- **Ví dụ:** `JWT_SECRET=my-super-secret-key-12345-abcdef-xyz`

### 2. `PORT`
- **Mục đích:** Port mà server sẽ chạy
- **Tại sao cần:** Render sẽ tự động set, nhưng code có fallback
- **Giá trị:** `PORT=5000` (hoặc để Render tự set)

### 3. `NODE_ENV`
- **Mục đích:** Môi trường chạy (development/production)
- **Tại sao cần:** Để code biết đang chạy ở môi trường nào
- **Giá trị:** `NODE_ENV=production`

### 4. `ALLOWED_ORIGINS` (tùy chọn, thêm sau)
- **Mục đích:** Danh sách domain frontend được phép kết nối
- **Tại sao cần:** Để CORS hoạt động đúng
- **Giá trị:** `ALLOWED_ORIGINS=https://your-frontend.vercel.app`

---

## 📝 Cách thêm vào Render:

### Bước 1: Vào Render Dashboard
1. Đăng nhập Render: https://render.com
2. Chọn Web Service của bạn (todo-backend)

### Bước 2: Vào phần Environment
1. Click vào tab **"Environment"** (ở menu bên trái)
2. Hoặc scroll xuống phần **"Environment Variables"**

### Bước 3: Thêm từng biến
Click **"Add Environment Variable"** và thêm:

#### Biến 1: JWT_SECRET
- **Key:** `JWT_SECRET`
- **Value:** `my-super-secret-key-12345-abcdef-xyz-2024` 
  (Bạn nên tạo một chuỗi ngẫu nhiên dài, không dùng giá trị mẫu này!)

**Cách tạo JWT_SECRET mạnh:**
```bash
# Trên Windows PowerShell:
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString()))
```

Hoặc dùng online generator: https://randomkeygen.com/

#### Biến 2: PORT
- **Key:** `PORT`
- **Value:** `5000`

#### Biến 3: NODE_ENV
- **Key:** `NODE_ENV`
- **Value:** `production`

### Bước 4: Save
Click **"Save Changes"** - Render sẽ tự động redeploy

---

## 🎯 Ví dụ cụ thể:

Khi bạn thêm vào Render, nó sẽ trông như thế này:

```
┌─────────────────────┬─────────────────────────────────────────────┐
│ Key                 │ Value                                        │
├─────────────────────┼─────────────────────────────────────────────┤
│ JWT_SECRET          │ a7f3b9c2d4e6f8a1b3c5d7e9f1a3b5c7d9e1f3a5b7 │
│ PORT                │ 5000                                         │
│ NODE_ENV            │ production                                   │
└─────────────────────┴─────────────────────────────────────────────┘
```

---

## ⚠️ Lưu ý quan trọng:

1. **JWT_SECRET phải mạnh:**
   - ❌ KHÔNG dùng: `secret`, `12345`, `my-secret`
   - ✅ NÊN dùng: Chuỗi dài ít nhất 32 ký tự, ngẫu nhiên

2. **Không commit vào Git:**
   - File `.env` đã có trong `.gitignore`
   - Chỉ thêm trên Render dashboard

3. **Giữ bí mật:**
   - Không chia sẻ JWT_SECRET
   - Nếu lộ, cần đổi ngay

---

## 🔄 Sau khi deploy Frontend:

Sau khi có URL frontend (ví dụ: `https://todo-app.vercel.app`), quay lại Render và thêm:

- **Key:** `ALLOWED_ORIGINS`
- **Value:** `https://todo-app.vercel.app`

Để CORS hoạt động đúng.

---

## 📸 Hình ảnh minh họa (mô tả):

Trong Render Dashboard:
```
┌─────────────────────────────────────────┐
│  todo-backend                            │
├─────────────────────────────────────────┤
│  [Overview] [Logs] [Environment] [...]  │
│                                          │
│  Environment Variables                   │
│  ┌───────────────────────────────────┐  │
│  │ Key          │ Value              │  │
│  ├──────────────┼────────────────────┤  │
│  │ JWT_SECRET   │ [your-secret-key]  │  │
│  │ PORT         │ 5000               │  │
│  │ NODE_ENV     │ production          │  │
│  └───────────────────────────────────┘  │
│                                          │
│  [+ Add Environment Variable]           │
└─────────────────────────────────────────┘
```

---

## ✅ Checklist:

- [ ] Đã tạo JWT_SECRET mạnh (32+ ký tự)
- [ ] Đã thêm JWT_SECRET vào Render
- [ ] Đã thêm PORT = 5000
- [ ] Đã thêm NODE_ENV = production
- [ ] Đã save changes
- [ ] Render đã redeploy thành công

