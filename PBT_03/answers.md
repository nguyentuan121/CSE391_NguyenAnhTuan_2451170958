## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — 3 Cách nhúng CSS

**1. Inline CSS**

Cách viết

CSS được viết trực tiếp trong thuộc tính style của thẻ HTML.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Inline CSS</title>
  </head>
  <body>
    <h1 style="color: red; text-align: center;">Xin chào</h1>

    <p style="font-size: 18px;">Đây là ví dụ Inline CSS</p>
  </body>
</html>
```

**Ưu điểm**

1. Viết nhanh, đơn giản

2. Áp dụng ngay cho một phần tử cụ thể

3. Không cần tạo file CSS riêng

**Nhược điểm**

1. Code HTML bị dài và khó đọc

2. Khó bảo trì khi website lớn

3. Không tái sử dụng được nhiều lần

**Khi nào nên dùng**

- Test nhanh giao diện

- Chỉnh sửa nhỏ cho một phần tử duy nhất

- Demo đơn giản

**2. Internal CSS**

Cách viết

CSS được đặt trong thẻ `<style>` bên trong thẻ `<head>`.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Internal CSS</title>

    <style>
      h1 {
        color: blue;
        text-align: center;
      }

      p {
        font-size: 20px;
        color: green;
      }
    </style>
  </head>
  <body>
    <h1>Xin chào</h1>
    <p>Đây là ví dụ Internal CSS</p>
  </body>
</html>
```

**Ưu điểm**

1. Code gọn hơn Inline CSS

2. Có thể áp dụng cho nhiều phần tử

3. Dễ quản lý hơn inline

**Nhược điểm**

1. CSS chỉ dùng được cho một trang HTML

2. Khi website lớn sẽ khó quản lý

3. Không tái sử dụng giữa nhiều trang

**Khi nào nên dùng**

- Website nhỏ chỉ có 1 trang

- Bài tập thực hành HTML/CSS

- Muốn thử giao diện nhanh mà chưa cần file CSS riêng

**3. External CSS**

Cách viết

CSS được đặt trong file riêng .css và liên kết bằng thẻ <link>.

File HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>External CSS</title>

    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Xin chào</h1>
    <p>Đây là ví dụ External CSS</p>
  </body>
</html>
```

File style.css

```css
h1 {
  color: purple;
  text-align: center;
}

