class photographMedia {
  constructor(media) {
    this.media = media;
  }

  getMedia() {
    const $mediaWrapper = document.createElement("div");
    $mediaWrapper.classList.add("media");

    const photographImg = `
      <img src="assets/Sample Photos/${this.media.photographerId}/${this.media.image}" alt=""  onclick="displayLightbox()" />
      <div class="media-name">
        <p>${this.media.title}</p>
        <div class="like">
          <p class='numberLikes'>${this.media.likes}</p>
          <i class="fa-solid fa-heart fa-lg btn-like"></i>
        </div>
      </div>
    `;

    const photographVideo = `
      <video controls width="350"  onclick="displayLightbox()">
        <source src="assets/Sample Photos/${this.media.photographerId}/${this.media.video}" type="video/mp4" />
        </video>
        <div class="media-name video">
          <p>${this.media.title}</p>
          <div class="like">
            <p class='numberLikes'>${this.media.likes}</p>
            <i class="fa-solid fa-heart fa-lg btn-like"></i>
          </div>
        </div>
    `;

    if (this.media.video != undefined) {
      $mediaWrapper.innerHTML = photographVideo;
    } else {
      $mediaWrapper.innerHTML = photographImg;
    }

    return $mediaWrapper;
  }
}

class lightboxMedia extends photographMedia {
  constructor(media) {
    super(media);
  }

  getLightboxMedia() {
    const $lightboxMediaWrapper = document.createElement("li");
    $lightboxMediaWrapper.classList.add("lightbox-media");
    // $lightboxMediaWrapper.classList.add("active");

    const lightboxMediaImg = `
    <img src="assets/Sample Photos/${this.media.photographerId}/${this.media.image}" alt="" />
            <p>${this.media.title}</p>
    `;

    const lightboxMediaVideo = `
    <video controls width="250"  >
        <source src="assets/Sample Photos/${this.media.photographerId}/${this.media.video}" type="video/mp4" />
        <video />
          <p>${this.media.title}</p>
    `;

    if (this.media.video != undefined) {
      $lightboxMediaWrapper.innerHTML = lightboxMediaVideo;
    } else {
      $lightboxMediaWrapper.innerHTML = lightboxMediaImg;
    }

    return $lightboxMediaWrapper;
  }
}
