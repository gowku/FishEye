function displayLightbox() {
  // console.log(count);
  // count = 0;
  const modalLightbox = document.getElementById("lightbox_modal_container");
  const media = document.querySelectorAll(".lightbox-media");
  console.log(media);
  media[0].classList.add("active");
  modalLightbox.style.display = "block";
}
function closeLightbox() {
  // console.log("je passe ici");
  const mediaActive = document.querySelectorAll(".active");
  // console.log(mediaActive);
  // console.log(count);
  // count = 0;
  mediaActive.forEach((media) => {
    media.classList.remove("active");
  });
  const modalLightbox = document.getElementById("lightbox_modal_container");
  modalLightbox.style.display = "none";
}
