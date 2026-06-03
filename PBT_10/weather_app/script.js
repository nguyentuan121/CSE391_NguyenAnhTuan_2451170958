const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const weather = document.getElementById("weather");
const error = document.getElementById("error");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

const historyList = document.getElementById("historyList");

// Load lịch sử khi mở trang
loadHistory();

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  showLoading();

  try {
    const response = await fetch(`https://wttr.in/${city}?format=j1`);

    if (!response.ok) {
      throw new Error("Lỗi API");
    }

    const data = await response.json();

    showWeather(data, city);

    saveHistory(city);
  } catch (err) {
    showError("Không tìm thấy thành phố hoặc mất mạng!");
  }
}

// Loading State
function showLoading() {
  loading.classList.remove("hidden");

  weather.classList.add("hidden");

  error.classList.add("hidden");
}

// Success State
function showWeather(data, city) {
  loading.classList.add("hidden");

  weather.classList.remove("hidden");

  const current = data.current_condition[0];

  cityName.textContent = city;

  temp.textContent = current.temp_C;

  humidity.textContent = current.humidity;

  description.textContent = current.weatherDesc[0].value;

  weatherIcon.src = current.weatherIconUrl[0].value;
}

// Error State
function showError(message) {
  loading.classList.add("hidden");

  weather.classList.add("hidden");

  error.classList.remove("hidden");

  error.textContent = message;
}

// Lưu lịch sử
function saveHistory(city) {
  let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

  history = history.filter((item) => item !== city);

  history.unshift(city);

  history = history.slice(0, 5);

  localStorage.setItem("weatherHistory", JSON.stringify(history));

  loadHistory();
}

// Hiển thị lịch sử
function loadHistory() {
  let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

  historyList.innerHTML = "";

  history.forEach((city) => {
    const li = document.createElement("li");

    li.textContent = city;

    li.addEventListener("click", () => {
      cityInput.value = city;

      getWeather(city);
    });

    historyList.appendChild(li);
  });
}
