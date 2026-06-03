## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Sync vs Async

**Thứ tự output**

1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms

Giải thích từng bước

1. Chạy code đồng bộ (Call Stack)

```js
console.log("1 - Start");
```

In ra:

1 - Start

```js
setTimeout(() => console.log("2 - Timeout 0ms"), 0);
```

→ Không chạy ngay.

→ Callback được đưa vào Macrotask Queue.

```js
Promise.resolve().then(() => console.log("3 - Promise"));
```

→ Callback được đưa vào Microtask Queue.

```js
console.log("4 - End");
```

In ra:

4 - End

```js
setTimeout(() => console.log("5 - Timeout 100ms"), 100);
```

→ Chờ 100ms rồi mới vào Macrotask Queue.

```js
Promise.resolve().then(() => {
  console.log("6 - Promise 2");
  setTimeout(() => console.log("7 - Nested timeout"), 0);
});
```

→ Callback được đưa vào Microtask Queue.

2. Call Stack rỗng

Lúc này:

Microtask Queue

3 - Promise

6 - Promise 2

Macrotask Queue

2 - Timeout 0ms

3. Xử lý Microtask Queue trước

Chạy:

```js
console.log("3 - Promise");
```

In:

3 - Promise

Chạy:

```js
console.log("6 - Promise 2");
```

In:

6 - Promise 2

Sau đó:

```js
setTimeout(() => console.log("7 - Nested timeout"), 0);
```

→ Thêm vào cuối Macrotask Queue

Macrotask Queue:

2 - Timeout 0ms

7 - Nested timeout

4. Xử lý Macrotask Queue

Chạy:

2 - Timeout 0ms

In:

2 - Timeout 0ms

Tiếp theo:

7 - Nested timeout

In:

7 - Nested timeout

5. Sau khoảng 100ms

Callback:

5 - Timeout 100ms

được đưa vào Macrotask Queue và chạy.

In:

5 - Timeout 100ms
Event Loop là gì?

Event Loop là cơ chế của JavaScript dùng để kiểm tra:

- Call Stack có rỗng không?
- Nếu rỗng → chạy toàn bộ Microtask Queue.
- Sau khi Microtask Queue rỗng → lấy 1 tác vụ từ Macrotask Queue để chạy.
- Lặp lại liên tục.

Microtask Queue

Chứa:

```js
Promise.then();
Promise.catch();
Promise.finally();
queueMicrotask();
MutationObserver;
```

Ví dụ:

```js
Promise.resolve().then(() => console.log("Microtask"));
```

Ưu tiên cao hơn Macrotask.

Macrotask Queue

Chứa:

```js
setTimeout()
setInterval()
setImmediate() (Node.js)
I/O events
UI events
```

Ví dụ:

```js
setTimeout(() => console.log("Macrotask"), 0);
```

### Câu A2 — Fetch API

Giải thích từng dòng

1. Khai báo hàm async

```js
async function getData() {
```

- async biến hàm thành hàm bất đồng bộ (asynchronous).
- Hàm luôn trả về một Promise.

Ví dụ:

```js
async function test() {
  return 100;
}
```

Tương đương:

```js
function test() {
  return Promise.resolve(100);
}
```

2. try...catch

```js
try {
```

Dùng để bắt lỗi khi gọi API hoặc xử lý dữ liệu.

3. Gọi API

```js
const response = await fetch("https://api.example.com/data");
```

fetch() trả về gì?

fetch() trả về một Promise<Response>

Ví dụ:

```js
const p = fetch(url);
console.log(p);
```

Kết quả:

```js
Promise { <pending> }
```

Tại sao cần await?

Nếu không dùng await:

```js
const response = fetch(url);
```

thì:

```js
response;
```

là Promise chứ chưa phải dữ liệu Response.

Muốn lấy Response phải:

```js
const response = await fetch(url);
```

hoặc:

```js
fetch(url).then(response => ...)
```

4. Kiểm tra trạng thái HTTP

```js
if (!response.ok) {
```

response.ok là boolean.

Khi nào response.ok = true?

Khi status nằm trong khoảng:

