const images = document.querySelectorAll(".banner-image");
const selectorButtons = document.querySelectorAll(".image-selector-button");
const prevButton = document.querySelector(".banner-rotate-left");
const nextButton = document.querySelector(".banner-rotate-right");
let currentImageIndex = 0;
let intervalId;

function rotateBanner() {
  images[currentImageIndex].style.opacity = 0;
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].style.opacity = 1;
  updateActiveButton();
}

function previousImage() {
  clearInterval(intervalId);
  images[currentImageIndex].style.opacity = 0;
  currentImageIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
  images[currentImageIndex].style.opacity = 1;
  updateActiveButton();
  intervalId = setInterval(rotateBanner, 3000);
}

function nextImage() {
  clearInterval(intervalId);
  images[currentImageIndex].style.opacity = 0;
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].style.opacity = 1;
  updateActiveButton();
  intervalId = setInterval(rotateBanner, 3000);
}

function selectImage(index) {
  clearInterval(intervalId);
  images[currentImageIndex].style.opacity = 0;
  currentImageIndex = index;
  images[currentImageIndex].style.opacity = 1;
  updateActiveButton();
  intervalId = setInterval(rotateBanner, 3000);
}

selectorButtons.forEach((button, index) => {
  button.addEventListener("click", () => selectImage(index));
});

function updateActiveButton() {
  selectorButtons.forEach((button, index) => {
    if (parseInt(button.getAttribute("data-image-index")) === currentImageIndex) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}



intervalId = setInterval(rotateBanner, 3000); // Change image every 3 seconds
updateActiveButton();

/* Set first images opacity to 1 */
images[currentImageIndex].style.opacity = 1;