p {
  font-size: 18px;
  color: orange;
}
```

**Ưu điểm**

1. Chuyên nghiệp và dễ bảo trì

2. Tái sử dụng cho nhiều trang

3. HTML gọn gàng, dễ đọc

4. Phù hợp website lớn

**Nhược điểm**

1.  tạo thêm file CSS

2.  Nếu file CSS lỗi hoặc mất liên kết thì giao diện sẽ hỏng

**Khi nào nên dùng**

- Website thực tế

- Dự án nhiều trang

- Làm việc nhóm

- Website cần dễ bảo trì và mở rộng

**Câu hỏi thêm**: Khi cùng một phần tử có cả Inline CSS, Internal CSS và External CSS cùng áp dụng, thì CSS có độ ưu tiên cao hơn sẽ được dùng.

Thứ tự ưu tiên CSS:

Inline CSS > Internal CSS > External CSS

Nghĩa là:

1. Inline mạnh nhất
2. Internal đứng giữa
3. External yếu hơn

**Giải thích**

External CSS đặt màu green

Internal CSS đặt màu blue

Inline CSS đặt màu red

→ Vì Inline CSS có độ ưu tiên cao nhất nên màu đỏ “thắng”.

Vì sao lại có thứ tự này?

CSS hoạt động theo nguyên tắc:

- Style càng gần phần tử HTML thì ưu tiên càng cao.
- Inline viết trực tiếp trên element nên được ưu tiên nhất.
- Internal nằm trong chính file HTML nên mạnh hơn External.
- External ở file bên ngoài nên ưu tiên thấp hơn.

### Câu A2 — CSS Selectors — Dự đoán kết quả

**Phân tích selector**

1. h1

   Chọn tất cả thẻ `<h1>`.

   → Chọn: "ShopTLU"

2. .price

   Chọn tất cả element có class price.

   → Chọn:

   "25.990.000đ"

   "45.990.000đ"

3. #app header

   Chọn thẻ `<header>` nằm bên trong element có id app.

   → Chọn toàn bộ phần:

   ```html
   <header class="top-bar dark">
     <h1>ShopTLU</h1>
     <nav>
       <a href="/" class="active">Home</a>
       <a href="/products">Products</a>
       <a href="/about">About</a>
     </nav>
   </header>
   ```

   Text content:

   → "ShopTLU Home Products About"

4. nav a:first-child

   Chọn thẻ `<a>` đầu tiên bên trong `<nav>`.

   → Chọn: "Home"

5. .product.featured h2

   Chọn thẻ `<h2>` nằm trong element có đồng thời class:

   product
   featured

   → Chọn: "MacBook Pro"

6. article > p

   Chọn các thẻ `<p>` là con trực tiếp của `<article>`.

   → Chọn:

   "25.990.000đ"

   "Mô tả sản phẩm..."

   "45.990.000đ"

   "Mô tả sản phẩm..."

   (Tổng cộng 4 thẻ `<p>`)

7. `a[href="/"]`

   Chọn thẻ `<a>` có thuộc tính:

   href="/"

   → Chọn: "Home"

8. .top-bar.dark h1

   Chọn `<h1>` nằm trong element có đồng thời class:

   top-bar
   dark

   → Chọn: "ShopTLU"

### Câu A3 — Box Model — Tính toán kích thước

**Trường hợp 1 — content-box (mặc định)**

```css
.box-1 {
  width: 400px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
```

1. Quy tắc của content-box

- width chỉ tính phần content
- KHÔNG tính padding và border

2. Tính chiều rộng hiển thị

- Content = 400px

- Padding trái + phải

  = 20 + 20

  = 40px

- Border trái + phải

  = 5 + 5

  = 10px

3. Chiều rộng thực tế render

   400 + 40 + 10 = 450px

   → Chiều rộng hiển thị = 450px

4. Không gian chiếm trên trang

- Margin cũng chiếm không gian layout.

  450 + margin trái + margin phải

  = 450 + 10 + 10

  = 470px

  → Không gian chiếm trên trang = 470px

**Trường hợp 2 — border-box**

```css
.box-2 {
  box-sizing: border-box;
  width: 400px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
```

1. Quy tắc của border-box

   width đã bao gồm:
   - content

   - padding

   - border

2. Chiều rộng hiển thị

   width = 400px

   → Chiều rộng hiển thị = 400px

3. Kích thước content thực tế

   Content

   = 400
   - padding trái phải

   - border trái phải

   = 400 - 40 - 10
   = 350px

   → Content thực tế = 350px

4. Không gian chiếm trên trang

   400 + margin trái phải

   = 400 + 20

   = 420px

   → Không gian chiếm trên trang = 420px

**Trường hợp 3 — Margin Collapse**

```css
.box-a {
  margin-bottom: 25px;
}
.box-b {
  margin-top: 40px;
}
```

1.  Khoảng cách thực tế

         → 40px

         Vì sao KHÔNG phải 65px?

         Nhiều người nghĩ:

         25 + 40 = 65px

         Nhưng trong CSS:

         Vertical margin giữa block elements bị collapse

         Hai margin dọc chồng lên nhau.

         Browser sẽ lấy:

         margin lớn hơn

         Nên:

         max(25, 40) = 40px

    **Nâng cao — margin âm**

```css
.box-a {
  margin-bottom: -10px;
}
.box-b {
  margin-top: 40px;
}
```

- Công thức

  Khi có margin âm:

  Khoảng cách = margin dương lớn nhất + margin âm nhỏ nhất

  40 + (-10) = 30px

  → Khoảng cách = 30px

### Câu A4 — Specificity (Độ ưu tiên)

1. Rule A

   p : ID = 0, class = 0, tag = 1

   → (0, 0, 1)

2. Rule B

   .price: ID = 0, class = 1, tag = 0

   → (0, 1, 0)

3. Rule C

   #main-price: ID = 1, class = 0, tag = 0

   → (1, 0, 0)

4. Rule D

   p.price: ID = 0, class = 1, tag = 1

   → (0, 1, 1)

5. Element sẽ có màu gì?

   So sánh specificity:

   A = (0,0,1)

   B = (0,1,0)

   D = (0,1,1)

   C = (1,0,0)

   ID mạnh nhất.

   → Rule C thắng.

   → Màu cuối cùng = đỏ (red)

6. Nếu có inline style

   `<p class="price" id="main-price" style="color: orange;">`

   Inline style mạnh hơn CSS thường.

   → Màu cuối cùng = cam (orange)

7. Nếu Rule A thêm !important

```css
p {
  color: black !important;
}
```

     Kết quả

     → Màu cuối cùng = đen (black)

_Tại sao ?_

!important có ưu tiên rất cao.

Thứ tự đơn giản:

!important
↓
inline style
↓
ID
↓
class
↓
tag

Nên dù Rule A specificity thấp hơn, !important làm nó thắng các rule bình thường khác.

## PHẦN C — DEBUG & SUY LUẬN

### Câu C1 — Debug CSS Layout

**1. Tính chiều rộng thực tế**

Sidebar

```css
.sidebar {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
}
```

**Vì dùng `content-box`**

     Tổng width

     = content + padding + border

_Tính:_

     Content = 300px

     Padding trái phải

     = 20 + 20

     = 40px

     Border trái phải

     = 1 + 1

     = 2px

_Width thực tế:_

     300 + 40 + 2 = 342px

     → Sidebar thực tế = 342px

**Content**

```css
.content {
  width: 660px;
  padding: 30px;
  border: 1px solid #ccc;
}
```

_Tính:_

     Content = 660px

     Padding trái phải

     = 30 + 30

     = 60px

     Border trái phải

     = 1 + 1

     = 2px

_Width thực tế:_

     660 + 60 + 2 = 722px

     → Content thực tế = 722px

_Tổng chiều rộng_

     342 + 722 = 1064px

     Container chỉ:

     960px

**2. Vì sao layout bị vỡ ?**

     Hai cột float phải nằm cùng hàng.

     Nhưng:

     1064px > 960px

     nên browser không đủ chỗ.

     Kết quả:

     sidebar nằm dòng đầu

     content bị đẩy xuống dòng mới

**3. Cách sửa 1 — Dùng border-box**

_Ý tưởng_

     Cho width bao gồm luôn:

     padding

     border

CSS sửa

```css
.sidebar,
.content {
  box-sizing: border-box;
}
```

     Giữ nguyên width cũ:

     Sidebar = 300px

     Content = 660px

     Tổng:

     300 + 660 = 960px

     → Vừa container

**4. Cách sửa 2 — Không dùng border-box**

_Ý tưởng_

     Giảm width content và sidebar để chừa chỗ cho:

     padding

     border

     Sidebar

     Cần tổng = 300px

     width thực

     = content + 40 + 2

     content
     = 300 - 42

     = 258px

     Content

     Container còn:

     960 - 300 = 660px

     Content phải tổng = 660px

     content
     = 660 - 60 - 2

     = 598px

     CSS sửa

```css
.sidebar {
  width: 258px;
}

.content {
  width: 598px;
}
```

### Câu C2 — Cascade Puzzle

1. "Sản phẩm A" (h2) có font-size = 20px và color = green

2. "Mô tả sản phẩm" (p trong card featured) có color = blue

3. "Sản phẩm B" (h2) có font-size = 20px và color = blue

4. "Mô tả sản phẩm B" (p.highlight) có color = green

## PHẦN B — THỰC HÀNH CODE

### Bài B1 — Style trang Profile

**Các loại selector đã sử dụng**

1. Element Selector

- body
- header
- table
- footer

2. Class Selector

- .active

3. ID Selector

- #3

4. Descendant Selector

- section ol li
- nav a

5. Pseudo-class Selector

- nav a:hover
- tbody tr:hover
- tbody tr:nth-child(even)

### Bài B2 — Box Model Lab

**PHẦN 1 — CONTENT BOX VS BORDER BOX**

**Kết quả đo từ DevTools**

### Hộp 1 (content-box)

- width khai báo: 300px
- padding: 20px
- border: 5px

Chiều rộng thực tế:

300 + 20 + 20 + 5 + 5 = 350px

=> DevTools hiển thị khoảng: 350px

### Hộp 2 (border-box)

- width khai báo: 300px
- padding: 20px
- border: 5px

Chiều rộng thực tế:

Tổng chiều rộng vẫn là 300px

=> DevTools hiển thị: 300px

**Giải thích sự khác biệt**

### content-box

- width chỉ tính phần content
- padding và border được cộng thêm vào bên ngoài
- nên kích thước thật lớn hơn width khai báo

Công thức:

Tổng width =
content + padding trái + padding phải + border trái + border phải

= 300 + 20 + 20 + 5 + 5
= 350px

### border-box

- width đã bao gồm:
  - content
  - padding
  - border
- trình duyệt tự động thu nhỏ content để giữ tổng width đúng bằng 300px

=> dễ kiểm soát layout hơn

**PHẦN 2 — LAYOUT 3 CỘT**

**Nếu KHÔNG dùng border-box**

Tổng chiều rộng thực tế:

### Sidebar

250 + 15 + 15 = 280px

### Content

500 + 20 + 20 = 540px

### Ads

250 + 15 + 15 = 280px

Tổng:

280 + 540 + 280 = 1100px

=> vượt quá container 1000px

**Nếu dùng border-box**

Các cột giữ nguyên kích thước:

- Sidebar = 250px
- Content = 500px
- Ads = 250px

Tổng:

250 + 500 + 250 = 1000px

=> layout vừa chính xác container

### Bài B3 (15đ) — Specificity Battle

**CSS Specificity Battle**

**10 Rules + Specificity Score**

| Rule                  | Specificity |
| --------------------- | ----------- |
| p                     | 0,0,1       |
| body p                | 0,0,2       |
| .text                 | 0,1,0       |
| .highlight            | 0,1,0       |
| p.text                | 0,1,1       |
| .text.highlight       | 0,2,0       |
| body .text.highlight  | 0,2,1       |
| #demo                 | 1,0,0       |
| p#demo                | 1,0,1       |
| p#demo.text.highlight | 1,2,1       |

---

# Element cuối cùng hiển thị màu gì?

Element cuối cùng hiển thị màu:

```text
gold
```

Tại sao?

Rule:

p#demo.text.highlight {
color: gold;
}

có specificity cao nhất:

1,2,1

Nó mạnh hơn tất cả các rule khác nên trình duyệt áp dụng màu gold.

Nếu thay đổi thứ tự rules trong file CSS thì sao?
Trường hợp specificity KHÁC nhau

Kết quả KHÔNG đổi.

Ví dụ:

#demo

vẫn thắng:

.text

dù đặt ở đâu.

Lý do:

specificity cao hơn luôn được ưu tiên.
Trường hợp specificity BẰNG nhau

Thứ tự sẽ ảnh hưởng.

Ví dụ:

```css
.text {
  color: red;
}

.highlight {
  color: blue;
}
```

Cả hai đều có specificity:

0,1,0

Rule viết SAU sẽ thắng.

Nếu .highlight viết sau .text
→ màu sẽ là blue.

Kết luận

CSS ưu tiên theo:

!important
Specificity cao hơn
Nếu specificity bằng nhau → rule viết sau thắng
