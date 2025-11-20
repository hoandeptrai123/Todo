# Troubleshooting: Registration Failed

## 🔴 Vấn đề: "Registration failed" khi đăng ký

## ✅ Các bước kiểm tra và sửa:

---

### Bước 1: Kiểm tra Environment Variables trên Vercel

1. Vào Vercel Dashboard: https://vercel.com
2. Chọn project frontend của bạn
3. Vào **Settings** → **Environment Variables**
4. Kiểm tra xem có biến `REACT_APP_API_URL` chưa:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://todo-86d0.onrender.com/api` (URL backend của bạn)
   
5. Nếu chưa có, thêm mới:
   - Click **"Add New"**
   - Key: `REACT_APP_API_URL`
   - Value: `https://todo-86d0.onrender.com/api`
   - Environment: Chọn **Production**, **Preview**, và **Development**
   - Click **Save**

6. **Redeploy** frontend:
   - Vào tab **Deployments**
   - Click **"..."** trên deployment mới nhất
   - Chọn **"Redeploy"**

---

### Bước 2: Kiểm tra CORS trên Render

1. Vào Render Dashboard: https://render.com
2. Chọn Web Service "Todo" (backend)
3. Vào tab **Environment**
4. Kiểm tra xem có biến `ALLOWED_ORIGINS` chưa:
   - **Key:** `ALLOWED_ORIGINS`
   - **Value:** URL frontend từ Vercel (ví dụ: `https://todo-frontend.vercel.app`)

5. Nếu chưa có, thêm mới:
   - Click **"Add Environment Variable"**
   - Key: `ALLOWED_ORIGINS`
   - Value: URL frontend của bạn (lấy từ Vercel)
   - Click **Save Changes**
   - Render sẽ tự động redeploy

---

### Bước 3: Kiểm tra Network Tab trong Browser

1. Mở frontend trên browser
2. Mở **Developer Tools** (F12)
3. Vào tab **Network**
4. Thử đăng ký lại
5. Xem request đến `/api/auth/register`:
   - Nếu thấy lỗi **CORS**: Cần thêm `ALLOWED_ORIGINS` trên Render
   - Nếu thấy lỗi **404**: `REACT_APP_API_URL` chưa đúng
   - Nếu thấy lỗi **500**: Lỗi từ backend, xem logs trên Render

---

### Bước 4: Kiểm tra Logs trên Render

1. Vào Render Dashboard
2. Chọn Web Service "Todo"
3. Vào tab **Logs**
4. Xem có lỗi gì không:
   - Nếu thấy "Not allowed by CORS": Cần thêm `ALLOWED_ORIGINS`
   - Nếu thấy lỗi database: Kiểm tra database connection
   - Nếu thấy lỗi khác: Ghi lại và tìm giải pháp

---

## 📋 Checklist:

- [ ] `REACT_APP_API_URL` đã được set trên Vercel = `https://todo-86d0.onrender.com/api`
- [ ] Frontend đã được redeploy sau khi thêm environment variable
- [ ] `ALLOWED_ORIGINS` đã được set trên Render = URL frontend từ Vercel
- [ ] Backend đã được redeploy sau khi thêm `ALLOWED_ORIGINS`
- [ ] Đã kiểm tra Network tab để xem lỗi cụ thể
- [ ] Đã kiểm tra Logs trên Render

---

## 🔍 Cách lấy URL Frontend từ Vercel:

1. Vào Vercel Dashboard
2. Chọn project frontend
3. Ở trang Overview, bạn sẽ thấy URL:
   - Ví dụ: `https://todo-frontend.vercel.app`
4. Copy URL này và thêm vào `ALLOWED_ORIGINS` trên Render

---

## ⚠️ Lưu ý quan trọng:

1. **URL phải đúng format:**
   - ✅ Đúng: `https://todo-frontend.vercel.app`
   - ❌ Sai: `https://todo-frontend.vercel.app/` (có dấu / ở cuối)
   - ❌ Sai: `http://todo-frontend.vercel.app` (thiếu s)

2. **Sau khi thêm environment variables:**
   - Phải **redeploy** cả frontend và backend
   - Đợi 2-3 phút để deploy xong

3. **Test lại:**
   - Clear cache browser (Ctrl+Shift+Delete)
   - Hoặc dùng Incognito mode
   - Thử đăng ký lại

---

## 🐛 Các lỗi thường gặp:

### Lỗi 1: "Network Error" hoặc "Failed to fetch"
- **Nguyên nhân:** `REACT_APP_API_URL` chưa đúng hoặc backend chưa chạy
- **Giải pháp:** Kiểm tra `REACT_APP_API_URL` trên Vercel

### Lỗi 2: "CORS policy" trong console
- **Nguyên nhân:** `ALLOWED_ORIGINS` chưa được set trên Render
- **Giải pháp:** Thêm `ALLOWED_ORIGINS` với URL frontend

### Lỗi 3: "404 Not Found"
- **Nguyên nhân:** `REACT_APP_API_URL` thiếu `/api` ở cuối
- **Giải pháp:** Đảm bảo URL là `https://todo-86d0.onrender.com/api`

### Lỗi 4: "500 Internal Server Error"
- **Nguyên nhân:** Lỗi từ backend
- **Giải pháp:** Xem logs trên Render để biết lỗi cụ thể

