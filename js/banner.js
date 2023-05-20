const images = document.querySelectorAll(".banner-image");
const selectorButtons = document.querySelectorAll(".image-selector-button");
const prevButton = document.querySelector(".banner-rotate-left");
const nextButton = document.querySelector(".banner-rotate-right");
let currentImageIndex = 0;
let intervalId;

/* Moves banner one image */
function rotateBanner() {
  images[currentImageIndex].style.opacity = 0;
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].style.opacity = 1;
  updateActiveButton();
}

/* moves banner back one image */
function previousImage() {
  clearInterval(intervalId);
  images[currentImageIndex].style.opacity = 0;
  currentImageIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1; // If currentImageIndex is 0, set it to the last image, otherwise subtract 1
  images[currentImageIndex].style.opacity = 1;
  updateActiveButton();
  intervalId = setInterval(rotateBanner, 3000);
}

/* moves banner forward one */
function nextImage() {
  clearInterval(intervalId);
  images[currentImageIndex].style.opacity = 0;
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].style.opacity = 1;
  updateActiveButton();
  intervalId = setInterval(rotateBanner, 3000);
}


/* Move banner to selected image */
function selectImage(index) {
  clearInterval(intervalId);
  images[currentImageIndex].style.opacity = 0;
  currentImageIndex = index;
  images[currentImageIndex].style.opacity = 1;
  updateActiveButton();
  intervalId = setInterval(rotateBanner, 3000);
}

/* Listens to all banners */
selectorButtons.forEach((button, index) => {
  button.addEventListener("click", () => selectImage(index));
});

/* Updates button shading */
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

/* Set first images opacity to 1. so we load in with an image*/
images[currentImageIndex].style.opacity = 1;