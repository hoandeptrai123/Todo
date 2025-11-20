# Sửa Environment Variables

## 🔴 Vấn đề phát hiện:

### 1. ALLOWED_ORIGINS trên Render có dấu `/` thừa
- ❌ **Hiện tại:** `https://todo-frontend-beta-six.vercel.app/`
- ✅ **Nên sửa thành:** `https://todo-frontend-beta-six.vercel.app`

### 2. REACT_APP_API_URL trên Vercel cần kiểm tra
- ✅ **Phải là:** `https://todo-86d0.onrender.com/api`
- ❌ **Không được:** `https://todo-86d0.onrender.com/` (thiếu `/api`)
- ❌ **Không được:** `https://todo-86d0.onrender.com/api/` (có `/` thừa)

---

## ✅ Cách sửa:

### Bước 1: Sửa ALLOWED_ORIGINS trên Render

1. Vào Render Dashboard: https://render.com
2. Chọn Web Service "Todo"
3. Vào tab **Environment**
4. Tìm biến `ALLOWED_ORIGINS`
5. Click nút **"Edit"** (góc trên bên phải của bảng)
6. Sửa giá trị:
   - **Xóa dấu `/` ở cuối**
   - Từ: `https://todo-frontend-beta-six.vercel.app/`
   - Thành: `https://todo-frontend-beta-six.vercel.app`
7. Click **"Save Changes"**
8. Render sẽ tự động redeploy (đợi 2-3 phút)

---

### Bước 2: Kiểm tra REACT_APP_API_URL trên Vercel

1. Vào Vercel Dashboard: https://vercel.com
2. Chọn project "todo-frontend"
3. Vào **Settings** → **Environment Variables**
4. Tìm biến `REACT_APP_API_URL`
5. Click vào 3 chấm (⋮) bên cạnh biến
6. Chọn **"Edit"**
7. Kiểm tra giá trị:
   - ✅ **Đúng:** `https://todo-86d0.onrender.com/api`
   - ❌ **Sai:** `https://todo-86d0.onrender.com` (thiếu `/api`)
   - ❌ **Sai:** `https://todo-86d0.onrender.com/api/` (có `/` thừa)
8. Nếu sai, sửa thành: `https://todo-86d0.onrender.com/api`
9. Click **"Save"**
10. **Redeploy** frontend:
    - Vào tab **Deployments**
    - Click **"..."** trên deployment mới nhất
    - Chọn **"Redeploy"**

---

## 📋 Checklist sau khi sửa:

- [ ] `ALLOWED_ORIGINS` trên Render = `https://todo-frontend-beta-six.vercel.app` (không có `/` ở cuối)
- [ ] `REACT_APP_API_URL` trên Vercel = `https://todo-86d0.onrender.com/api` (có `/api`, không có `/` thừa)
- [ ] Render đã redeploy xong (kiểm tra tab Logs)
- [ ] Vercel đã redeploy xong (kiểm tra tab Deployments)
- [ ] Đã clear cache browser hoặc dùng Incognito
- [ ] Đã test lại đăng ký/đăng nhập

---

## ⚠️ Lưu ý quan trọng:

1. **URL format:**
   - Frontend URL: `https://domain.com` (không có `/` ở cuối)
   - Backend API URL: `https://domain.com/api` (có `/api`, không có `/` thừa)

2. **Sau khi sửa:**
   - Phải đợi cả 2 platform redeploy xong
   - Clear cache browser hoặc dùng Incognito mode
   - Test lại

3. **Kiểm tra logs:**
   - Render Logs: Xem có lỗi CORS không
   - Browser Console (F12): Xem có lỗi network không
   - Network Tab: Xem request có thành công không

---

## 🎯 Sau khi sửa xong:

1. Đợi 2-3 phút để cả 2 deploy xong
2. Mở frontend trên Incognito mode
3. Thử đăng ký lại
4. Nếu vẫn lỗi, mở Developer Tools (F12) → Network tab để xem lỗi cụ thể

