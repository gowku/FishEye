class App {
  constructor() {
    this.$photographersWrapper = document.querySelector(".photographer_section");
    this.photographersApi = new PhotographersApi("../../data/photographers.json");
  }

  async main() {
    const photographers = await this.photographersApi.getPhotographers();
    // console.log(photographers);
    // const photographers = photographersData.photographers;

    photographers.forEach((photograph) => {
      const Template = new photographerFactory(photograph);
      // console.log(Template.getUserCardDOM());
      this.$photographersWrapper.appendChild(Template.getUserCardDOM());
    });

    const allFocusableIndex = document.getElementsByClassName("focusableIndex");
    const firstFocusableIndex = allFocusableIndex[0];
    const lastFocusableIndex = allFocusableIndex[allFocusableIndex.length - 1];

    document.addEventListener("keydown", (e) => {
      console.log(e);

      function nextPhotograph() {
        if (e.keyCode === 39) {
          console.log("je suis la");
          firstFocusableIndex.focus();
        }
      }
      nextPhotograph();
    });
  }
}
const app = new App();
app.main();
