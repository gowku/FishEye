class App {
  constructor() {
    this.$photographersWrapper = document.querySelector(".photographer_section");
    this.photographersApi = new PhotographersApi("../../data/photographers.json");
  }

  async main() {
    const photographersData = await this.photographersApi.getPhotographers();
    console.log(photographersData);
    const photographers = photographersData.photographers;

    photographers.forEach((photograph) => {
      const Template = new photographerFactory(photograph);
      console.log(Template.getUserCardDOM());
      this.$photographersWrapper.appendChild(Template.getUserCardDOM());
    });
  }
}
const app = new App();
app.main();
