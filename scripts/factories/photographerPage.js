class PhotographPageFactory {
  constructor(photograph) {
    this.photograph = photograph;
  }

  getPhotographPage() {
    const $photographWrapper = document.createElement("div");
    $photographWrapper.classList.add("photograph");

    const photographPage = `
      <div class="photograph-info">
        <p>${this.photograph.name}</p>
        <p>${this.photograph.city}, ${this.photograph.country}</p>
        <p>${this.photograph.tagline}</p>
      </div>
      <button class="contact_button" onclick="displayModal()"tabindex="0" aria-label="contact Me">Contactez-moi</button>
      <img src="assets/photographers/${this.photograph.portrait}" alt="${this.photograph.name}" />
      <div class="photograph-price">
        <div class="price-like">
          <p class='totalLikes'></p>
          <i class="fa-solid fa-heart fa-lg "></i>
        </div>
        <div class="price-price">
          <p>${this.photograph.price}€/jour</p>
        </div>
      </div>
    
      `;
    $photographWrapper.innerHTML = photographPage;
    return $photographWrapper;
  }
}

class PhotographName extends PhotographPageFactory {
  constructor(photograph) {
    super(photograph);
  }

  getPhotogrpahName() {
    const $nameWrapper = document.createElement("div");
    $nameWrapper.classList.add("contact-name");

    const photographName = `<h2>Contactez-moi</h2>
    <p class="name">${this.photograph.name}</p>`;

    $nameWrapper.innerHTML = photographName;
    return $nameWrapper;
  }
}
