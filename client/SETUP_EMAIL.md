# Hướng Dẫn Setup Email Contact Form

## Cách 1: Sử dụng EmailJS (Khuyên dùng - Miễn phí & Dễ)

### Bước 1: Đăng ký EmailJS
1. Truy cập: https://www.emailjs.com/
2. Đăng ký tài khoản miễn phí
3. Xác nhận email

### Bước 2: Tạo Email Service
1. Vào Dashboard → Email Services
2. Click "Add New Service"
3. Chọn Gmail
4. Đăng nhập Gmail của bạn (daonguyennhatanh0910@gmail.com)
5. Copy **Service ID**

### Bước 3: Tạo Email Template
1. Vào Email Templates
2. Click "Create New Template"
3. Dùng template này:

```
Subject: New Contact from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}
```

4. Copy **Template ID**

### Bước 4: Lấy Public Key
1. Vào Account → General
2. Copy **Public Key**

### Bước 5: Cài đặt EmailJS
```bash
cd client
npm install @emailjs/browser
```

### Bước 6: Tạo file .env
Tạo file `client/.env.local`:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Bước 7: Code đã sẵn sàng!
File `MyInfomation.jsx` đã được cập nhật để dùng EmailJS.

---

## Cách 2: Sử dụng Web3Forms (Đơn giản hơn)

### Bước 1: Lấy Access Key
1. Truy cập: https://web3forms.com/
2. Nhập email: daonguyennhatanh0910@gmail.com
3. Nhận Access Key qua email

### Bước 2: Cập nhật code
Thay `YOUR_WEB3FORMS_ACCESS_KEY` trong file `MyInfomation.jsx` bằng key bạn nhận được.

---

## Cách 3: Mailto (Đơn giản nhất - Không cần setup)

Code hiện tại đã có fallback dùng mailto. Nếu không setup gì, form sẽ tự động mở email client của người dùng.

---

## Khuyến nghị

**Dùng EmailJS** vì:
- ✅ Miễn phí 200 emails/tháng
- ✅ Không cần backend
- ✅ Email gửi trực tiếp đến inbox
- ✅ Có template đẹp
- ✅ Tracking được emails

**Tránh dùng mailto** vì:
- ❌ Phụ thuộc email client của user
- ❌ Không professional
- ❌ Có thể bị block bởi browser
