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
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        <img src="assets/photographers/${this.photograph.portrait}" alt="photo" />
        <div class="photograph-price">
          <div class="price-like">
            <p>297 081</p>
            <i class="fa-solid fa-heart fa-lg"></i>
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
