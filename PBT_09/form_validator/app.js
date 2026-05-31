const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#confirmPassword");
const phoneInput = document.querySelector("#phone");

const submitBtn = document.querySelector("#submitBtn");

let nameValid = false;
let emailValid = false;
let passwordValid = false;
let confirmValid = false;
let phoneValid = false;

// ================= NAME =================

nameInput.addEventListener("input", () => {
  const value = nameInput.value.trim();
  const message = document.querySelector("#nameMessage");

  if (value.length >= 2 && value.length <= 50) {
    message.textContent = "✅ Hợp lệ";
    message.style.color = "green";

    nameValid = true;
  } else {
    message.textContent = "❌ Tên phải từ 2 - 50 ký tự";
    message.style.color = "red";

    nameValid = false;
  }

  checkForm();
});

// ================= EMAIL =================

emailInput.addEventListener("input", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const message = document.querySelector("#emailMessage");

  if (emailRegex.test(emailInput.value)) {
    message.textContent = "✅ Email hợp lệ";
    message.style.color = "green";

    emailValid = true;
  } else {
    message.textContent = "❌ Email không đúng định dạng";
    message.style.color = "red";

    emailValid = false;
  }

  checkForm();
});

// ================= PASSWORD =================

passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;

  const fill = document.querySelector("#strengthFill");
  const message = document.querySelector("#passwordMessage");

  passwordValid = false;

  if (value.length < 8) {
    fill.style.width = "33%";
    fill.style.background = "red";

    message.textContent = "Yếu";
  } else if (value.length >= 8 && /[a-zA-Z]/.test(value) && /\d/.test(value)) {
    fill.style.width = "66%";
    fill.style.background = "orange";

    message.textContent = "Trung bình";

    passwordValid = true;
  }

  if (
    value.length >= 8 &&
    /[a-z]/.test(value) &&
    /[A-Z]/.test(value) &&
    /\d/.test(value) &&
    /[^A-Za-z0-9]/.test(value)
  ) {
    fill.style.width = "100%";
    fill.style.background = "green";

    message.textContent = "Mạnh";

    passwordValid = true;
  }

  validateConfirm();
  checkForm();
});

// ================= CONFIRM PASSWORD =================

confirmInput.addEventListener("input", () => {
  validateConfirm();
  checkForm();
});

function validateConfirm() {
  const message = document.querySelector("#confirmMessage");

  if (confirmInput.value === passwordInput.value && confirmInput.value !== "") {
    message.textContent = "✅ Mật khẩu khớp";
    message.style.color = "green";

    confirmValid = true;
  } else {
    message.textContent = "❌ Mật khẩu không khớp";
    message.style.color = "red";

    confirmValid = false;
  }
}

// ================= PHONE =================

phoneInput.addEventListener("input", () => {
  let value = phoneInput.value.replace(/\D/g, "");

  value = value.substring(0, 10);

  if (value.length > 4) {
    value = value.slice(0, 4) + "-" + value.slice(4);
  }

  if (value.length > 8) {
    value = value.slice(0, 8) + "-" + value.slice(8);
  }

  phoneInput.value = value;

  const message = document.querySelector("#phoneMessage");

  const numbers = value.replace(/-/g, "");

  if (numbers.length === 10) {
    message.textContent = "✅ Số điện thoại hợp lệ";
    message.style.color = "green";

    phoneValid = true;
  } else {
    message.textContent = "❌ Cần đủ 10 chữ số";
    message.style.color = "red";

    phoneValid = false;
  }

  checkForm();
});

// ================= ENABLE BUTTON =================

function checkForm() {
  submitBtn.disabled = !(
    nameValid &&
    emailValid &&
    passwordValid &&
    confirmValid &&
    phoneValid
  );
}

// ================= SUBMIT =================

document.querySelector("#registerForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const modal = document.querySelector("#modal");

  const result = document.querySelector("#result");

  result.innerHTML = `
            <p><strong>Tên:</strong> ${nameInput.value}</p>
            <p><strong>Email:</strong> ${emailInput.value}</p>
            <p><strong>SĐT:</strong> ${phoneInput.value}</p>
        `;

  modal.style.display = "flex";
});

// ================= CLOSE MODAL =================

document.querySelector("#closeModal").addEventListener("click", () => {
  document.querySelector("#modal").style.display = "none";
});
