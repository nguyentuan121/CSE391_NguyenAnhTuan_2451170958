## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — var / let / const

1. Đoạn 1

```js
console.log(x);
var x = 5;
```

Dự đoán output

- undefined

Giải thích

- var được hoisting (đưa lên đầu phạm vi).

- JavaScript hiểu gần giống:

```js
var x;
console.log(x);
x = 5;
```

Biến tồn tại nhưng chưa có giá trị nên in ra undefined.

2. Đoạn 2

```js
console.log(y);
let y = 10;
```

Dự đoán output

- ReferenceError
  Giải thích
- let cũng được hoisting nhưng rơi vào Temporal Dead Zone (TDZ).

- Không được dùng biến trước khi khai báo.

3. Đoạn 3

```js
const z = 15;
z = 20;
console.log(z);
```

Dự đoán output

- TypeError
  Giải thích

- const là hằng số → không thể gán lại giá trị sau khi khởi tạo.

Lỗi xuất hiện ở: `z = 20`;

4. Đoạn 4

```js
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```

Dự đoán output

- [1, 2, 3, 4]

Giải thích

- const không cho đổi tham chiếu của biến, nhưng vẫn có thể thay đổi nội dung object hoặc array.

Sai:

- arr = [5,6];

Đúng:

- arr.push(4);

5. Đoạn 5

```js
let a = 1;

{
  let a = 2;
  console.log("Trong block:", a);
}

console.log("Ngoài block:", a);
```

Dự đoán output

- Trong block: 2
- Ngoài block: 1
  Giải thích

- let có block scope.

- Biến a bên trong {} là biến khác với a bên ngoài.

**Các kết quả “bất ngờ”**

| Trường hợp                                    | Lý do                                           |
| --------------------------------------------- | ----------------------------------------------- |
| `var` in ra `undefined`                       | Do hoisting                                     |
| `let` bị lỗi                                  | Do Temporal Dead Zone                           |
| `const` vẫn `push()` được                     | Vì chỉ cấm gán lại biến, không cấm sửa nội dung |
| `let` trong block không ảnh hưởng ngoài block | Vì có block scope                               |

### Câu A2 — Data Types & Coercion

Giải thích từng dòng

1.  `typeof null`

Kết quả:

"object"

Đây là lỗi lịch sử của JavaScript nhưng vẫn được giữ lại để tương thích.

2.  `typeof undefined`

Kết quả:

"undefined"

undefined là kiểu dữ liệu riêng.

3.  `typeof NaN `

Kết quả:

"number"

NaN nghĩa là “Not a Number” nhưng vẫn thuộc kiểu number.

4.  `"5" + 3`

Kết quả:

"53"

Dấu + có thể nối chuỗi.

Số 3 bị ép kiểu thành "3":

`"5" + "3"` 5.
`"5" - 3`

Kết quả:

2

Dấu - chỉ dùng cho toán học nên JavaScript ép "5" thành số:

`5 - 3` 6.
`"5" * "3"`

Kết quả:

`15`

Toán tử \* ép cả hai chuỗi thành số.

7.  `true + true`

Kết quả:

`2`

Trong phép toán:

`true  -> 1`
`false -> 0`

Nên:

`1 + 1 = 2` 8.
`[] + []`

Kết quả:

""

Mảng rỗng chuyển thành chuỗi rỗng:

"" + "" 9.
`[] + {}`

Kết quả:

"[object Object]"

[] → ""

{} → "[object Object]"

Nên:

"" + "[object Object]"

10. {} + []

Kết quả:

0

JavaScript hiểu:

+[]

Mà:

`[] -> ""`

`"" -> 0`

Nên kết quả là:

0
Vì sao "5" + 3 và "5" - 3 khác nhau?
"5" + 3

Toán tử + có thể dùng để nối chuỗi.

Nên JavaScript ưu tiên ép sang chuỗi:

"5" + "3" = "53"
"5" - 3

Toán tử - chỉ dùng cho số.

JavaScript ép "5" thành số:

5 - 3 = 2

### Câu A3 — So sánh == vs ===

```js
console.log(5 == "5"); // true
console.log(5 === "5"); // false
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(NaN == NaN); // false
console.log(0 == false); // true
console.log(0 === false); // false
console.log("" == false); // true
```

