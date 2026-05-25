// Random số từ 1 -> 100
const secretNumber = Math.floor(Math.random() * 100) + 1;

// Số lượt tối đa
const maxTurns = 7;

// Đếm số lần đoán
let turns = 0;

// Lưu các số đã đoán
let guessedNumbers = [];

// Biến thắng/thua
let isWin = false;

while (turns < maxTurns) {
  let input = prompt(`Lượt ${turns + 1}/${maxTurns}\nNhập số từ 1 đến 100:`);

  // Kiểm tra user bấm Cancel
  if (input === null) {
    alert("Bạn đã thoát game!");
    break;
  }

  // Chuyển sang number
  let guess = Number(input);

  // Validate input
  if (isNaN(guess) || guess < 1 || guess > 100 || !Number.isInteger(guess)) {
    alert("Vui lòng nhập số nguyên từ 1 đến 100!");
    continue;
  }

  // Kiểm tra nhập trùng
  if (guessedNumbers.includes(guess)) {
    alert("Bạn đã đoán số này rồi!");
    continue;
  }

  // Lưu số đã đoán
  guessedNumbers.push(guess);

  // Tăng lượt đoán
  turns++;

  // So sánh kết quả
  if (guess === secretNumber) {
    alert(`Đúng rồi!\nBạn đoán đúng sau ${turns} lần!`);
    isWin = true;
    break;
  } else if (guess < secretNumber) {
    alert("Cao hơn!");
  } else {
    alert("Thấp hơn!");
  }
}

// Nếu thua
if (!isWin && turns === maxTurns) {
  alert(`Bạn đã hết lượt!\nĐáp án đúng là: ${secretNumber}`);
}
