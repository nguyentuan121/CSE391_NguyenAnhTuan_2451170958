## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Input Types

_Tài liệu tham chiếu: `07_forms_interactive.md`_

```
1.type="email" → Ô nhập text → Tự kiểm tra có ký tự @ và định dạng email → Dùng cho form đăng ký tài khoản / nhập email khách hàng
2.type="password" → Ô nhập text nhưng bị ẩn (hiện dấu ●●●) → Không có validation đặc biệt (có thể thêm minlength) → Dùng cho đăng nhập / thanh toán
3.type="number" → Ô nhập số, có nút tăng/giảm → Chỉ cho nhập số, có thể giới hạn min, max → Nhập số lượng sản phẩm
4.type="tel" → Ô nhập số điện thoại → Không validate chặt (chỉ gợi ý bàn phím số trên mobile) → Nhập số điện thoại khách hàng
5.type="url" → Ô nhập link → Tự kiểm tra có dạng URL (http/https) → Nhập link website (ví dụ seller profile)
6.type="date" → Hiển thị lịch để chọn ngày → Chỉ cho chọn ngày hợp lệ → Chọn ngày giao hàng / ngày đặt lịch
7.type="checkbox" → Ô tick vuông (chọn nhiều) → Không có validation riêng (có thể dùng required) → Chọn nhiều sản phẩm / đồng ý điều khoản
8.type="radio" → Nút tròn (chỉ chọn 1 trong nhiều) → Đảm bảo chỉ chọn 1 option → Chọn phương thức thanh toán (COD / Visa)
9.type="range" → Thanh kéo (slider) → Giới hạn trong khoảng min–max → Chọn khoảng giá (price filter)
10.type="file" → Nút upload file → Giới hạn loại file (accept) → Upload ảnh sản phẩm / ảnh đánh giá
```

### Câu A2 — Validation Attributes

_Tài liệu tham chiếu: `07_forms_interactive.md`_

Trường hợp 1
`<input type="text" required value="">`
→ Không submit được

Vì required bắt buộc phải nhập, nhưng đang để trống → browser báo lỗi “Please fill out this field”

Trường hợp 2
`<input type="email" value="abc">`
→ Không submit được

Vì abc không đúng định dạng email (thiếu @) → browser báo “Please enter an email address”

Trường hợp 3
`<input type="number" min="1" max="10" value="15">`
→ Không submit được

Vì 15 > max (10) → vi phạm range → browser báo lỗi giá trị không hợp lệ

Trường hợp 4
`<input type="text" pattern="[0-9]{10}" value="abc123">`
→ Không submit được

Pattern yêu cầu đúng 10 chữ số, nhưng abc123 có chữ + không đủ 10 số → sai format

Trường hợp 5
`<input type="password" minlength="8" value="123">`
→ Không submit được

Chỉ có 3 ký tự < 8 → browser báo lỗi “Please lengthen this text...”

### Câu A3 — Accessibility

_Tài liệu tham chiếu: `07_forms_interactive.md - Accessibility`_

1. Vì sao `<label for="email">` quan trọng?

   tên rõ ràng cho input → screen reader đọc: “Email, input”

   Không có for + id → chỉ đọc “input” → không biết ô gì

2. Khi nào dùng `<fieldset>` + `<legend>`?

   Khi có nhiều input cùng nhóm

   Ví dụ:

   ```html
   <fieldset>
     <legend>Thanh toán</legend>
     <input type="radio" /> Thẻ <input type="radio" /> Tiền mặt
   </fieldset>
   ```

   → Screen reader hiểu: các lựa chọn thuộc cùng 1 nhóm

3. aria-label dùng khi nào?

   Khi không có text hiển thị (icon, input trống)

   Ví dụ:

   `<button aria-label="Đóng">❌</button>`

   ❌ Vì sao KHÔNG dùng aria-label khi đã có `<label>`?

   Gây trùng / xung đột tên

   Screen reader ưu tiên aria-label → bỏ qua label thật

### Câu A4 — Media

_Tài liệu tham chiếu: `06_graphics_multimedia.md`_

4. loading="lazy" là gì?

Trì hoãn tải ảnh đến khi gần xuất hiện trên màn hình

- Cải thiện:

  Giảm thời gian load ban đầu

  Tiết kiệm băng thông

  Tăng hiệu năng (đặc biệt trang nhiều ảnh)

- Không nên dùng khi:
  Ảnh quan trọng ở đầu trang (hero, banner)

  Ảnh cần hiển thị ngay (logo, above-the-fold)

2. Vì sao `<video>` nên có nhiều `<source>`?

   Trình duyệt hỗ trợ codec/format khác nhau
   → nhiều source giúp video chạy trên mọi trình duyệt
   Format phổ biến:
   MP4 (H.264) phổ biến nhất
   WebM
   Ogg

3. Thuộc tính alt trên `<img>`

- Dùng để:
  Mô tả ảnh cho screen reader
  Hiển thị khi ảnh lỗi
  Hỗ trợ SEO
- Viết alt cho từng trường hợp:
  a. Ảnh sản phẩm iPhone 16

  `alt="iPhone 16 màu đen, mặt trước và sau"`

  b. Ảnh trang trí (decorative)
  alt=""

  Để rỗng để screen reader bỏ qua

  c. Ảnh biểu đồ doanh thu Q1/2026

  `alt="Biểu đồ doanh thu quý 1 năm 2026 tăng dần từ tháng 1 đến tháng 3"`