Nên dùng == hay ===?
Nên dùng:
===
Vì sao?

===:

không ép kiểu

dễ đoán kết quả

tránh bug khó hiểu

### Câu A4 — Truthy & Falsy

Falsy values

```js
false;
0 - 0;
0n;
("");
null;
undefined;
NaN;
```

```js
if ("0") console.log("A"); // In A
if ("") console.log("B"); // Không in
if ([]) console.log("C"); // In C
if ({}) console.log("D"); // In D
if (null) console.log("E"); // Không in
if (0) console.log("F"); // Không in
if (-1) console.log("G"); // In G
if (" ") console.log("H"); // In H
```

### Câu A5 — Template Literals

```js
// Cách 1
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```

## PHẦN C — SUY LUẬN

### Câu C1 — Debug JavaScript

**Các lỗi và cách sửa**

| Lỗi                              | Giải thích                        | Cách sửa                        |
| -------------------------------- | --------------------------------- | ------------------------------- |
| `"100000"` là string             | Dễ gây ép kiểu ngầm               | Đổi thành `100000`              |
| Thiếu `;`                        | Không bắt buộc nhưng nên có       | Thêm `;`                        |
| `if (giaSauGiam = 0)`            | Dùng phép gán `=` thay vì so sánh | Đổi thành `===`                 |
| `giaSauGiam = 0` luôn gán bằng 0 | Điều kiện luôn false              | Dùng `giaSauGiam === 0`         |
| `var i` trong `for`              | `var` không có block scope        | Đổi thành `let i`               |
| `setTimeout` in sai số           | Sau 1s thì `i = 5`                | `let` tạo scope riêng từng vòng |
| Hàm không kiểm tra kiểu dữ liệu  | Có thể truyền string/null         | Nên kiểm tra `typeof`           |

Lỗi ẩn liên quan đến var

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("Item " + i);
  }, 1000);
}
```

Kết quả thực tế

```js
Item 5
Item 5
Item 5
Item 5
Item 5
```

Vì sao?

- var không có block scope.

- Sau khi vòng lặp kết thúc:

`i = 5`

Tất cả callback đều dùng chung biến i.

Sửa bằng let

```js
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("Item " + i);
  }, 1000);
}
```

Kết quả

```js
Item 0
Item 1
Item 2
Item 3
Item 4
```

### Câu C2 — Bài toán thực tế

```js
const monAn = [
  { ten: "Phở bò", gia: 65000, soLuong: 2 },
  { ten: "Trà đá", gia: 5000, soLuong: 3 },
  { ten: "Bún chả", gia: 55000, soLuong: 1 },
];

const isWednesday = true;
const hasTip = true;

let tong = 0;

console.log("╔══════════════════════════════════════╗");
console.log("║        HÓA ĐƠN NHÀ HÀNG             ║");
console.log("╠══════════════════════════════════════╣");

monAn.forEach((mon, index) => {
  let thanhTien = mon.gia * mon.soLuong;
  tong += thanhTien;

  console.log(
    `║ ${index + 1}. ${mon.ten.padEnd(10)} x${mon.soLuong} @${mon.gia / 1000}k = ${thanhTien.toLocaleString()}đ ║`,
  );
});

let giamGia = 0;

if (tong > 1000000) {
  giamGia = tong * 0.15;
} else if (tong > 500000) {
  giamGia = tong * 0.1;
}

if (isWednesday) {
  giamGia += tong * 0.05;
}

let sauGiam = tong - giamGia;

let vat = sauGiam * 0.08;

let tip = hasTip ? sauGiam * 0.05 : 0;

let thanhToan = sauGiam + vat + tip;

console.log("╠══════════════════════════════════════╣");
console.log(`║ Tổng cộng:      ${tong.toLocaleString()}đ`);
console.log(`║ Giảm giá:       ${giamGia.toLocaleString()}đ`);
console.log(`║ VAT (8%):       ${vat.toLocaleString()}đ`);
console.log(`║ Tip (5%):       ${tip.toLocaleString()}đ`);
console.log("╠══════════════════════════════════════╣");
console.log(`║ THANH TOÁN:     ${thanhToan.toLocaleString()}đ`);
console.log("╚══════════════════════════════════════╝");
```
