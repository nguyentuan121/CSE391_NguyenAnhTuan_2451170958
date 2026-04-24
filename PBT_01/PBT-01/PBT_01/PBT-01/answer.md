## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — HTTP & Browser

**1.** _Tham chiếu: 01_introduction_html_universe.md — Phần: "Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương"_

_Khi gõ https://shopee.vn và nhấn Enter, hành trình dữ liệu diễn ra như sau:_

1. DNS Lookup: Trình duyệt hỏi "danh bạ" Internet để tìm địa chỉ IP của Shopee → Đi qua các máy chủ DNS trên thế giới để lấy số hiệu IP chính xác.
2. Thiết lập kết nối (TCP Handshake): Request từ laptop của bạn → qua Router WiFi → nhà mạng (ISP) → chạy xuyên cáp quang biển để đến máy chủ của Shopee → Hai bên "bắt tay" thiết lập kết nối an toàn.
3. Gửi Request: Trình duyệt gửi thông điệp: "Tôi muốn xem trang chủ Shopee" → Yêu cầu này bay qua hàng ngàn cây số đến Data Center nơi chứa dữ liệu Shopee.
4. Server xử lý & Response: Server Shopee nhận lệnh → Kiểm tra kho hàng, khuyến mãi → Đóng gói file HTML, CSS, JS rồi gửi ngược lại theo đường cáp quang về máy tính của bạn.
5. Render: Trình duyệt Chrome nhận được "gói quà" dữ liệu → Bắt đầu phân tích mã nguồn (Parsing) → Dựng khung, tô màu và hiển thị (Render) → Bạn nhìn thấy giao diện Shopee để bắt đầu mua sắm.

**2.**
_Tham chiếu: 01_introduction_html_universe.md — Phần: "Browser Rendering — Từ Code thành Hình ảnh"_

_Thông tin của tab Network:_

1. Danh sách các tài nguyên (Requests)
   Khi bạn load một trang web, nó không phải là một file duy nhất. Tab Network sẽ liệt kê tất cả các file được tải về như: file HTML, file ảnh (JPG, PNG), file định dạng (CSS), file xử lý (JS), hay các lời gọi API.

2. Trạng thái phản hồi (Status Code)

   Đây là cột cực kỳ quan trọng giúp bạn biết request đó có thành công hay không:

   200 OK: Tải thành công.

   404 Not Found: File không tồn tại (ví dụ link ảnh bị hỏng).

   500 Internal Server Error: Lỗi từ phía máy chủ.

3. Loại file (Type)

   Cột này phân loại dữ liệu để bạn dễ quản lý, ví dụ: document (HTML), stylesheet (CSS), script (JS), png/jpeg (Ảnh).

4. Thời gian tải (Time & Waterfall)

   Time: Tổng thời gian để tải xong một file cụ thể.

   Waterfall: Một biểu đồ hình thác nước cho thấy trình tự file nào tải trước, file nào tải sau và chúng có bị "nghẽn" ở đâu không.

5. Kích thước (Size)

   Cho biết file đó nặng bao nhiêu (KB/MB). Điều này giúp các lập trình viên biết được tại sao trang web của họ bị chậm (thường là do ảnh quá nặng).

   #### 2. Kết quả thực hành DevTools web https://shopee.vn:

   **Ảnh chụp màn hình:**
   - Status Code của request đầu tiên

     ![alt text](StatusCode.png)

   - Tổng thời gian load trang

     ![alt text](Load.png)

   - Một request trả về file CSS

     ![alt text](CSS.png)

### Câu A2 — Semantic HTML

_Tham chiếu: 04_visible_part_html.md — Phần: "Semantic HTML5 — "Thẻ có ý nghĩa"_

1. Dùng `<div>` thay cho `<header>`

   → Sai vì đây là phần đầu trang nhưng không dùng thẻ semantic

2. Menu không dùng `<nav>`

   → Menu điều hướng nhưng lại dùng `div`

3. Nội dung chính không dùng `<main>`

   → Không đúng semantic cho nội dung chính

