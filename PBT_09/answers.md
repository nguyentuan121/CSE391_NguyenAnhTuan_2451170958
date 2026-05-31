## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — DOM Tree

**1. DOM Tree**

div#app
├── header
│ ├── h1
│ │ └── "Todo App"
│ └── nav
│ ├── a.active
│ │ └── "All"
│ ├── a
│ │ └── "Active"
│ └── a
│ └── "Completed"
│
└── main
├── form#todoForm
│ ├── input#todoInput
│ └── button
│ └── "Add"
│
└── ul#todoList
├── li.todo-item
│ └── "Learn HTML"
└── li.todo-item.completed
└── "Learn CSS"

**2. Query Selector**

a. Chọn thẻ `<h1>`

```js
document.querySelector("h1");
```

b. Chọn input trong form

```js
document.querySelector("#todoForm input");
```

hoặc

```js
document.querySelector("form input");
```

c. Chọn tất cả .todo-item

```js
document.querySelectorAll(".todo-item");
```

d. Chọn link đang active

```js
document.querySelector("a.active");
```

e. Chọn `<li>` đầu tiên trong #todoList

```js
document.querySelector("#todoList li:first-child");
```

f. Chọn tất cả `<a>` bên trong `<nav>`

```js
document.querySelectorAll("nav a");
```

### Câu A2 — innerHTML vs textContent

1. Sự khác nhau

| innerHTML                                | textContent              |
| ---------------------------------------- | ------------------------ |
| Đọc hoặc ghi cả HTML bên trong phần tử   | Chỉ đọc hoặc ghi văn bản |
| Hiểu các thẻ HTML                        | Không hiểu HTML          |
| Có thể tạo thêm phần tử mới              | Chỉ hiển thị dạng chữ    |
| Có nguy cơ XSS nếu dữ liệu từ người dùng | An toàn hơn              |

2. Ví dụ
   Dùng innerHTML

```js
const box = document.querySelector("#box");

box.innerHTML = "<h2>Hello</h2>";
```

Kết quả:

```html
<h2>Hello</h2>
```

Trình duyệt tạo ra thẻ h2.

Dùng textContent

```js
const box = document.querySelector("#box");

box.textContent = "<h2>Hello</h2>";
```

Kết quả hiển thị:

```html
<h2>Hello</h2>
```

Nó chỉ coi là văn bản, không tạo thẻ HTML.

3. Khi nào dùng?
   Dùng innerHTML

Khi muốn thêm HTML động:

```js
todoList.innerHTML += "<li>Learn JS</li>";
```

Dùng textContent

Khi hiển thị dữ liệu người dùng nhập vào:

```js
username.textContent = user.name;
```

An toàn hơn vì không chạy HTML.

Câu hỏi bảo mật
Tại sao innerHTML có thể gây XSS?

XSS (Cross-Site Scripting) xảy ra khi kẻ xấu chèn mã JavaScript vào trang web thông qua dữ liệu nhập.

Ví dụ:

```js
const userInput = "<img src=x onerror=\"alert('Hacked!')\">";

document.querySelector("#result").innerHTML = userInput;
```

Trình duyệt hiểu đây là thẻ `<img>`.

Khi ảnh lỗi (src=x không tồn tại), sự kiện onerror chạy:

```js
alert("Hacked!");
```

=> JavaScript của kẻ tấn công được thực thi.

Ví dụ nguy hiểm

```html
<input id="search" />

<div id="result"></div>
```

```js
const userInput = document.querySelector("#search").value;

document.querySelector("#result").innerHTML = userInput;
```

Người dùng nhập:

```html
<img src="x" onerror="alert('Hacked!')" />
```

Kết quả:

```html
<div id="result">
  <img src="x" onerror="alert('Hacked!')" />
</div>
```

Alert sẽ xuất hiện.

Sửa thế nào?

Dùng textContent thay vì innerHTML.

```js
const userInput = document.querySelector("#search").value;

document.querySelector("#result").textContent = userInput;
```

Bây giờ trình duyệt chỉ hiển thị:

```html
<img src="x" onerror="alert('Hacked!')" />
```

không tạo thẻ `<img>` và không chạy JavaScript.

### Câu A3 — Event Bubbling

1. Không dùng e.stopPropagation()

Khi click vào button:

outer
└── inner
└── btn