```js
200 → 299
```

Ví dụ:

```js
200 OK
201 Created
204 No Content
```

Khi nào response.ok = false?

Khi status không thuộc 200–299.

Ví dụ:

| Status | Ý nghĩa               |
| ------ | --------------------- |
| 404    | Not Found             |
| 401    | Unauthorized          |
| 500    | Internal Server Error |

5. Ném lỗi

```js
throw new Error(`HTTP ${response.status}`);
```

Ví dụ:

```js
HTTP 404
```

hoặc

```js
HTTP 500
```

Lỗi sẽ nhảy xuống catch.

6. Chuyển JSON thành object

```js
const data = await response.json();
```

Tại sao phải await lần nữa?

response.json() cũng trả về Promise.

Ví dụ:

```js
const data = response.json();
console.log(data);
```

Kết quả:

```js
Promise { <pending> }
```

Do đó cần:

```js
const data = await response.json();
```

để đợi việc parse JSON hoàn tất.

Ví dụ:

Server trả về:

```js
{
    "name": "Tuan",
    "age": 20
}
```

Sau khi:

```js
const data = await response.json();
```

ta nhận được:

```js
{
    name: "Tuan",
    age: 20
}
```

7. Trả dữ liệu

```js
return data;
```

Trả object JSON đã được parse.

8. Bắt lỗi

```js
catch (error) {
```

Nếu có lỗi trong khối try thì chương trình nhảy vào đây.

9. In lỗi

```js
console.error("Failed:", error.message);
```

Ví dụ:

```js
Failed: HTTP 404
```

10. Trả về null

```js
return null;
```

Báo cho nơi gọi hàm biết rằng việc lấy dữ liệu thất bại.

try...catch bắt những lỗi nào?

1. Network Error

Ví dụ:

```js
await fetch("https://abcxyz123.com");
```

Không kết nối được server.

Kết quả:

```js
TypeError: Failed to fetch
```

→ Bị catch.

2. JSON Parse Error

Ví dụ server trả:

```js
Hello World
```

nhưng code:

```js
await response.json();
```

Kết quả:

```js
SyntaxError;
```

→ Bị catch.

3. Lỗi do throw Error()

Ví dụ:

```js
if (!response.ok) {
  throw new Error("HTTP 404");
}
```

→ Bị catch.

4. 404 hoặc 500 tự động gây lỗi? ❌

Nhiều người nhầm chỗ này.

```js
const response = await fetch(url);
```

Nếu server trả:

```js
404;
500;
401;
```

thì fetch() vẫn thành công và vẫn trả về Response.

Ví dụ:

```js
const response = await fetch("/not-found");

console.log(response.status);
```

Kết quả:

```js
404;
```

Nhưng chương trình không nhảy vào catch.

Vì vậy phải tự kiểm tra:

```js
if (!response.ok) {
    throw new Error(...);
}
```

### Câu A3 — Promise States

Vẽ sơ đồ 3 trạng thái của Promise (Pending → Fulfilled, Pending → Rejected).

Giải thích: Callback Hell là gì? Viết ví dụ 4 cấp callback hell → Refactor thành async/await.

1.  Sơ đồ 3 trạng thái của Promise

               Promise
                  |
               Pending
              /       \
             /         \

    resolve() reject()
    | |
    v v
    Fulfilled Rejected
    Ý nghĩa

Pending

- Trạng thái ban đầu.
- Chưa có kết quả.

Ví dụ:

```js
const promise = new Promise((resolve, reject) => {
  // đang xử lý
});
```

Fulfilled

- Thực hiện thành công.
- resolve(value) được gọi.

Ví dụ:

```js
const promise = new Promise((resolve) => {
  resolve("Success");
});
```

Kết quả:

```js
Fulfilled;
```

Rejected

- Thực hiện thất bại.
- reject(error) được gọi.

Ví dụ:

```js
const promise = new Promise((resolve, reject) => {
  reject("Error");
});
```

Kết quả:

```js
Rejected;
```

2. Callback Hell là gì?

Callback Hell là tình trạng nhiều callback lồng nhau quá sâu khiến code:

