## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — 5 Loại Positioning

| Position   | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí                                | Cuộn theo trang? | Use case                                       |
| ---------- | ------------------------- | ------------------------------------------------ | ---------------- | ---------------------------------------------- |
| `static`   | Có                        | Vị trí mặc định của document flow                | Có               | Layout bình thường mặc định                    |
| `relative` | Có                        | So với vị trí gốc của chính nó                   | Có               | Dịch chuyển nhẹ element, làm mốc cho absolute  |
| `absolute` | Không                     | So với ancestor gần nhất có position khác static | Có               | Badge, tooltip, menu nổi, icon đè lên ảnh      |
| `fixed`    | Không                     | So với viewport (màn hình trình duyệt)           | Không            | Navbar cố định, nút “Back to top”, chat button |
| `sticky`   | Có                        | Ban đầu theo flow, sau đó bám theo viewport      | Không            | Header dính khi scroll, menu sidebar           |

1. Khi nào absolute tham chiếu Parent?

- Phần tử absolute sẽ tham chiếu (lấy tọa độ top, left, right, bottom theo) một phần tử cha/tổ tiên khi:

- Phần tử cha đó có position là relative, absolute, fixed, hoặc sticky.

- Nó sẽ tìm phần tử gần nó nhất thỏa mãn điều kiện trên.

- Ví dụ: Nếu bạn có cấu trúc: Grandparent (static) > Parent (relative) > Child (absolute).

- Lúc này, Child sẽ canh lề theo Parent vì Parent là tổ tiên gần nhất có định vị.

2. Khi nào absolute tham chiếu Body (Viewport)?

- Phần tử absolute sẽ tham chiếu đến Initial Containing Block (thường tương ứng với thẻ <html> hoặc hiểu đơn giản là khung hình trình duyệt/body) khi:

- Tất cả các phần tử cha/tổ tiên của nó đều có position: static (mặc định).

- Nó tìm mãi ngược lên trên mà không thấy bất kỳ "người thân" nào được định vị, nó sẽ chọn điểm tựa cuối cùng là cửa sổ trình duyệt.

3. Khái niệm "Nearest Positioned Ancestor" là gì?

- Một phần tử được coi là "Positioned" (đã được định vị) khi thuộc tính position của nó được đặt là một trong các giá trị: relative, absolute, fixed, hoặc sticky. Nếu một phần tử có position: static (giá trị mặc định), nó được coi là "non-positioned".

- Nearest Positioned Ancestor là phần tử cha, ông, hoặc cụ... (ngược lên trên cây DOM) đầu tiên mà bạn gặp có thuộc tính position khác với static.

### Câu A2 — Flexbox vs Grid

**Trường hợp 1**

```css
.container {
  display: flex;
}
.item {
  flex: 1;
}
```

display: flex → các item nằm trên cùng 1 hàng

flex: 1 → chia đều chiều rộng

4 items → bố cục

+------+------+------+------+
| 1 | 2 | 3 | 4 |
+------+------+------+------+

→ 1 hàng, 4 cột bằng nhau.

**Trường hợp 2**

```css
.container {
  display: flex;
  flex-wrap: wrap;
}

.item {
  width: 45%;
  margin: 2.5%;
}
```

Phân tích

Mỗi item chiếm:

45% + 2.5% + 2.5% = 50%

→ mỗi hàng chứa được 2 item.

Có 6 items:

6 / 2 = 3 hàng

Bố cục
+----------+----------+
| 1 | 2 |
+----------+----------+

+----------+----------+
| 3 | 4 |
+----------+----------+

+----------+----------+
| 5 | 6 |
+----------+----------+

→ 3 hàng × 2 cột.

**Trường hợp 3**

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

Ý nghĩa

space-between

→ item đầu sát trái

→ item cuối sát phải

→ item giữa nằm giữa với khoảng cách đều

align-items: center

→ căn giữa theo chiều dọc

3 items → bố cục

|1 2 3|

