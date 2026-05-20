## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Viewport & Mobile-First

**1. Thẻ `<meta viewport>` chuẩn**

`<meta name="viewport" content="width=device-width, initial-scale=1.0">`

Giải thích từng thuộc tính

- name="viewport" : Khai báo cho trình duyệt biết đây là thiết lập viewport của trang web.

- width=device-width :

  Đặt chiều rộng viewport bằng đúng chiều rộng màn hình thiết bị.

  Ví dụ: iPhone rộng 390px → viewport cũng là 390px.

- initial-scale=1.0

  zoom ban đầu = 100%.

  Trang không bị tự phóng to hoặc thu nhỏ khi tải lần đầu.

**2. Nếu thiếu thẻ viewport thì iPhone hiển thị thế nào?**

- Nếu thiếu thẻ này:

  Safari trên iPhone sẽ giả lập trang web như một trang desktop rộng khoảng 980px.

  Sau đó nó tự thu nhỏ toàn bộ trang để vừa màn hình điện thoại.

- Kết quả:

  Chữ rất nhỏ

  Layout bị co lại

  Người dùng phải zoom mới đọc được

  Responsive CSS hoạt động không đúng mong muốn

- Ví dụ:

  Một website desktop rộng 980px sẽ bị “zoom out” để nhét vào màn hình ~390px của iPhone.

**3. Mobile-First vs Desktop-First**

**A. Mobile-First**

Ý tưởng
Viết CSS cho mobile trước

Sau đó dùng min-width để mở rộng cho màn hình lớn hơn

Ví dụ breakpoint 768px

```css
/* Mobile mặc định */
.container {
  padding: 10px;
  font-size: 14px;
}

/* Tablet/Desktop */
@media (min-width: 768px) {
  .container {
    padding: 30px;
    font-size: 18px;
  }
}
```

Cách hoạt động

< 768px → dùng style mobile

≥ 768px → áp dụng style lớn hơn

**B. Desktop-First**
Ý tưởng

Viết CSS cho desktop trước

Sau đó dùng max-width để chỉnh cho màn hình nhỏ

Ví dụ breakpoint 768px

```css
/* Desktop mặc định */
.container {
  padding: 30px;
  font-size: 18px;
}

/* Mobile/Tablet nhỏ */
@media (max-width: 768px) {
  .container {
    padding: 10px;
    font-size: 14px;
  }
}
```

Cách hoạt động

768px → dùng desktop

≤ 768px → ghi đè cho mobile

**4. Tại sao Mobile-First được khuyên dùng?**

a. Điện thoại là thiết bị phổ biến nhất

- Hiện nay phần lớn người dùng truy cập web bằng mobile.

b. Hiệu năng tốt hơn

- Mobile-First:

  CSS nhẹ hơn cho điện thoại

  Chỉ thêm style khi màn hình lớn hơn

  Giúp: tải nhanh, ít CSS thừa

c. Responsive dễ quản lý hơn

- Thiết kế từ nhỏ → lớn thường dễ mở rộng hơn.

- Flow tự nhiên : Mobile Tablet Desktop

d. Google ưu tiên Mobile-Friendly

- Google dùng mobile-first indexing:

- Website tối ưu mobile sẽ SEO tốt hơn.

### Câu A2 — Breakpoints

| Breakpoint                | Pixel      | Thiết bị đại diện | Ví dụ lưới sản phẩm |
| ------------------------- | ---------- | ----------------- | ------------------- |
| Extra Small (`xs`)        | `< 576px`  | Điện thoại nhỏ    | 1 cột               |
| Small (`sm`)              | `≥ 576px`  | Điện thoại lớn    | 2 cột               |
| Medium (`md`)             | `≥ 768px`  | Tablet dọc        | 2–3 cột             |
| Large (`lg`)              | `≥ 992px`  | Laptop nhỏ        | 3–4 cột             |
| Extra Large (`xl`)        | `≥ 1200px` | Desktop           | 4 cột               |
| Extra Extra Large (`xxl`) | `≥ 1400px` | Màn hình lớn      | 5–6 cột             |

