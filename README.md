# Todo App - Full Stack Web Application

Ứng dụng Todo đầy đủ với Authentication, được xây dựng bằng React (Frontend) và Node.js/Express (Backend).

## Tính năng

- ✅ Đăng ký và Đăng nhập người dùng
- ✅ Tạo, đọc, cập nhật, xóa (CRUD) todos
- ✅ Đánh dấu todo hoàn thành
- ✅ Giao diện đẹp với Tailwind CSS
- ✅ Bảo mật với JWT Authentication
- ✅ Database SQLite

## Công nghệ sử dụng

### Backend
- Node.js + Express
- SQLite Database
- JWT Authentication
- bcryptjs (mã hóa mật khẩu)

### Frontend
- React
- React Router
- Tailwind CSS
- Axios

## Cài đặt và Chạy

### 1. Cài đặt Backend

```bash
cd backend
npm install
```

### 2. Chạy Backend

```bash
npm start
```

Server sẽ chạy tại `http://localhost:5000`

Để chạy ở chế độ development (tự động restart khi có thay đổi):
```bash
npm run dev
```

### 3. Cài đặt Frontend

Mở terminal mới:

```bash
cd frontend
npm install
```

### 4. Chạy Frontend

```bash
npm start
```

Ứng dụng sẽ mở tại `http://localhost:3000`

## Cấu trúc dự án

```
.
├── backend/
│   ├── routes/
│   │   ├── auth.js      # Routes cho authentication
│   │   └── todos.js     # Routes cho todos
│   ├── middleware/
│   │   └── auth.js      # JWT authentication middleware
│   ├── database.js       # SQLite database setup
│   ├── server.js         # Express server
│   ├── package.json
│   └── .env              # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── context/      # Auth context
│   │   ├── pages/        # Page components
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập

### Todos (Yêu cầu authentication)
- `GET /api/todos` - Lấy tất cả todos của user
- `GET /api/todos/:id` - Lấy todo theo ID
- `POST /api/todos` - Tạo todo mới
- `PUT /api/todos/:id` - Cập nhật todo
- `DELETE /api/todos/:id` - Xóa todo

## Sử dụng

1. Mở trình duyệt và truy cập `http://localhost:3000`
2. Đăng ký tài khoản mới hoặc đăng nhập
3. Bắt đầu thêm và quản lý todos của bạn!

## Lưu ý

- Database SQLite sẽ được tạo tự động khi chạy backend lần đầu
- JWT token được lưu trong localStorage
- Token có thời hạn 7 ngày
- Đảm bảo cả backend và frontend đều đang chạy để ứng dụng hoạt động

## Phát triển thêm

Bạn có thể mở rộng ứng dụng với:
- Upload file/ảnh
- Phân loại todos (categories)
- Tìm kiếm và lọc todos
- Dark mode
- Responsive design improvements
- Unit tests

