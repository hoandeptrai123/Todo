# Fix Lỗi Deploy Render: "cd: backend: No such file or directory"

## 🔴 Lỗi hiện tại:
```
bash: line 1: cd: backend: No such file or directory
```

## ✅ Cách Fix (Chọn 1 trong 2 cách):

---

## Cách 1: Set Root Directory = `backend` (Khuyến nghị)

### Bước 1: Vào Render Dashboard
1. Đăng nhập: https://render.com
2. Chọn Web Service của bạn (Todo)

### Bước 2: Vào Settings
- Click tab **"Settings"** (menu bên trái)

### Bước 3: Tìm phần "Build & Deploy"
Scroll xuống phần **"Build & Deploy"**

### Bước 4: Cập nhật cấu hình
Tìm các trường sau và sửa:

#### Root Directory:
```
backend
```

#### Build Command:
```
npm install
```
(Không cần `cd backend` vì Root Directory đã là `backend`)

#### Start Command:
```
npm start
```

### Bước 5: Save và Redeploy
- Click **"Save Changes"**
- Render sẽ tự động redeploy

---

## Cách 2: Không set Root Directory (Nếu Cách 1 không work)

### Bước 1: Vào Settings
- Click tab **"Settings"**

### Bước 2: Xóa Root Directory
- Để trống trường **"Root Directory"** (hoặc xóa nếu có)

### Bước 3: Cập nhật Build Command
#### Build Command:
```
cd backend && npm install
```

#### Start Command:
```
cd backend && npm start
```

### Bước 4: Save và Redeploy

---

## 📋 Checklist cấu hình đúng:

### Trong Render Settings → Build & Deploy:

**Option A (Khuyến nghị):**
- ✅ **Root Directory:** `backend`
- ✅ **Build Command:** `npm install`
- ✅ **Start Command:** `npm start`

**Option B:**
- ✅ **Root Directory:** (để trống)
- ✅ **Build Command:** `cd backend && npm install`
- ✅ **Start Command:** `cd backend && npm start`

---

## 🔍 Kiểm tra lại:

Sau khi save, vào tab **"Logs"** để xem quá trình build:

1. Build Command chạy thành công: `npm install` hoặc `cd backend && npm install`
2. Không còn lỗi "No such file or directory"
3. Start Command chạy: `npm start` hoặc `cd backend && npm start`
4. Server khởi động: `Server is running on port 5000`

---

## ⚠️ Lưu ý:

1. **Environment Variables** vẫn phải set đúng:
   - `JWT_SECRET`
   - `PORT=5000`
   - `NODE_ENV=production`

2. **Nếu vẫn lỗi**, kiểm tra:
   - Repository trên GitHub có đúng cấu trúc `backend/` không?
   - Branch đang deploy có đúng không? (thường là `main`)

3. **Sau khi fix**, đợi 2-3 phút để Render build và deploy xong.

---

## 🎯 Tóm tắt nhanh:

**Vào Render → Settings → Build & Deploy:**

1. **Root Directory:** `backend`
2. **Build Command:** `npm install`
3. **Start Command:** `npm start`
4. **Save Changes**

Xong! 🎉

