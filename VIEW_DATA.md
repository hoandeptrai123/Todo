# Cách Xem Dữ Liệu Đã Đăng Ký

Sau khi đăng ký thành công, dữ liệu được lưu trong database SQLite trên Render. Dưới đây là các cách xem:

---

## 🔍 Cách 1: Dùng Render Shell (Khuyến nghị)

### Bước 1: Vào Render Shell
1. Vào Render Dashboard: https://render.com
2. Chọn Web Service "Todo" (backend)
3. Click tab **"Shell"** (menu bên trái)

### Bước 2: Chạy script xem database
Trong Shell, chạy các lệnh sau:

```bash
cd backend
node view-database.js
```

Hoặc nếu đã ở trong thư mục backend:
```bash
node view-database.js
```

### Kết quả:
Bạn sẽ thấy:
- Danh sách users (ID, username, email, ngày tạo)
- Danh sách todos (nếu có)

---

## 🔍 Cách 2: Dùng SQLite Command Line trong Render Shell

### Bước 1: Vào Render Shell
1. Render Dashboard → Web Service "Todo" → tab **"Shell"**

### Bước 2: Chạy SQLite
```bash
cd backend
sqlite3 database.sqlite
```

### Bước 3: Xem dữ liệu
```sql
-- Xem tất cả users
SELECT id, username, email, created_at FROM users;

-- Xem tất cả todos
SELECT * FROM todos;

-- Xem users kèm số lượng todos
SELECT u.id, u.username, u.email, COUNT(t.id) as todo_count 
FROM users u 
LEFT JOIN todos t ON u.id = t.user_id 
GROUP BY u.id;

-- Thoát
.quit
```

---

## 🔍 Cách 3: Tạo API Endpoint để xem (Chỉ cho Development)

⚠️ **Cảnh báo:** Chỉ dùng cho development, không nên dùng trong production!

### Thêm route vào backend:

File: `backend/routes/admin.js` (tạo mới)
```javascript
const express = require('express');
const db = require('../database');
const router = express.Router();

// Xem tất cả users (CHỈ CHO DEVELOPMENT!)
router.get('/users', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Not allowed in production' });
  }
  
  db.all('SELECT id, username, email, created_at FROM users', [], (err, users) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(users);
  });
});

// Xem tất cả todos
router.get('/todos', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Not allowed in production' });
  }
  
  db.all(`
    SELECT t.*, u.username, u.email 
    FROM todos t 
    LEFT JOIN users u ON t.user_id = u.id 
    ORDER BY t.created_at DESC
  `, [], (err, todos) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(todos);
  });
});

module.exports = router;
```

Thêm vào `backend/server.js`:
```javascript
// Thêm sau các routes khác
if (process.env.NODE_ENV !== 'production') {
  app.use('/api/admin', require('./routes/admin'));
}
```

Sau đó truy cập:
- `https://todo-86d0.onrender.com/api/admin/users`
- `https://todo-86d0.onrender.com/api/admin/todos`

---

## 🔍 Cách 4: Download Database File (Nếu có thể)

### Bước 1: Vào Render Shell
1. Render Dashboard → Web Service "Todo" → tab **"Shell"**

### Bước 2: Copy database file
```bash
cd backend
cat database.sqlite > /tmp/database.sqlite
```

Sau đó có thể download qua Render dashboard hoặc dùng scp.

### Bước 3: Mở bằng DB Browser for SQLite
1. Tải DB Browser: https://sqlitebrowser.org/
2. Mở file `database.sqlite`
3. Xem dữ liệu trong tab "Browse Data"

---

## 📊 Cách 5: Xem qua Logs (Nếu có log queries)

Nếu bạn đã thêm logging vào code, có thể xem trong Render Logs.

---

## ✅ Cách nhanh nhất (Khuyến nghị):

**Dùng Render Shell với script đã có:**

1. Render Dashboard → Web Service "Todo" → **Shell**
2. Chạy:
   ```bash
   cd backend
   node view-database.js
   ```

Bạn sẽ thấy output như:
```
=== DATABASE CONTENT ===

📋 USERS TABLE:
────────────────────────────────────────────────────────────────────────────────

User 1:
  ID: 1
  Username: hoannd05
  Email: nhoan8035@gmail.com
  Created: 2025-11-21 02:30:15

────────────────────────────────────────────────────────────────────────────────

📝 TODOS TABLE:
────────────────────────────────────────────────────────────────────────────────
...
```

---

## 🎯 Tóm tắt:

| Cách | Độ khó | Khuyến nghị |
|------|--------|-------------|
| Render Shell + view-database.js | ⭐ Dễ | ✅ Khuyến nghị |
| Render Shell + SQLite CLI | ⭐⭐ Trung bình | ✅ OK |
| API Endpoint | ⭐⭐⭐ Khó | ⚠️ Chỉ dev |
| Download DB file | ⭐⭐⭐ Khó | ❌ Phức tạp |

**→ Dùng Cách 1 (Render Shell + view-database.js) là đơn giản nhất!**