Hoặc:

+---------------------------------------------------+
| |
| 1 2 3 |
| |
+---------------------------------------------------+

**Trường hợp 4**

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: 20px;
}
```

Ý nghĩa

Grid có 3 cột:

Cột 1 = 200px

Cột 2 = chiếm phần còn lại

Cột 3 = 200px

3 items → bố cục

+--------+----------------------+--------+
| 1 | 2 | 3 |
+--------+----------------------+--------+
200px flexible 200px

Thường dùng cho layout:

Sidebar | Content | Sidebar

**Trường hợp 5**

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
```

Ý nghĩa

repeat(3, 1fr)

→ grid có 3 cột bằng nhau.

Có 7 items.

Sắp xếp

Hàng 1: item 1 2 3

Hàng 2: item 4 5 6

Hàng 3: item 7

Bố cục

+------+------+------+
| 1 | 2 | 3 |
+------+------+------+

+------+------+------+
| 4 | 5 | 6 |
+------+------+------+

+------+  
| 7 |
+------+

→ 3 hàng.

→ Item cuối nằm ở:

hàng 3

cột 1.

## PHẦN C — SUY LUẬN

### Câu C1 — Flexbox vs Grid: Khi nào dùng gì?

1. Navigation bar ngang (logo + menu + buttons) : Flexbox

   Giải thích: Navbar là layout 1 chiều theo hàng ngang. Flexbox giúp căn giữa, giãn khoảng cách (justify-content), và responsive rất dễ.

2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước) : Grid

   Giải thích: Đây là layout 2 chiều (hàng + cột). Grid rất phù hợp để tạo các cột đều nhau như grid-template-columns: repeat(3, 1fr).

3. Layout blog: main content + sidebar : Grid

   Giải thích: Blog thường cần chia khu vực rõ ràng: content lớn + sidebar nhỏ. Grid giúp định nghĩa cột chính xác như 2fr 1fr.

4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ): Grid (hoặc Flexbox nếu đơn giản)

   Giải thích: Footer nhiều cột đều nhau nên Grid dễ quản lý hơn. Khi responsive có thể đổi từ 4 cột → 2 cột → 1 cột rất thuận tiện.

5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy) : Flexbox

   Giải thích: Card là layout theo chiều dọc. Dùng display: flex; flex-direction: column; và margin-top: auto để đẩy nút xuống đáy.

### Câu C2 (10đ) — Debug Flexbox

**Lỗi 1 — Cards không đều chiều cao, nút “Mua” nhảy lên/xuống**
Nguyên nhân

- Các card có lượng text khác nhau nên chiều cao khác nhau.
- Nút .btn nằm ngay sau nội dung nên card nào text dài hơn thì nút bị đẩy xuống thấp hơn.

Cách sửa

- Dùng Flexbox theo chiều dọc cho mỗi card và đẩy nút xuống đáy bằng margin-top: auto.

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  width: 30%;
  margin: 1.5%;

  display: flex;
  flex-direction: column;
}

.card img {
  width: 100%;
}

.card h3 {
  font-size: 18px;
}

.card .btn {
  padding: 10px;
  margin-top: auto;
}
```

**Lỗi 2 — Item không nằm giữa trong container 100vh**

Nguyên nhân

- display: flex chỉ bật Flexbox, nhưng chưa căn giữa.

Mặc định:

- justify-content: flex-start
- align-items: stretch

nên item vẫn nằm góc trên trái.

Cách sửa

```css
.hero {
  height: 100vh;
  display: flex;

  justify-content: center;
  align-items: center;
}

.hero-content {
  text-align: center;
}
```

**Lỗi 3 — Sidebar bị co lại khi content dài**

Nguyên nhân

- Trong Flexbox, các item mặc định có: flex-shrink: 1;

- Nên sidebar được phép co nhỏ khi content quá lớn.

Cách sửa

```css
.layout {
  display: flex;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
}

.content {
  flex: 1;
}
```
