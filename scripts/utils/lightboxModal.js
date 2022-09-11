function displayLightbox() {
  const modalLightbox = document.getElementById("lightbox_modal_container");
  const media = document.querySelectorAll(".lightbox-media");
  // console.log(media);
  media[0].classList.add("active");
  modalLightbox.style.display = "block";
}
function closeLightbox() {
  const modalLightbox = document.getElementById("lightbox_modal_container");
  modalLightbox.style.display = "none";
}
