## 🅱️ TRACK A — BOOTSTRAP 5

### PHẦN A — ĐỌC HIỂU

#### Câu A1 — Grid System

| Kích thước     | `< 768px`    | `768px - 991px` | `≥ 992px`    |
| -------------- | ------------ | --------------- | ------------ |
| Số cột mỗi box | 12 cột       | 6 cột           | 3 cột        |
| Box layout     | 1 box / hàng | 2 box / hàng    | 4 box / hàng |

Minh họa layout

1. Màn hình nhỏ < 768px

col-12 → mỗi box chiếm toàn bộ hàng

+-------------------+
| Box 1 |
+-------------------+

+-------------------+
| Box 2 |
+-------------------+

+-------------------+
| Box 3 |
+-------------------+

+-------------------+
| Box 4 |
+-------------------+

2. Tablet 768px - 991px

col-md-6 → mỗi box chiếm 6/12 cột → 2 box / hàng

+-----------+-----------+
| Box 1 | Box 2 |
+-----------+-----------+

+-----------+-----------+
| Box 3 | Box 4 |
+-----------+-----------+

3. Desktop ≥ 992px

col-lg-3 → mỗi box chiếm 3/12 cột → 4 box / hàng

+------+------+------+------+
| Box1| Box2| Box3| Box4|
+------+------+------+------+

Câu hỏi thêm

- col-md-6 nghĩa là gì?

  md = medium screen (tablet)

  6 = chiếm 6 trên 12 cột của Grid System

  → tức là khi màn hình ≥ 768px, mỗi box rộng 50%.

- Tại sao không cần viết col-sm-12?

  Vì Bootstrap dùng cơ chế mobile-first:

  col-12 áp dụng cho mọi kích thước từ nhỏ trở lên.

  Khi đến md, col-md-6 sẽ ghi đè.

  Khi đến lg, col-lg-3 tiếp tục ghi đè.

#### Câu A2 — Utilities & Components

1. Giải thích d-none d-md-block

   `<div class="d-none d-md-block">`

   d-none → ẩn element (display: none)

   d-md-block → từ màn hình md (≥ 768px) trở lên thì hiện dưới dạng block

   Kết quả:

   | Kích thước màn hình | Trạng thái |
   | ------------------- | ---------- |
   | `< 768px`           | Ẩn         |
   | `≥ 768px`           | Hiện       |

2. 5 spacing utilities

- mt-3
  mt-3

  m = margin

  t = top

  3 = mức spacing

  → thêm margin phía trên.

- mb-auto

  mb-auto

  margin-bottom: auto

  → thường dùng trong flexbox để đẩy phần tử.

- px-4

  px-4

  p = padding

  x = trái + phải

  → thêm padding trái/phải.

- py-2
  py-2

  padding top + bottom

  → thêm padding trên/dưới.

- ms-5

  ms-5

  m = margin

  s = start (bên trái trong LTR)

  → thêm margin bên trái.

3. Khác nhau giữa .container, .container-fluid, .container-md

   | Class              | Đặc điểm                                                    |
   | ------------------ | ----------------------------------------------------------- |
   | `.container`       | Có chiều rộng cố định theo từng breakpoint, căn giữa        |
   | `.container-fluid` | Luôn full width 100% màn hình                               |
   | `.container-md`    | Full width ở màn hình nhỏ, từ `md` trở lên mới có max-width |

### PHẦN C — PHÂN TÍCH

#### Câu C1— Tùy biến Bootstrap

Đổi màu $primary của Bootstrap sang #E63946

1. Cần công cụ gì?

Để tùy biến Bootstrap bằng SASS, cần:

- Cài:

      Node.js

      npm

- Cài Bootstrap source + Sass compiler:

      npm install bootstrap

      npm install sass

2. Quy trình chỉnh màu $primary

- Bước 1 — Tạo file SCSS riêng

      Ví dụ:

      // custom.scss

      $primary: #E63946;

      @import "../node_modules/bootstrap/scss/bootstrap";

      Đặt biến $primary TRƯỚC khi import Bootstrap để Bootstrap dùng giá trị mới.