### Câu A5 (5đ) — So sánh `<figure>` vs `<img>`

🔹 So sánh

    `<img>`: chỉ hiển thị ảnh đơn lẻ

    `<figure>`: ảnh + nội dung liên quan (chú thích, mô tả, số liệu…)

1. Khi dùng Cách 1 (`<img>`)

   Khi ảnh độc lập, không cần chú thích hiển thị

   Ví dụ:
   - Logo website (header)

   `<img src="logo.png" alt="Logo công ty ABC">`

   Chỉ để hiển thị → không cần chú thích
   - Icon giỏ hàng

   `<img src="cart-icon.png" alt="Giỏ hàng">`

   Là biểu tượng UI → không cần `<figure>`

2. Khi dùng Cách 2 (`<figure>`)

   Khi ảnh cần giải thích thêm / có ngữ cảnh

   Ví dụ:
   Trang sản phẩm:

   ```html
   <figure>
     <img src="iphone.jpg" alt="iPhone 16 Pro Max" />
     <figcaption>iPhone 16 Pro Max — 25.990.000đ</figcaption>
   </figure>
   ```

   Bài viết blog:

   ```html
   <figure>
     <img src="chart.png" alt="Biểu đồ doanh thu 2026" />
     <figcaption>Doanh thu tăng mạnh trong Q1/2026</figcaption>
   </figure>
   ```

## PHẦN C — PHÂN TÍCH & SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Debug Form

Lỗi 1: Dòng 2 — Input "Tên" không có `<label for>` (accessibility kém)

Sửa:

```html
<label for="name">Tên:</label>
<input type="text" id="name" name="name" required />
```

Lỗi 2: Dòng 4 — Input email không có label và thiếu required

Sửa:

```html
<label for="email">Email:</label>
<input
  type="email"
  id="email"
  name="email"
  placeholder="Email của bạn"
  required
/>
```

Lỗi 3: Dòng 6 — Password không có label và thiếu required

Sửa:

```html
<label for="password">Mật khẩu:</label>
<input type="password" id="password" name="password" required />
```

Lỗi 4: Dòng 7 — Nhập lại mật khẩu không có label + không kiểm tra khớp

Sửa:

```html
<label for="confirm">Nhập lại mật khẩu:</label>
<input type="password" id="confirm" name="confirm" required />
```

Lỗi 5: Dòng 9 — Phone dùng type="text" (sai semantic) + dùng value làm mặc định (UX kém)

Sửa:

```html
<label for="phone">Phone:</label>
<input type="tel" id="phone" name="phone" placeholder="0901234567" required />
```

Lỗi 6: Dòng 11 — `<select>` không có label (accessibility lỗi)

Sửa:

```html
<label for="city">Thành phố:</label>
<select id="city" name="city" required>
  <option value="">--Chọn--</option>
  <option value="hn">Hà Nội</option>
  <option value="hcm">TP.HCM</option>
</select>
```

Lỗi 7: Dòng 16 — Checkbox điều khoản thiếu input (chỉ có label)

Sửa:

```html
<input type="checkbox" id="agree" name="agree" required />
<label for="agree">Tôi đồng ý điều khoản</label>
```

Lỗi 8: Dòng 19 — `<form>` thiếu action và method (best practice)

Sửa:

`<form action="/submit" method="post">`

### Câu C2 — Thiết kế chiến lược Validation

1. Regex pattern

   CMND/CCCD (12 chữ số): `pattern="^[0-9]{12}$"`

   Số tài khoản (10–15 chữ số): `pattern="^[0-9]{10,15}$"`

2. HTML5 validation có đủ an toàn không?

   Không đủ an toàn cho ứng dụng ngân hàng.

   Lý do:

   Có thể bị bypass (tắt validation, sửa HTML, gửi request trực tiếp)

   Không chống được tấn công như SQL Injection, XSS

   Không kiểm tra được dữ liệu thực (CCCD có tồn tại, tài khoản có hợp lệ)

   Kết luận:

   HTML5 validation chỉ dùng để cải thiện trải nghiệm người dùng, bắt buộc phải kiểm tra lại ở backend.

3. 3 loại validation HTML5 không làm được

   So sánh nhiều field

   Ví dụ: password và confirm password phải giống nhau

   Logic nghiệp vụ phức tạp

   Ví dụ: kiểm tra checksum CCCD, quy tắc PIN, điều kiện riêng của ngân hàng

   Kiểm tra dữ liệu từ server

   Ví dụ: email đã tồn tại chưa, số tài khoản có hợp lệ không

4. 2 rủi ro nếu chỉ validate frontend

   Bị tấn công hệ thống

   Hacker có thể gửi dữ liệu độc hại (SQL Injection, XSS) → gây lỗi hoặc lộ dữ liệu

   Gian lận và sai lệch dữ liệu

   Người dùng có thể gửi dữ liệu không hợp lệ → sai thông tin, lỗi hệ thống, ảnh hưởng tài chính

## PHẦN B — THỰC HÀNH CODE

### Bài B1 — Form Đăng ký Tài khoản

HTML5 validation chỉ kiểm tra từng field độc lập, không thể:

So sánh giá trị giữa 2 input

Kiểm tra password === confirm

Thuộc tính pattern, required, minlength… chỉ áp dụng cho một input duy nhất, không truy cập được giá trị của input khác.