### Câu A3 — Media Queries

| Chiều rộng màn hình | `.container width` |
| ------------------- | ------------------ |
| 375px (iPhone SE)   | `100%`             |
| 600px               | `540px`            |
| 800px               | `720px`            |
| 1000px              | `960px`            |
| 1400px              | `1140px`           |

### Câu A4 — SCSS Basics

0. SCSS là phiên bản mở rộng của CSS giúp viết CSS:

- nhanh hơn

- gọn hơn

- dễ bảo trì hơn.

**1. Variables (Biến)**

Dùng để lưu giá trị tái sử dụng.

Ví dụ

```css
$primary-color: blue;
$padding-size: 20px;

.button {
  background: $primary-color;
  padding: $padding-size;
}
```

Lợi ích:

- Đổi màu/chung style rất nhanh.
- Chỉ sửa một nơi.

**2. Nesting (Lồng nhau)**

Cho phép viết selector bên trong selector khác.

Ví dụ

```css
.navbar {
  background: black;

  ul {
    list-style: none;
  }

  li {
    display: inline-block;
  }

  a {
    color: white;
  }
}
```

CSS sau khi compile

```css
.navbar {
  background: black;
}

.navbar ul {
  list-style: none;
}

.navbar li {
  display: inline-block;
}

.navbar a {
  color: white;
}
```

Lợi ích:

- Code dễ đọc
- Thấy rõ cấu trúc component

**3. Mixins (@mixin, @include)**

Tạo nhóm CSS tái sử dụng có thể truyền tham số.

Ví dụ

```css
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  @include flex-center;
}
Ví dụ có tham số @mixin size($w, $h) {
  width: $w;
  height: $h;
}

.card {
  @include size(200px, 300px);
}
```

Lợi ích:

- Tránh lặp code
- Viết utility nhanh

**4. @extend / Inheritance**

Cho class kế thừa style class khác.

Ví dụ

```css
.button {
  padding: 10px;
  border-radius: 5px;
}

.primary-button {
  @extend .button;
  background: blue;
}
```

CSS compile

```css
.button,
.primary-button {
  padding: 10px;
  border-radius: 5px;
}

.primary-button {
  background: blue;
}
```

Lợi ích:

- Dùng chung style
- Giảm trùng lặp

Tại sao trình duyệt KHÔNG đọc được .scss?

Vì:

- .scss không phải CSS chuẩn.
- Nó chứa cú pháp đặc biệt:

  $variables

  @mixin

  nesting

  @extend

Trình duyệt chỉ hiểu: .css

_Cần bước gì để chuyển SCSS → CSS?_

- Cần compile/transpile SCSS thành CSS.

- Ví dụ dùng:

  Sass CLI

  VS Code Live Sass Compiler

  Webpack
  Vite

## PHẦN C — PHÂN TÍCH

### Câu C1 — Phân tích trang web thực

Trang được chọn: YouTube

**1. Mobile — 375px (iPhone SE)**

Navigation thay đổi thế nào?

Trên mobile:

- Thanh sidebar bên trái bị ẩn
- Chỉ còn:

  Logo

  Search icon

  Avatar/profile

- Menu chuyển thành dạng hamburger icon (☰)

Nhận xét:

- Navigation được tối giản để tiết kiệm chiều ngang.

Lưới content mấy cột?

- Video hiển thị: 1 cột

- Thumbnail full width

Elements bị ẩn trên mobile

- Sidebar đầy đủ
- Một số text menu
- Danh mục mở rộng
- Mini guide bên trái
- Font size có thay đổi không?

Có.

- Tiêu đề video:
  nhỏ hơn desktop
- Khoảng cách/padding:
  giảm xuống
- Menu icon:
  lớn hơn để dễ bấm bằng tay

**2. Tablet — 768px**
Navigation