- Khó đọc
- Khó bảo trì
- Khó debug
- Dễ gây lỗi

Thường được gọi là:

```js
Pyramid of Doom
```

vì code thụt vào như hình kim tự tháp.

3. Ví dụ Callback Hell 4 cấp

```js
getUser(function (user) {
  getPosts(user.id, function (posts) {
    getComments(posts[0].id, function (comments) {
      getLikes(comments[0].id, function (likes) {
        console.log(likes);
      });
    });
  });
});
```

Nhìn dạng:

```js
getUser(getPosts(getComments(getLikes())));
```

Rất khó đọc.

4. Refactor bằng Promise

```js
getUser()
  .then((user) => getPosts(user.id))
  .then((posts) => getComments(posts[0].id))
  .then((comments) => getLikes(comments[0].id))
  .then((likes) => console.log(likes))
  .catch((error) => console.error(error));
```

Code đã phẳng hơn.

5. Refactor bằng async/await

```js
async function loadData() {
  try {
    const user = await getUser();

    const posts = await getPosts(user.id);

    const comments = await getComments(posts[0].id);

    const likes = await getLikes(comments[0].id);

    console.log(likes);
  } catch (error) {
    console.error(error);
  }
}
```

So sánh

```js
Callback Hell
getUser(function(user) {
    getPosts(user.id, function(posts) {
        getComments(posts[0].id, function(comments) {
            getLikes(comments[0].id, function(likes) {
                console.log(likes);
            });
        });
    });
});
```

Async/Await

```js
async function loadData() {
  const user = await getUser();
  const posts = await getPosts(user.id);
  const comments = await getComments(posts[0].id);
  const likes = await getLikes(comments[0].id);

  console.log(likes);
}
```

## PHẦN C — PHÂN TÍCH

### Câu C1 — Error Handling Strategy

Trong app E-Commerce (mua hàng online), lỗi API xảy ra rất thường xuyên. Cần xử lý để người dùng không bị mất dữ liệu và có trải nghiệm tốt.

---

**1. Network Errors (Mất mạng)**

### Tình huống

- WiFi bị ngắt
- 4G yếu
- DNS lỗi
- Server không kết nối được

Ví dụ:

```js
try {
  const response = await fetch(url);
} catch (error) {
  console.log(error);
}
```

Lỗi:

```text
TypeError: Failed to fetch
```

---

### Cách xử lý

- Hiện thông báo:

```text
Không có kết nối Internet
Vui lòng thử lại
```

- Hiện nút Retry
- Lưu giỏ hàng vào LocalStorage
- Tự động thử lại khi có mạng

Ví dụ:

```js
try {
  const response = await fetch(url);
} catch (error) {
  alert("Mất kết nối Internet");
}
```

---

**2. API Errors**

### 404 Not Found

### Ý nghĩa

API hoặc sản phẩm không tồn tại.

Ví dụ:

```text
GET /products/99999

404 Not Found
```

### Xử lý

```js
if (response.status === 404) {
  throw new Error("Sản phẩm không tồn tại");
}
```

Hiển thị:

```text
Không tìm thấy sản phẩm
```

---

### 500 Internal Server Error

### Ý nghĩa

Lỗi phía server.

Ví dụ:

```text
500 Internal Server Error
```

### Xử lý

```js
if (response.status === 500) {
  throw new Error("Lỗi hệ thống");
}
```

Hiển thị:

```text
Hệ thống đang bảo trì
Vui lòng thử lại sau
```

---

### 429 Too Many Requests

### Ý nghĩa

Gửi quá nhiều request.

Ví dụ:

```text
429 Too Many Requests
```

### Xử lý

```js
if (response.status === 429) {
  throw new Error("Quá nhiều yêu cầu");
}
```

Hiển thị:

```text
Bạn thao tác quá nhanh.
Vui lòng thử lại sau vài giây.
```

Có thể delay trước khi gọi lại API.

---

### Ví dụ xử lý API Error tổng quát