- Bước 2 — Compile SCSS → CSS

      Chạy:

           sass custom.scss custom.css

      Sau khi compile sẽ có file:

           custom.css

- Bước 3 — Link CSS vào HTML
  `<link rel="stylesheet" href="custom.css">`

      Lúc này:

       .btn-primary
      .bg-primary
      .text-primary
      alerts, badges,...

      đều tự động đổi sang màu #E63946.

**Vì sao KHÔNG nên override trực tiếp?**

Ví dụ cách không tốt:

.btn-primary {
background: red;
}
Lý do:

1. Chỉ sửa được một component

- Cách này chỉ đổi màu của:

      .btn-primary

- Nhưng các class khác vẫn màu cũ:

      .bg-primary

      .text-primary

      .border-primary

      .alert-primary

      .navbar-primary

      => Giao diện không đồng bộ.

2. Khó bảo trì

- Khi project lớn:

      phải sửa nhiều class thủ công

      dễ sót

      CSS dài và rối

3. Dễ bị Bootstrap ghi đè

- Bootstrap có nhiều state:

      hover

      active

      focus

      disabled

- Nếu override thủ công phải sửa rất nhiều:

      .btn-primary:hover

      .btn-primary:focus

      .btn-primary:active

4. Mất lợi ích hệ thống theme của Bootstrap

- Bootstrap được thiết kế theo biến SASS:

      $primary

      $success

      $danger

- Khi đổi bằng variable:

      toàn bộ theme cập nhật tự động

      giữ tính nhất quán

      dễ customize tiếp

#### Câu C2 — So sánh

So sánh:

| Tiêu chí             | CSS thuần           | Bootstrap             |
| -------------------- | ------------------- | --------------------- |
| Số dòng CSS          | Nhiều hơn           | Ít hơn                |
| Thời gian phát triển | Chậm hơn            | Nhanh hơn             |
| Responsive           | Tự viết media query | Có sẵn                |
| Tùy biến             | Rất linh hoạt       | Bị framework giới hạn |
| Tính đồng bộ UI      | Tự quản lý          | Đồng bộ sẵn           |
| Dễ học               | Cần hiểu CSS sâu    | Dễ dùng nhanh         |

1. Số dòng CSS cần viết
   CSS thuần

Phải tự viết:

- flexbox
- spacing
- responsive
- button style
- card style
- navbar style

=> khoảng 50–200 dòng CSS.

Bootstrap

Chủ yếu dùng class có sẵn:

- btn btn-primary

- card

- navbar

- container

=> gần như không cần viết CSS riêng.

2. Thời gian phát triển
   Bootstrap nhanh hơn vì:

- có sẵn component
- responsive built-in
- utility classes đầy đủ

Ví dụ:

```css
d-flex
justify-content-between
mt-4
```

=> build prototype rất nhanh.

CSS thuần chậm hơn vì:

- tự thiết kế
- tự debug responsive
- tự xử lý spacing/layout

Khả năng tùy biến
CSS thuần

Ưu điểm:

- toàn quyền thiết kế
- không bị giới hạn style
- phù hợp UI độc đáo
  Bootstrap

Ưu điểm:

- consistency tốt
- dễ maintain

Nhược điểm:

- giao diện dễ “na ná Bootstrap”
- override sâu khá khó
- HTML nhiều class

Khi NÊN dùng Bootstrap

Nên dùng khi:

- làm admin dashboard
- website CRUD
- prototype nhanh
- deadline ngắn
- team frontend nhỏ
- người mới học responsive

Ví dụ:

- trang quản trị
- landing page cơ bản
- form hệ thống

Khi KHÔNG NÊN dùng Bootstrap

Không nên dùng khi:

- UI/UX quá custom
- website cần thiết kế độc quyền
- cần performance tối ưu cao
- project dùng design system riêng

Ví dụ:

- website thương hiệu lớn
- game UI
- portfolio sáng tạo
- sản phẩm có animation phức tạp