- Sidebar xuất hiện dạng thu gọn
- Chỉ hiện icon:
  Home

  Shorts

  Subscriptions

Không hiện text đầy đủ như desktop.

Lưới content

- Khoảng: 2–3 cột video

Elements bị ẩn

- Một số category dài
- Sidebar mở rộng toàn phần

Font size

- Lớn hơn mobile
- Gần giống desktop

**3. Desktop — 1440px**
Navigation

- Sidebar đầy đủ:

  Home

  Trending

  Subscriptions

  History

  Playlist

- Search bar dài hơn

- Nhiều icon hơn
  Lưới content
- Khoảng:
  4–6 cột video

  tùy zoom/trình duyệt

Elements bị ẩn

- Hầu như không bị ẩn.

- Desktop hiển thị đầy đủ nhất.

Font size

- Lớn hơn mobile
- Khoảng trắng rộng hơn
- Dễ đọc hơn

### Câu C2 (10đ) — Responsive Strategy

**1. Wireframe — Mobile (375px)**

Layout mobile

┌──────────────────┐
│ LOGO ☰ MENU │
│ 📞 Hotline │
├──────────────────┤
│ │
│ HERO IMAGE │
│ │
├──────────────────┤
│ FOOD 1 │
│ FOOD 2 │
│ FOOD 3 │
│ FOOD 4 │
│ FOOD 5 │
│ FOOD 6 │
├──────────────────┤
│ BOOKING FORM │
│ [Date] │
│ [Time] │
│ [Guests] │
│ [Note] │
│ [Button] │
├──────────────────┤
│ GOOGLE MAP │
├──────────────────┤
│ FOOTER │
└──────────────────┘

Mobile phân tích
Những gì bị ẩn?

- Navigation đầy đủ
- Menu text dài
- Có thể ẩn map preview lớn
  Form nằm đâu?
  Nằm dưới grid món ăn
- Full width để dễ nhập trên điện thoại
  -Grid ảnh mấy cột?
- 1 cột
  **2. Wireframe — Tablet (768px)**
  ┌────────────────────────────────┐
  │ LOGO MENU 📞 CALL │
  ├────────────────────────────────┤
  │ │
  │ HERO IMAGE │
  │ │
  ├──────────────┬─────────────────┤
  │ FOOD │ FOOD │ FOOD │
  │ FOOD │ FOOD │ FOOD │
  ├──────────────┴─────────────────┤
  │ BOOKING FORM │
  ├────────────────────────────────┤
  │ GOOGLE MAP │
  ├────────────────────────────────┤
  │ FOOTER │
  └────────────────────────────────┘
  Tablet phân tích
  Grid ảnh mấy cột?
- 2–3 cột
  Bản đồ nằm đâu?
- Nằm dưới form
- Full width
  Navigation
- Có thể hiện menu ngang đơn giản
- Hamburger có thể vẫn còn
  **3. Wireframe — Desktop (1440px)**
  ┌──────────────────────────────────────────────┐
  │ LOGO MENU MENU MENU 📞 HOTLINE │
  ├──────────────────────────────────────────────┤
  │ │
  │ HERO IMAGE │
  │ │
  ├──────────────────────┬───────────────────────┤
  │ │ │
  │ FOOD GRID │ BOOKING FORM │
  │ 3-4 COLUMNS │ │
  │ │ │
  ├──────────────────────┴───────────────────────┤
  │ GOOGLE MAP │
  ├──────────────────────────────────────────────┤
  │ FOOTER │
  └──────────────────────────────────────────────┘
  Desktop phân tích
  Layout bao nhiêu cột?
  Main layout:
- 2 cột
  trái: gallery món ăn
  phải: booking form
  Sidebar có không?
- Không cần sidebar riêng
- Booking form đóng vai trò cột phụ
  Grid ảnh
- 3–4 cột

### Bài B3— SCSS Refactor

**SCSS Compile Command**

**Compile once**

sass scss/style.scss style.css

**Watch mode (auto compile)**

sass --watch scss/style.scss:style.css
