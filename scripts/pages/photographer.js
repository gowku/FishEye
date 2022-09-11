const urlId = new URLSearchParams(window.location.search).get("id");

class App {
  constructor() {
    this.$photographPageWrapper = document.querySelector(".photograph-header");
    this.$photographNameWrapper = document.querySelector(".modal-header");
    this.photographersApi = new PhotographersApi("../../data/photographers.json");

    this.$mediaWrapper = document.querySelector("section");
    this.mediaApi = new MediaApi("../../data/photographers.json");

    this.$lightboxWrapper = document.querySelector(".lightbox-media-container");
    // console.log($photographNameWrapper);
  }

  async main() {
    const photographers = await this.photographersApi.getPhotographers();
    // console.log(photographers);

    const media = await this.mediaApi.getMedia();
    // console.log("media", media);

    function sortedPop() {
      return media.sort(function (a, b) {
        return b.likes - a.likes;
      });
    }

    // const sortedPop = media.sort(function (a, b) {
    //   return b.likes - a.likes;
    // });
    // console.log(sortedPop());

    function sortedDate() {
      return media.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    }

    // const sortedDate = media.sort(function (a, b) {
    //   return new Date(b.date) - new Date(a.date);
    // });
    // console.log(sortedDate);

    function sortedTitle() {
      return media.sort((a, b) => a.title.localeCompare(b.title, "fr", { ignorePunctuation: true }));
    }

    // const sortedTitle = media.sort((a, b) => a.title.localeCompare(b.title, "fr", { ignorePunctuation: true }));
    // console.log(sortedTitle);

    //-------------ajout des infos photographe-------------------
    for (let i = 0; i < photographers.length; i++) {
      if (photographers[i].id == urlId) {
        const Template = new PhotographPageFactory(photographers[i]);
        const TemplateName = new PhotographName(photographers[i]);
        // console.log(Template);
        this.$photographPageWrapper.appendChild(Template.getPhotographPage());
        this.$photographNameWrapper.appendChild(TemplateName.getPhotogrpahName());
      }
    }

    //------------------ajout des medias-----------------------
    const printMedia = (media) => {
      for (let j = 0; j < media.length; j++) {
        if (media[j].photographerId == urlId) {
          // console.log(media[j]);

          const TemplateMedia = new photographMedia(media[j]);
          // console.log(TemplateMedia);
          this.$mediaWrapper.appendChild(TemplateMedia.getMedia());

          const TemplateLightbox = new lightboxMedia(media[j]);
          // console.log(TemplateLightbox);
          this.$lightboxWrapper.appendChild(TemplateLightbox.getLightboxMedia());
        }
      }
    };

    let selectTriOption = document.querySelector(".dropdown-menu");
    // selectTriOption.value = "Titre";
    // console.log(selectTriOption.value);

    selectTriOption.addEventListener("input", (e) => {
      // console.log(selectTriOption.value);
      window.location.reload();
      // printMedia(media);

      return selectTriOption.value;
    });

    switch (selectTriOption.value) {
      case "Popularité":
        // media = sortedPop;
        printMedia(sortedPop());
        break;
      case "Date":
        // media = sortedDate;
        printMedia(sortedDate());
        break;
      case "Titre":
        // media = sortedTitle;
        printMedia(sortedTitle());
        break;

      default:
        printMedia();

        break;
    }
    // printMedia();
    //-------------------LIKES-------------------------------
    const btnLike = document.getElementsByClassName("btn-like");
    // console.log(btnLike);
    const likes = document.getElementsByClassName("numberLikes");
    // console.log(likes[0].textContent);
    const totalLikes = document.querySelector(".totalLikes");
    // console.log(totalLikes.textContent);
    // console.log(likes.length);
    let total = 0;
    function calcLikes() {
      for (let k = 0; k < likes.length; k++) {
        total += parseInt(likes[k].textContent);
        // console.log(total);
      }
      totalLikes.textContent = total;
    }
    calcLikes();

    for (let l = 0; l < btnLike.length; l++) {
      btnLike[l].addEventListener("click", (e) => {
        e.preventDefault();
        // console.log(likes[l].attributes[1]);

        if (likes[l].attributes[1] == undefined) {
          likes[l].textContent = parseInt(likes[l].textContent) + 1;
          likes[l].setAttribute("data-like", "liked");
          totalLikes.textContent = parseInt(totalLikes.textContent) + 1;
        }
      });
    }
    //--------------------CARROUSEL---------------------
    const items = document.getElementsByTagName("li");
    const nbSlide = items.length;
    const suivant = document.querySelector(".suivant");
    const precedent = document.querySelector(".precedent");

    let count = 0;

    function slideSuivante() {
      // console.log(count);
      items[count].classList.remove("active");

      if (count < nbSlide - 1) {
        count++;
      } else {
        count = 0;
      }

      items[count].classList.add("active");
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
  }
}
const app = new App();
app.main();