4. Sản phẩm không dùng `<article>`

   → Một sản phẩm là nội dung độc lập → nên dùng article

5. Tiêu đề không dùng thẻ heading `(<h1> → <h6>)`

   → Google không hiểu đây là tiêu đề quan trọng

6. Ảnh không có `alt` (lỗi SEO quan trọng)

   → Thiếu mô tả → Google không hiểu ảnh

7. Footer không dùng `<footer>`

**Sửa lại:**

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>ShopTLU</title>
  </head>
  <body>
    <header>
      <div class="logo">ShopTLU</div>
      <nav>
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
      </nav>
    </header>

    <main>
      <article>
        <h2>iPhone 16 Pro</h2>
        <p>Giá: 25.990.000đ</p>
        <img src="iphone.jpg" alt="iPhone 16 Pro" />
      </article>
    </main>

    <footer>© 2026 ShopTLU</footer>
  </body>
</html>
```

### Câu A3 — Block vs Inline

**Kết quả hiển thị:**

Hộp 1

Text A Text B

Hộp 2

Text C **Text D**

Hộp 3

**Giải thích**

1. `<div>` là block

   Luôn chiếm cả dòng

   Tự động xuống dòng trước và sau

   Nên mỗi “Hộp” nằm riêng một dòng:

   Hộp 1

   Hộp 2

   Hộp 3

2. `<span>` và `<strong>` là inline

   Không xuống dòng

   Nằm trên cùng một dòng nếu không bị ngắt bởi thẻ block

   Vì vậy:

   `<span>`Text A`</span><span>`Text B`</span>`

   → Text A Text B (cùng dòng)

3. `<strong>` vẫn là inline nhưng in đậm

   `<span>`Text C`</span><strong>`Text D</strong>`

   → Text C 𝐓𝐞𝐱𝐭 𝐃

### Câu A4 — Table

_Tham chiếu: 05_tables_hyperlinks.md — Phần: "Table"_

**Sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`:**

`<thead>` → tiêu đề

`<tbody>` → dữ liệu chính

`<tfoot>` → tổng kết

**KHÔNG NÊN dùng `<table>` để tạo layout vì:**

1. Sai ngữ nghĩa (Semantic HTML)

2. Ảnh hưởng SEO

3. Khó responsive (mobile)

## PHẦN C — SUY LUẬN

### Câu C1 — Thiết kế cấu trúc

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>Chi tiết sản phẩm</title>
  </head>
  <body>
    <!-- header: phần đầu trang (logo + menu chính) -->
    <header>
      <h1>Shop</h1>
      <!-- h1: tiêu đề chính của website -->

      <!-- nav: khu vực điều hướng chính -->
      <nav>
        <a href="#">Trang chủ</a>
        <a href="#">Danh mục</a>
      </nav>
    </header>

    <!-- nav breadcrumb: điều hướng theo cấp (Trang chủ > ...) -->
    <nav aria-label="breadcrumb">
      <ol>
        <!-- ol: danh sách có thứ tự (breadcrumb có thứ tự cấp bậc) -->
        <li><a href="#">Trang chủ</a></li>
        <li><a href="#">Điện thoại</a></li>
        <li>iPhone 16</li>
      </ol>
    </nav>

    <!-- main: nội dung chính của trang -->
    <main>
      <!-- section: nhóm nội dung chính của sản phẩm -->
      <section>
        <!-- khu vực ảnh sản phẩm -->
        <div class="product-images">
          <!-- img: hiển thị ảnh sản phẩm -->
          <img src="#" alt="Ảnh sản phẩm 1" />
          <img src="#" alt="Ảnh sản phẩm 2" />
          <img src="#" alt="Ảnh sản phẩm 3" />
          <img src="#" alt="Ảnh sản phẩm 4" />
          <img src="#" alt="Ảnh sản phẩm 5" />
        </div>

        <!-- article: thông tin sản phẩm là nội dung độc lập -->
        <article>
          <h2>Tên sản phẩm</h2>
          <!-- tiêu đề sản phẩm -->
          <p>Giá sản phẩm</p>
          <!-- mô tả giá -->
          <p>Đánh giá ⭐⭐⭐⭐⭐</p>
          <!-- đánh giá -->
          <p>Mô tả sản phẩm</p>
          <!-- mô tả -->
        </article>
      </section>

      <!-- section: bảng thông số kỹ thuật -->
      <section>
        <h2>Thông số kỹ thuật</h2>
        <table>
          <!-- table: dùng cho dữ liệu dạng bảng -->
          <tr>
            <th>Thông số</th>
            <!-- th: tiêu đề cột -->
            <th>Chi tiết</th>
          </tr>
          <tr>
            <td>CPU</td>
            <!-- td: dữ liệu -->
            <td>...</td>
          </tr>
        </table>
      </section>

      <!-- section: đánh giá / bình luận -->
      <section>
        <h2>Đánh giá</h2>

        <!-- article: mỗi bình luận là nội dung độc lập -->
        <article>
          <p>Người dùng A: Sản phẩm tốt</p>
        </article>

        <article>
          <p>Người dùng B: Rất hài lòng</p>
        </article>
      </section>

      <!-- aside: nội dung phụ (sidebar) -->
      <aside>
        <h2>Sản phẩm tương tự</h2>

        <!-- article: mỗi sản phẩm là 1 nội dung độc lập -->
        <article>
          <p>Sản phẩm 1</p>
        </article>

        <article>
          <p>Sản phẩm 2</p>
        </article>
      </aside>
    </main>

    <!-- footer: phần cuối trang -->
    <footer>
      <p>© 2026 Shop</p>
    </footer>
  </body>
</html>
```

