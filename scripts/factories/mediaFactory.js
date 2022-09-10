class photographMedia {
  constructor(media) {
    this.media = media;
  }

  getMedia() {
    const $mediaWrapper = document.createElement("div");
    $mediaWrapper.classList.add("media");

    const photographImg = `
      <img src="assets/Sample Photos/${this.media.photographerId}/${this.media.image}" alt="" />
      <div class="media-name">
        <p>${this.media.title}</p>
        <div class="like">
          <p>${this.media.likes}</p>
          <i class="fa-solid fa-heart fa-lg"></i>
        </div>
      </div>
    `;

    const photographVideo = `
      <video controls width="250">
        <source src="assets/Sample Photos/${this.media.photographerId}/${this.media.video}" type="video/mp4" />
        <video />
        <div class="media-name">
          <p>${this.media.title}</p>
          <div class="like">
            <p>${this.media.likes}</p>
            <i class="fa-solid fa-heart fa-lg"></i>
          </div>
        </div>
      </video>
    `;

    if (this.media.video != undefined) {
      $mediaWrapper.innerHTML = photographVideo;
    } else {
      $mediaWrapper.innerHTML = photographImg;
    }

    return $mediaWrapper;
  }
}
