const urlId = new URLSearchParams(window.location.search).get("id");

class App {
  constructor() {
    this.$photographPageWrapper = document.querySelector(".photograph-header");
    this.$photographNameWrapper = document.querySelector(".modal-header");
    this.photographersApi = new PhotographersApi("../../data/photographers.json");

    this.$mediaWrapper = document.querySelector("section");
    this.mediaApi = new MediaApi("../../data/photographers.json");
  }

  async main() {
    const photographers = await this.photographersApi.getPhotographers();
    console.log(photographers);

    const media = await this.mediaApi.getMedia();
    console.log(media);

    for (let i = 0; i < photographers.length; i++) {
      if (photographers[i].id == urlId) {
        const Template = new PhotographPageFactory(photographers[i]);
        const TemplateName = new PhotographName(photographers[i]);
        // console.log(Template);
        this.$photographPageWrapper.appendChild(Template.getPhotographPage());
        this.$photographNameWrapper.appendChild(TemplateName.getPhotogrpahName());
      }
    }

    for (let j = 0; j < media.length; j++) {
      //   console.log(media[i].photographerId);
      if (media[j].photographerId == urlId) {
        const TemplateMedia = new photographMedia(media[j]);
        // console.log(TemplateMedia);
        this.$mediaWrapper.appendChild(TemplateMedia.getMedia());
      }
    }
  }
}
const app = new App();
app.main();
