const widget1 = document.getElementById("widget1");

const widget2 = document.getElementById("widget2");

const widget3 = document.getElementById("widget3");

const loadTime = document.getElementById("loadTime");

const refreshBtn = document.getElementById("refreshBtn");

refreshBtn.addEventListener("click", loadDashboard);

loadDashboard();

async function loadDashboard() {
  const startTime = Date.now();

  showLoading();

  const results = await Promise.allSettled([
    fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json()),

    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true",
    ).then((r) => r.json()),

    fetch("https://dog.ceo/api/breeds/image/abc").then((r) => r.json()),
  ]);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      renderWidget(index, result.value);
    } else {
      renderWidgetError(index, result.reason.message);
    }
  });

  const totalTime = Date.now() - startTime;

  loadTime.textContent = `Data loaded in ${totalTime} ms`;
}
function showLoading() {
  widget1.innerHTML = "⏳ Loading users...";

  widget2.innerHTML = "⏳ Loading weather...";

  widget3.innerHTML = "⏳ Loading dog image...";
}
function renderWidget(index, data) {
  if (index === 0) {
    widget1.innerHTML = `
            <h2>Users</h2>

            <p>
                Total Users:
                ${data.length}
            </p>

            <p>
                First User:
                ${data[0].name}
            </p>
        `;
  }

  if (index === 1) {
    widget2.innerHTML = `
            <h2>Weather</h2>

            <p>
                Temperature:
                ${data.current_weather.temperature}°C
            </p>

            <p>
                Wind:
                ${data.current_weather.windspeed}
            </p>
        `;
  }

  if (index === 2) {
    widget3.innerHTML = `
            <h2>Random Dog</h2>

            <img src="${data.message}">
        `;
  }
}
function renderWidgetError(index, message) {
  const widgets = [widget1, widget2, widget3];

  widgets[index].innerHTML = `
        <h2>Error</h2>

        <p>${message}</p>
    `;
}
