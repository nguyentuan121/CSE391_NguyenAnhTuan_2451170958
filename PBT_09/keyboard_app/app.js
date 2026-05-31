// ================= IMAGES =================

const images = [
  "https://placehold.co/600x300?text=Image+1",
  "https://placehold.co/600x300?text=Image+2",
  "https://placehold.co/600x300?text=Image+3",
  "https://placehold.co/600x300?text=Image+4",
  "https://placehold.co/600x300?text=Image+5",
];

let currentIndex = 0;

const galleryImage = document.querySelector("#galleryImage");

function showImage(index) {
  galleryImage.src = images[index];
}

showImage(currentIndex);

// ================= BUTTONS =================

document.querySelector("#nextBtn").addEventListener("click", () => {
  currentIndex++;

  if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  showImage(currentIndex);
});

document.querySelector("#prevBtn").addEventListener("click", () => {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }

  showImage(currentIndex);
});

// ================= SLIDESHOW =================

let slideshow = null;

function startSlideshow() {
  slideshow = setInterval(() => {
    currentIndex++;

    if (currentIndex >= images.length) {
      currentIndex = 0;
    }

    showImage(currentIndex);
  }, 2000);
}

function stopSlideshow() {
  clearInterval(slideshow);

  slideshow = null;
}

// ================= MODAL =================

const modal = document.querySelector("#modal");

const modalImage = document.querySelector("#modalImage");

galleryImage.addEventListener("click", () => {
  modal.style.display = "flex";

  modalImage.src = galleryImage.src;
});

document.querySelector("#closeModal").addEventListener("click", () => {
  modal.style.display = "none";
});

// ================= COMMANDS =================

const commands = [
  "Go Home",
  "Open Gallery",
  "Open Settings",
  "Refresh",
  "Logout",
];

const palette = document.querySelector("#palette");

const commandInput = document.querySelector("#commandInput");

const commandList = document.querySelector("#commandList");

function renderCommands(data) {
  commandList.innerHTML = "";

  data.forEach((command) => {
    const li = document.createElement("li");

    li.textContent = command;

    commandList.appendChild(li);
  });
}

renderCommands(commands);

// ================= KEYBOARD =================

document.addEventListener("keydown", (e) => {
  // Ctrl + K

  if (e.ctrlKey && e.key === "k") {
    e.preventDefault();

    palette.style.display = "flex";

    commandInput.focus();
  }

  // ESC

  if (e.key === "Escape") {
    modal.style.display = "none";

    palette.style.display = "none";
  }

  // Right

  if (e.key === "ArrowRight") {
    currentIndex++;

    if (currentIndex >= images.length) {
      currentIndex = 0;
    }

    showImage(currentIndex);
  }

  // Left

  if (e.key === "ArrowLeft") {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    }

    showImage(currentIndex);
  }

  // Space

  if (e.code === "Space") {
    e.preventDefault();

    if (slideshow) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  }

  // Number 1-5

  const num = Number(e.key);

  if (num >= 1 && num <= images.length) {
    currentIndex = num - 1;

    showImage(currentIndex);
  }
});

// ================= SEARCH COMMAND =================

commandInput.addEventListener("input", () => {
  const keyword = commandInput.value.toLowerCase();

  const filtered = commands.filter((command) =>
    command.toLowerCase().includes(keyword),
  );

  renderCommands(filtered);
});

// ================= ENTER =================

commandInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const first = commandList.querySelector("li");

    if (first) {
      alert("Selected: " + first.textContent);

      palette.style.display = "none";
    }
  }
});