```js
async function getProducts() {
  const response = await fetch("/api/products");

  if (!response.ok) {
    switch (response.status) {
      case 404:
        throw new Error("Không tìm thấy dữ liệu");

      case 429:
        throw new Error("Quá nhiều yêu cầu");

      case 500:
        throw new Error("Lỗi server");

      default:
        throw new Error("Unknown error");
    }
  }

  return response.json();
}
```

---

**3. Timeout (> 10 giây)**

### Vấn đề

API quá chậm.

Ví dụ:

```text
10 giây
20 giây
30 giây
```

Người dùng tưởng ứng dụng bị treo.

---

### fetchWithTimeout()

```js
async function fetchWithTimeout(url, ms = 10000) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, ms);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    return response;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timeout");
    }

    throw error;
  }
}
```

---

### Sử dụng

```js
try {
  const response = await fetchWithTimeout("/api/products", 10000);
} catch (error) {
  console.log(error.message);
}
```

Nếu quá 10 giây:

```text
Request timeout
```

---

**4. Retry Logic (Thử lại 3 lần)**

### Khi nào nên retry?

✔ Network Error

✔ Mất mạng tạm thời

✔ Server tạm thời không phản hồi

---

### Khi nào không retry?

404

401

403

Vì retry cũng không có tác dụng.

---

### fetchWithRetry()

```js
async function fetchWithRetry(url, maxRetries = 3) {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response;
    } catch (error) {
      attempt++;

      console.log(`Retry ${attempt}/${maxRetries}`);

      if (attempt >= maxRetries) {
        throw error;
      }
    }
  }
}
```

---

### Sử dụng

```js
try {
  const response = await fetchWithRetry("/api/products", 3);

  const data = await response.json();

  console.log(data);
} catch (error) {
  console.log("Thất bại hoàn toàn");
}
```

---

#### Retry có Delay (Thực tế hơn)

```js
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 1; i <= maxRetries; i++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response;
    } catch (error) {
      if (i === maxRetries) {
        throw error;
      }

      await sleep(1000);
    }
  }
}
```

---

### Chiến lược tổng thể cho E-Commerce

| Tình huống     | Xử lý                            |
| -------------- | -------------------------------- |
| Network Error  | Thông báo mất mạng + Retry       |
| 404            | Báo dữ liệu không tồn tại        |
| 500            | Báo lỗi hệ thống, thử lại sau    |
| 429            | Chờ vài giây rồi gọi lại         |
| Timeout > 10s  | Hủy request bằng AbortController |
| Lỗi tạm thời   | Retry tối đa 3 lần               |
| Retry thất bại | Hiện thông báo lỗi cuối cùng     |

---

### Câu C2 — Promise.all vs Promise.allSettled vs Promise.race

# Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race vs Promise.any

### Bảng so sánh

| Method                 | Khi nào resolve?                                         | Khi nào reject?            | Use case                        |
| ---------------------- | -------------------------------------------------------- | -------------------------- | ------------------------------- |
| `Promise.all()`        | Tất cả Promise thành công                                | Chỉ cần 1 Promise thất bại | Cần toàn bộ dữ liệu             |
| `Promise.allSettled()` | Khi tất cả Promise hoàn thành (thành công hoặc thất bại) | Không reject               | Muốn biết kết quả từng Promise  |
| `Promise.race()`       | Promise đầu tiên resolve                                 | Promise đầu tiên reject    | Timeout, lấy kết quả nhanh nhất |
| `Promise.any()`        | Promise đầu tiên resolve                                 | Tất cả Promise đều reject  | Dùng server dự phòng (fallback) |

---

### 1. Promise.all()

### Nguyên tắc

```text
Tất cả phải thành công
```

Nếu 1 Promise lỗi:

```text
=> reject ngay
```

---

### Scenario thực tế

Trang Product Detail của E-Commerce cần:

- Thông tin sản phẩm
- Đánh giá
- Danh sách sản phẩm liên quan

Thiếu một phần thì trang không hiển thị được.

