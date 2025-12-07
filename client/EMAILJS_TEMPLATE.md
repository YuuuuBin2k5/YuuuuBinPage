# EmailJS Template Setup

## Template Variables

Đảm bảo template EmailJS của bạn có các biến sau:

### Subject Line:
```
New Contact from {{from_name}}
```

### Email Body:
```
You have received a new message from your portfolio contact form.

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

## Các biến được gửi từ form:
- `from_name` - Tên người gửi
- `from_email` - Email người gửi  
- `subject` - Chủ đề
- `message` - Nội dung tin nhắn

## Test Email

Sau khi setup xong, hãy:
1. Restart dev server (Ctrl+C rồi npm run dev)
2. Vào trang Contact
3. Điền form và gửi thử
4. Kiểm tra email: daonguyennhatanh0910@gmail.com

## Troubleshooting

Nếu không nhận được email:
1. Kiểm tra spam folder
2. Verify email service trong EmailJS dashboard
3. Check console log để xem lỗi
4. Đảm bảo template variables match với code