### Câu C2 — So sánh & Tranh luận

Ý kiến cho rằng chỉ cần dùng `<div>` và thêm class cho mọi thành phần là đủ thực ra chưa tối ưu về mặt kỹ thuật. Trước hết, về SEO, các công cụ tìm kiếm như Google không chỉ đọc nội dung mà còn phân tích cấu trúc HTML. Khi sử dụng các thẻ semantic như `<header>`, `<main>`, `<article>`, trang web cung cấp ngữ cảnh rõ ràng hơn, giúp công cụ tìm kiếm hiểu nội dung chính, từ đó cải thiện khả năng xếp hạng. Ngược lại, nếu lạm dụng `<div>`, toàn bộ trang sẽ trở nên “vô nghĩa” đối với bot.

Thứ hai, về accessibility, các phần mềm hỗ trợ như NVDA dựa vào semantic HTML để giúp người khiếm thị điều hướng trang. Ví dụ, họ có thể nhanh chóng chuyển đến khu vực menu (`<nav>`) hoặc nội dung chính (`<main>`). Nếu chỉ dùng `<div>`, trải nghiệm này sẽ bị hạn chế đáng kể.

Một ví dụ cụ thể là breadcrumb. Khi sử dụng semantic:

```html
<nav aria-label="breadcrumb">
  <ol>
    <li><a href="/">Trang chủ</a></li>
    <li>Điện thoại</li>
  </ol>
</nav>
```

cả trình duyệt và công cụ hỗ trợ đều hiểu đây là điều hướng phân cấp. Nếu dùng `<div>`, ý nghĩa này không rõ ràng.

Tuy nhiên, `<div>` vẫn cần thiết trong những trường hợp không mang ý nghĩa nội dung, như làm container layout hoặc hỗ trợ CSS. Vì vậy, semantic HTML không phải là dư thừa mà là cách viết code rõ ràng, chuẩn và hiệu quả hơn.

## PHẦN B — THỰC HÀNH CODE

### Bài B3 — Gỡ lỗi HTML

Lỗi 1: Dòng 1 — <!DOCTYPE> sai chuẩn — Sửa thành `<!DOCTYPE html>`

Lỗi 2: Dòng 3 — Thiếu thuộc tính ngôn ngữ cho `<html>` — Thêm `lang="vi"`

