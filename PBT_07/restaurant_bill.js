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