```js
async function loadProductPage(id) {
  const [product, reviews, related] = await Promise.all([
    fetch(`/api/products/${id}`).then((r) => r.json()),

    fetch(`/api/reviews/${id}`).then((r) => r.json()),

    fetch(`/api/related/${id}`).then((r) => r.json()),
  ]);

  return {
    product,
    reviews,
    related,
  };
}
```

---

### Nếu reviews lỗi?

```text
Promise.all()
    ↓
reject ngay
```

Trang báo lỗi.

---

### 2. Promise.allSettled()

### Nguyên tắc

```text
Chờ tất cả hoàn thành
```

Không quan tâm thành công hay thất bại.

---

### Kết quả trả về

```js
[
  { status: "fulfilled", value: ... },

  { status: "rejected", reason: ... }
]
```

---

### Scenario thực tế

Trang Dashboard Admin.

Cần tải:

- Users
- Orders
- Revenue
- Notifications

Nếu Notifications lỗi thì vẫn hiển thị phần còn lại.

```js
const results = await Promise.allSettled([
  fetch("/api/users").then((r) => r.json()),

  fetch("/api/orders").then((r) => r.json()),

  fetch("/api/revenue").then((r) => r.json()),

  fetch("/api/notifications").then((r) => r.json()),
]);

console.log(results);
```

Ví dụ:

```js
[
  { status: "fulfilled", value: users },
  { status: "fulfilled", value: orders },
  { status: "fulfilled", value: revenue },
  { status: "rejected", reason: Error(...) }
]
```

---

### Ưu điểm

```text
Users ✔
Orders ✔
Revenue ✔
Notifications ✘
```

Dashboard vẫn hoạt động.

---

### 3. Promise.race()

### Nguyên tắc

```text
Ai hoàn thành trước thì thắng
```

Có thể:

```text
resolve trước
hoặc
reject trước
```

---

### Scenario thực tế

Timeout API sau 10 giây.

```js
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Request timeout"));
    }, ms);
  });
}
```

---

```js
const response = await Promise.race([fetch("/api/products"), timeout(10000)]);
```

---

### Trường hợp 1

API trả về sau:

```text
3 giây
```

Kết quả:

```text
fetch thắng
```

---

### Trường hợp 2

API trả về sau:

```text
15 giây
```

Kết quả:

```text
timeout thắng
```

Lỗi:

```text
Request timeout
```

---

### 4. Promise.any()

### Nguyên tắc

```text
Promise đầu tiên thành công sẽ thắng
```

Bỏ qua các Promise bị reject.

---

### Chỉ reject khi

```text
TẤT CẢ đều reject
```

---

### Scenario thực tế

CDN dự phòng.

Ảnh sản phẩm có thể lấy từ:

- Server Việt Nam
- Server Singapore
- Server Nhật

Server nào trả nhanh và thành công trước thì dùng.

```js
const image = await Promise.any([
  fetch("https://vn-cdn.com/image.jpg"),

  fetch("https://sg-cdn.com/image.jpg"),

  fetch("https://jp-cdn.com/image.jpg"),
]);
```

---

### Trường hợp

```text
VN ❌
SG ❌
JP ✔
```

Kết quả:

```text
JP thắng
```

---

### Trường hợp

```text
VN ❌
SG ❌
JP ❌
```

Kết quả:

```text
AggregateError
```

---

### So sánh trực quan

Giả sử có:

```js
const p1 = Promise.resolve("A");
const p2 = Promise.reject("B");
const p3 = Promise.resolve("C");
```

---

### Promise.all()

```js
await Promise.all([p1, p2, p3]);
```

Kết quả:

```text
Reject: B
```

---

### Promise.allSettled()

```js
await Promise.allSettled([p1, p2, p3]);
```

Kết quả:

```js
[
  { status: "fulfilled", value: "A" },
  { status: "rejected", reason: "B" },
  { status: "fulfilled", value: "C" },
];
```

---

### Promise.race()

```js
await Promise.race([p1, p2, p3]);
```

Kết quả:

```text
Promise nào hoàn thành đầu tiên
```

---

### Promise.any()

```js
await Promise.any([p1, p2, p3]);
```

Kết quả:

```text
A
```

(vì A là Promise resolve đầu tiên)

---
