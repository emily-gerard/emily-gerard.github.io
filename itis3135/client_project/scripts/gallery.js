let slideIndex = 1;

const plusSlides = function (n) {
  slideIndex += n;
  showSlides(slideIndex);
};

const currentSlide = function (n) {
  slideIndex = n;
  showSlides(slideIndex);
};

const showSlides = function (n) {
  const slides = document.getElementsByClassName("slides");
  const dots = document.getElementsByClassName("demo");
  const captionText = document.getElementById("caption");

  if (slides.length === 0 || dots.length === 0 || !captionText) {
    return;
  }

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
  captionText.textContent = dots[slideIndex - 1].alt;
};

window.plusSlides = plusSlides;
window.currentSlide = currentSlide;

document.addEventListener("DOMContentLoaded", function () {
  showSlides(slideIndex);
});
