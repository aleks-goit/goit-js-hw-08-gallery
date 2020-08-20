export const tamplate = item => {
    return `
      <li class="gallery__item">
    <a
      class="gallery__link"
      href="${item.original}"
    >
      <img
        class="gallery__image"
        src="${item.preview}"
        data-source="${item.original}"
        alt="${item.description}"
      />
    </a>
  </li>
      `;
};

const modalWindow = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');
let myTarget;

export function openModal(e) {
    if (e.target.nodeName !== 'IMG') return;
    e.preventDefault();
    myTarget = e.target;

    modalImage.setAttribute('src', e.target.dataset.source);
    modalWindow.classList.add('is-open');
    window.addEventListener('keydown', changeImageInModal);
}

export function closeModal() {
    modalImage.setAttribute('src', '');
    modalWindow.classList.remove('is-open');
    window.removeEventListener('keydown', changeImageInModal);
}

function changeImageInModal(e) {
    switch (e.key) {
        case 'ArrowRight':
            if (myTarget.parentNode.parentNode.nextElementSibling) {
                let nextImage =
                    myTarget.parentNode.parentNode.nextElementSibling
                        .firstElementChild.firstElementChild;

                modalImage.setAttribute('src', nextImage.dataset.source);
                myTarget = nextImage;
            }
            break;
        case 'ArrowLeft':
            if (myTarget.parentNode.parentNode.previousElementSibling) {
                let prevImage =
                    myTarget.parentNode.parentNode.previousElementSibling
                        .firstElementChild.firstElementChild;

                modalImage.setAttribute('src', prevImage.dataset.source);
                myTarget = prevImage;
            }
            break;
        case 'Escape':
            closeModal();
            break;
    }
}
