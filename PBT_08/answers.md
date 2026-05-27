## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Function Declaration vs Expression vs Arrow

1. Function Declaration

```js
function tinhThueBaoHiem(luong) {
  let thue = 0;

  if (luong > 11000000) {
    thue = luong * 0.1;
  }

  return {
    thue: thue,
    thuc_nhan: luong - thue,
  };
}

console.log(tinhThueBaoHiem(15000000));
```

2. Function Expression

```js
const tinhThueBaoHiem2 = function (luong) {
  let thue = 0;

  if (luong > 11000000) {
    thue = luong * 0.1;
  }

  return {
    thue: thue,
    thuc_nhan: luong - thue,
  };
};

console.log(tinhThueBaoHiem2(15000000));
```

3. Arrow Function

```js
const tinhThueBaoHiem3 = (luong) => {
  let thue = 0;

  if (luong > 11000000) {
    thue = luong * 0.1;
  }

  return {
    thue: thue,
    thuc_nhan: luong - thue,
  };
};

console.log(tinhThueBaoHiem3(15000000));
```

**Hoisting khác nhau như thế nào?**

1. Function Declaration → Có hoisting đầy đủ

   Có thể gọi hàm trước khi khai báo.

```js
console.log(tinhTong(2, 3));

function tinhTong(a, b) {
  return a + b;
}
```

- Chạy được vì JavaScript đưa toàn bộ function lên đầu bộ nhớ.

2. Function Expression → Không hoisting function

```js
console.log(tinhTong2(2, 3));

const tinhTong2 = function (a, b) {
  return a + b;
};
```

- Lỗi: ReferenceError: Cannot access 'tinhTong2' before initialization

  Vì chỉ biến tinhTong2 được hoisting, nhưng chưa được gán function.

3. Arrow Function → Cũng không hoisting như Function Expression

```js
console.log(tinhTong3(2, 3));

const tinhTong3 = (a, b) => {
  return a + b;
};
```

- Cũng lỗi tương tự.

### Câu A2 — Scope & Closure

1. Đoạn 1

Output

     1
     2
     3
     2
     2

2. Đoạn 2

Output sau khoảng 200ms

     var: 3
     var: 3
     var: 3

     let: 0
     let: 1
     let: 2

**Giải thích chi tiết**

1. var có function scope

```js
for (var i = 0; i < 3; i++)
```

var KHÔNG tạo biến mới cho mỗi vòng lặp.

Chỉ có 1 biến i duy nhất dùng chung cho toàn bộ vòng lặp.

Điều gì xảy ra?

Vòng lặp chạy rất nhanh:

```js
i = 0;
i = 1;
i = 2;
i = 3;
```

sau đó mới tới setTimeout.

Khi callback chạy:

`console.log(i)`

thì i đã bằng 3.

Nên cả 3 lần đều in:

3

2. let có block scope

```js
for (let j = 0; j < 3; j++)
```

let tạo biến mới riêng biệt cho mỗi lần lặp.

Tức là JavaScript hiểu gần giống:

```js
let j = 0;
setTimeout(() => console.log(j));

let j = 1;
setTimeout(() => console.log(j));

let j = 2;
setTimeout(() => console.log(j));
```

Mỗi callback giữ closure riêng của biến j.

Nên in:

     0
     1
     2

### Câu A3 — Array Methods

1. Lấy các số chẵn

```js
const soChan = nums.filter((n) => n % 2 === 0);
```

2. Nhân mỗi số với 3

```js
const nhan3 = nums.map((n) => n * 3);
```

3. Tính tổng tất cả

```js
const tong = nums.reduce((sum, n) => sum + n, 0);
```

4. Tìm số đầu tiên > 7

```js
const first = nums.find((n) => n > 7);
```

5. Kiểm tra CÓ số > 10 không

```js
const hasGreater10 = nums.some((n) => n > 10);
```

6. Kiểm tra TẤT CẢ đều > 0

```js
const allPositive = nums.every((n) => n > 0);
```

7. Tạo mảng "Số X là [chẵn/lẻ]"

```js
const moTa = nums.map((n) => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
```

8. Đảo ngược mảng (không mutate gốc)

```js
const reversed = [...nums].reverse();
```

### Câu A4 — Object Destructuring & Spread

1. Destructuring

```js
const {
  name,
  price,
  specs: { ram, color },
} = product;

console.log(name, price, ram, color);
console.log(specs);
```

Output dòng 1

     iPhone 16 25990000 8 Titan

Output dòng 2

     ReferenceError: specs is not defined

2. Spread Operator

```js
const updated = { ...product, price: 23990000, sale: true };
```

Output

`console.log(updated.price);`

→ 23990000

`console.log(updated.sale);`

→ true

`console.log(product.price);`

→ 25990000

3. Spread Gotcha (bẫy thường gặp)

```js
const copy = { ...product };

copy.specs.ram = 16;

console.log(product.specs.ram);
```

Output
16

Tại sao?

Vì spread chỉ copy kiểu:

SHALLOW COPY
Nghĩa là:

`const copy = { ...product };`

chỉ copy level đầu.

## PHẦN C — SUY LUẬN

### Câu C1 — Refactor Code

```js
const processOrders = (orders) =>
  orders
    .filter(({ status, total }) => status === "completed" && total > 100000)
    .map(({ id, customer, total }) => {
      const discount = total * 0.1;
      return { id, customer, total, discount, finalTotal: total - discount };
    })
    .sort((a, b) => b.finalTotal - a.finalTotal);
```

### Câu C2 — Thiết kế API

```js
const miniArray = {
  map(arr, fn) {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
      result.push(fn(arr[i], i, arr));
    }

    return result;
  },

  filter(arr, fn) {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
      if (fn(arr[i], i, arr)) {
        result.push(arr[i]);
      }
    }

    return result;
  },

  reduce(arr, fn, initialValue) {
    let accumulator = initialValue;

    for (let i = 0; i < arr.length; i++) {
      accumulator = fn(accumulator, arr[i], i, arr);
    }

    return accumulator;
  },
};

// Test
console.log(miniArray.map([1, 2, 3], (x) => x * 2));
// → [2,4,6]

console.log(miniArray.filter([1, 2, 3, 4], (x) => x > 2));
// → [3,4]

console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10
```