Sự kiện click xảy ra tại btn trước, sau đó nổi bọt (bubbling) lên các phần tử cha:

btn → inner → outer

Output:

BUTTON
INNER
OUTER 2. Có e.stopPropagation()

```js
document.querySelector("#btn").addEventListener("click", (e) => {
  console.log("BUTTON");
  e.stopPropagation();
});
```

stopPropagation() ngăn sự kiện tiếp tục nổi bọt lên phần tử cha.

Khi click button:

BUTTON

INNER và OUTER sẽ không chạy.

Giải thích ngắn gọn để đi thi
Event Bubbling: sự kiện đi từ phần tử được click lên các phần tử cha.
Thứ tự khi click button:
BUTTON
INNER
OUTER

- Nếu dùng e.stopPropagation():
  BUTTON

vì sự kiện bị chặn, không truyền lên inner và outer.

## PHẦN C — DEBUG & PHÂN TÍCH

### Câu C1 — Debug DOM Code

Các lỗi cần sửa

Lỗi 1: Sai tên event

- Lỗi

```js
document.querySelector("#decrementBtn").addEventListener("onclick", function() {
```

- Sửa lỗi

```js
document.querySelector("#decrementBtn").addEventListener("click", function() {
```

addEventListener() chỉ nhận "click", không phải "onclick".

Lỗi 2: Gán sai cho countDisplay

- Lỗi

```js
countDisplay = count;
```

- Sửa lỗi

```js
countDisplay.textContent = count;
```

countDisplay là phần tử DOM, không được gán bằng số.

Lỗi 3: Xóa history bằng null

- Lỗi

```js
historyList.innerHTML = null;
```

- Sửa lỗi

```js
historyList.innerHTML = "";
```

Nên dùng chuỗi rỗng để xóa nội dung.

Lỗi 4: Quên gọi hàm remove()

- Lỗi

```js
item.remove;
```

- Sửa lỗi

```js
item.remove();
```

Thiếu dấu () nên hàm không chạy.

Lỗi 5: Load count từ localStorage là String

- Lỗi

```js
count = localStorage.getItem("count");
```

- Sửa lỗi

```js
count = Number(localStorage.getItem("count")) || 0;
```

localStorage luôn trả về chuỗi.

Ví dụ:

```js
count = "5";
count++;
```

sẽ cho kết quả không mong muốn.

Lỗi 6: Không load lại history

Đã lưu:

```js
localStorage.setItem("history", historyList.innerHTML);
```

nhưng khi load lại không khôi phục.

Thiếu:

```js
historyList.innerHTML = localStorage.getItem("history") || "";
```

Lỗi 7: Sau khi load history, các item mất sự kiện click

Khi gán:

```js
historyList.innerHTML = savedHistory;
```

các li được tạo lại từ HTML nên không còn:

```js
li.addEventListener(...)
```

Cần gắn lại event:

```js
historyList.querySelectorAll("li").forEach((li) => {
  li.addEventListener("click", function () {
    deleteHistory(this);
  });
});
```

Lỗi 8: Reset không cập nhật localStorage ngay

Sau reset:

```js
count = 0;
```

nếu đóng tab bất thường có thể chưa lưu.

Nên cập nhật:

```js
localStorage.setItem("count", 0);
```

(đây là lỗi logic thường được chấp nhận trong bài debug).

### Câu C2 — Performance

1. Tại sao bind event lên 1000 elements là bad practice?

Tạo 1000 event listener → tốn bộ nhớ.
Khởi tạo chậm hơn.
Khó quản lý khi thêm/xóa phần tử.

Event Delegation:

Gắn 1 event lên phần tử cha, dùng e.target để xác định phần tử được click.

```js
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("item")) {
    console.log(e.target.textContent);
  }
});
```

=> Chỉ cần 1 listener thay vì 1000 listener.

2. Refactor bằng DocumentFragment

```js
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  div.textContent = `Item ${i}`;
  fragment.appendChild(div);
}

document.body.appendChild(fragment);
```

Giải thích:

Code cũ gọi:

```js
document.body.appendChild(div);
```

1000 lần ⇒ DOM cập nhật liên tục, gây nhiều reflow.

DocumentFragment tạo phần tử trong bộ nhớ trước, sau đó thêm vào DOM 1 lần, nên giảm reflow/repaint và chạy nhanh hơn.
