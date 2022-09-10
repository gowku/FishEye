function displayLightbox() {
  const modalLightbox = document.getElementById("lightbox_modal_container");
  const media = document.querySelectorAll(".lightbox-media");
  media[0].classList.add("active");
  modalLightbox.style.display = "block";
}
function closeLightbox() {
  const modalLightbox = document.getElementById("lightbox_modal_container");
  modalLightbox.style.display = "none";
}

// console.log(modalLightbox.style.display);

const items = document.querySelectorAll(".lightbox-media");
console.log(items);
const nbSlide = items.length;
const suivant = document.querySelector(".suivant");
const precedent = document.querySelector(".precedent");
console.log(suivant);
console.log(precedent);
let count = 0;

function slideSuivante() {
  items[count].classList.remove("active");

  if (count < nbSlide - 1) {
    count++;
  } else {
    count = 0;
  }

  items[count].classList.add("active");
  console.log(count);
}
suivant.addEventListener("click", slideSuivante);

function slidePrecedente() {
  items[count].classList.remove("active");

  if (count > 0) {
    count--;
  } else {
    count = nbSlide - 1;
  }

  items[count].classList.add("active");
  // console.log(count);
}
precedent.addEventListener("click", slidePrecedente);

function keyPress(e) {
  console.log(e);

  if (e.keyCode === 37) {
    slidePrecedente();
  } else if (e.keyCode === 39) {
    slideSuivante();
  }
}
document.addEventListener("keydown", keyPress);