Lỗi 3: Dòng 5 — Thẻ `<title>` không đóng — Thêm `</title>`

Lỗi 4: Dòng 6 — `charset="utf8"` sai chuẩn — Sửa thành `UTF-8`

Lỗi 5: Dòng 10 — `<h1>` không đóng đúng — Sửa `</h1>`

Lỗi 6: Dòng 14 — Thẻ `<a>` không đóng — Sửa `</a>`

Lỗi 7: Dòng 21 — `<img>` thiếu dấu ngoặc kép và alt — Sửa `src="iphone.jpg" `và thêm alt

Lỗi 8: Dòng 23 — Thẻ `<b>` đóng sai vị trí — Đưa `</b>` vào trong `<p>`

Lỗi 9: Dòng 28 — Bảng thiếu semantic (`<thead>`, `<tbody>`) — Thêm các phần này

Lỗi 10: Dòng 29 — Dùng `<td>` cho tiêu đề — Sửa thành `<th>`

Lỗi 11: Dòng 39 — Có 2 thẻ `<main>` (sai semantic) — Đổi cái thứ hai thành `<aside>`

Lỗi 12: Dòng 44 — Thẻ `<p>` trong footer không đóng — Thêm `</p>`

Lỗi 13: Dòng 20 — Heading nhảy cấp từ h1 → h3 — Sửa h3 thành h2 cho đúng hierarchy

### Bài B4 — Phân tích trang web thật

## 1. Semantic HTML

![alt text](semantic.png)
3 thẻ semantic HTML5 được sử dụng

1. `<header>`

   Vị trí:

   `<header class="shopee-top shopee-top--sticky">`

   Ở đâu trên trang:
   Phần đầu trang (logo Shopee + thanh tìm kiếm + menu)

2. `<nav>`

   Vị trí:

   `<nav class="container navbar"></nav>`

   Ở đâu trên trang:
   Thanh menu điều hướng (bên dưới header)

3. `<footer>`

   Vị trí:

   `<footer role="contentinfo" class="..."></footer>`

   Ở đâu trên trang:
   Cuối trang web

**2 chỗ dùng semantic chưa đúng**

1. Lạm dụng `<div>` thay vì semantic

Ví dụ trong code:

```html
<div id="main">
  <div class="navbar-wrapper container-wrapper">
    <div class="container-wrapper header-with-search-wrapper"></div>
  </div>
</div>
```

Vấn đề:
Dùng `<div>` cho nhiều khu vực nội dung lớn
Đề xuất:

`<main>` thay cho div id="main"

`<section>` cho từng khu nội dung

`<article>` cho sản phẩm

2. Không dùng `<main>` cho nội dung chính

   Hiện tại:

   `<div id="main">`

   Vấn đề:

   Không đúng semantic HTML5

   Nên dùng: `<main>`

## 2. Table

Shopee không sử dụng thẻ `<table>` để hiển thị dữ liệu.
Thay vào đó, họ dùng `<div>` kết hợp CSS để layout.

Điều này giúp:

- Linh hoạt giao diện
- Responsive tốt hơn

Tuy nhiên:

- Không tối ưu semantic HTML
- Khó cho screen reader

## 3. Form

![alt text](form.png)

1.Thông tin `<form>`

Từ DevTools:

`<form role="search" autocomplete="off" class="shopee-searchbar">`

- `<action>`:

  KHÔNG thấy action

  Có nghĩa:
  Form không submit theo cách truyền thống
  Dùng JavaScript (AJAX)

- method:
  KHÔNG có method

  Mặc định sẽ là:
  GET

Nhưng thực tế: Shopee xử lý bằng JS

2.Input types được dùng

1. type="text"

`<input ... class="shopee-searchbar-input__input">`
Ô nhập từ khóa tìm kiếm

2. `<button type="button">`

`<button type="button" class="...">`
Nút tìm kiếm
KHÔNG phải submit
Xác nhận: dùng JavaScript thay vì submit form
