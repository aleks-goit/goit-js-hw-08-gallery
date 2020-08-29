import galleryItems from "./gallery-items.js";

const gallery = document.querySelector(".js-gallery");
gallery.addEventListener("click", handleClickImage);

const closeModalBtn = document.querySelector(`[data-action="close-lightbox"]`);
const lightbox = document.querySelector(".js-lightbox");
closeModalBtn.addEventListener("click", handleCloseModal);

const wideImage = document.querySelector(".lightbox__image");
const overlay = document.querySelector(".lightbox__content");
overlay.addEventListener("click", handleCloseModal);

const nextImgBtn = document.querySelector(`[data-action="next-image"]`);
nextImgBtn.addEventListener("click", nextImage);

const prevtImgBtn = document.querySelector(`[data-action="prev-image"]`);
prevtImgBtn.addEventListener("click", prevImage);

insertGallery(galleryItems);

function insertGallery(galleryItems) {
  galleryItems.forEach((item) => {
    let li = document.createElement("li");

    li.insertAdjacentHTML(
      "afterbegin",
      `<a
          class="gallery__link"
          href="${item.original}"
        >
          <img
            class="gallery__image"
            src="${item.preview}"
            data-source="${item.original}"
            alt="${item.description}"
          />
        </a>`
    );
    gallery.append(li);
  });
}

function handleClickImage(e) {
  e.preventDefault();
  window.addEventListener("keydown", handleKeyPress);
  wideImage.src = e.target.dataset.source;
  wideImage.alt = e.target.alt;
  lightbox.classList.add("is-open");
}

function handleCloseModal(e) {
  if (e.target != e.currentTarget) {
    return;
  }
  window.removeEventListener("keydown", handleKeyPress);
  lightbox.classList.remove("is-open");
  wideImage.src = "";
  wideImage.alt = "";
}

function handleKeyPress(e) {
  if (e.code != "Escape") {
    return;
  }

  lightbox.classList.remove("is-open");
  wideImage.src = "";
  wideImage.alt = "";
}

function nextImage() {
  let currentImage = findImage(galleryItems);

  wideImage.src = galleryItems[currentImage + 1].original;
  wideImage.alt = galleryItems[currentImage + 1].description;
}

function prevImage() {
  let currentImage = findImage(galleryItems);

  wideImage.src = galleryItems[currentImage - 1].original;
  wideImage.alt = galleryItems[currentImage - 1].description;
}

function findImage(gallery) {
  let ind;
  gallery.forEach((item, index) => {
    if (wideImage.src === item.original) {
      ind = index;
    }
  });
  return ind;
}
