const gallery = document.getElementById("gallery");

const loading = document.getElementById("loading");

let page = 1;

let isLoading = false;

loadPhotos();

async function loadPhotos() {
  if (isLoading) return;

  isLoading = true;

  loading.style.display = "block";

  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=20`,
    );

    const photos = await response.json();

    renderPhotos(photos);

    page++;
  } catch (error) {
    alert("Lỗi tải ảnh");
  }

  loading.style.display = "none";

  isLoading = false;
}

function renderPhotos(photos) {
  photos.forEach((photo) => {
    const img = document.createElement("img");

    // lazy loading
    img.dataset.src = photo.download_url;

    img.alt = photo.author;

    gallery.appendChild(img);

    lazyObserver.observe(img);
  });
}
const lazyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;

      img.src = img.dataset.src;

      lazyObserver.unobserve(img);
    }
  });
});
const infiniteObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadPhotos();
  }
});

infiniteObserver.observe(document.getElementById("load-trigger"));
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMorePhotos();
  }
});
const modal = document.getElementById("modal");

const modalImg = document.getElementById("modal-img");

gallery.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    modal.style.display = "flex";

    modalImg.src = e.target.src;
  }
});

document.getElementById("close").addEventListener("click", () => {
  modal.style.display = "none";
});
