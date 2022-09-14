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

    //------------------dropdownmenu---------------------------
    const SPACEBAR_KEY_CODE = [0, 32];
    const ENTER_KEY_CODE = 13;
    const DOWN_ARROW_KEY_CODE = 40;
    const UP_ARROW_KEY_CODE = 38;
    const ESCAPE_KEY_CODE = 27;

    const list = document.querySelector(".dropdown__list");
    const listContainer = document.querySelector(".dropdown__list-container");
    const dropdownArrow = document.querySelector(".dropdown__arrow");
    const listItems = document.querySelectorAll(".dropdown__list-item");
    const dropdownSelectedNode = document.querySelector("#dropdown__selected");
    const listItemIds = [];

    dropdownSelectedNode.addEventListener("click", (e) => toggleListVisibility(e));
    dropdownSelectedNode.addEventListener("keydown", (e) => toggleListVisibility(e));

    listItems.forEach((item) => listItemIds.push(item.id));

    listItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        setSelectedListItem(e);
        closeList();
      });

      item.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
          case ENTER_KEY_CODE:
            setSelectedListItem(e);
            closeList();
            return;

          case DOWN_ARROW_KEY_CODE:
            focusNextListItem(DOWN_ARROW_KEY_CODE);
            return;

          case UP_ARROW_KEY_CODE:
            focusNextListItem(UP_ARROW_KEY_CODE);
            return;

          case ESCAPE_KEY_CODE:
            closeList();
            return;

          default:
            return;
        }
      });
    });

    function setSelectedListItem(e) {
      let selectedTextToAppend = document.createTextNode(e.target.innerText);
      dropdownSelectedNode.innerHTML = null;
      dropdownSelectedNode.appendChild(selectedTextToAppend);
      // console.log(selectedTextToAppend);
      document.querySelectorAll(".media").forEach((media) => {
        media.remove();
      });
      switch (selectedTextToAppend.textContent) {
        case "Popularité":
          // console.log("pop");
          // media = sortedPop;
          printMedia(sortedPop());
          break;
        case "Date":
          // console.log("date");
          // media = sortedDate;
          printMedia(sortedDate());
          break;
        case "Titre":
          // console.log("titre");
          // media = sortedTitle;
          printMedia(sortedTitle());
          break;

        default:
          // console.log("default");
          // printMedia(media);
          printMedia(sortedPop());

          break;
      }
    }

    function closeList() {
      list.classList.remove("open");
      dropdownArrow.classList.remove("expanded");
      listContainer.setAttribute("aria-expanded", false);
    }

    function toggleListVisibility(e) {
      let openDropDown = SPACEBAR_KEY_CODE.includes(e.keyCode) || e.keyCode === ENTER_KEY_CODE;

      if (e.keyCode === ESCAPE_KEY_CODE) {
        closeList();
      }

      if (e.type === "click" || openDropDown) {
        list.classList.toggle("open");
        dropdownArrow.classList.toggle("expanded");
        listContainer.setAttribute("aria-expanded", list.classList.contains("open"));
      }

      if (e.keyCode === DOWN_ARROW_KEY_CODE) {
        focusNextListItem(DOWN_ARROW_KEY_CODE);
      }

      if (e.keyCode === UP_ARROW_KEY_CODE) {
        focusNextListItem(UP_ARROW_KEY_CODE);
      }
    }

    function focusNextListItem(direction) {
      const activeElementId = document.activeElement.id;
      if (activeElementId === "dropdown__selected") {
        document.querySelector(`#${listItemIds[0]}`).focus();
      } else {
        const currentActiveElementIndex = listItemIds.indexOf(activeElementId);
        if (direction === DOWN_ARROW_KEY_CODE) {
          const currentActiveElementIsNotLastItem = currentActiveElementIndex < listItemIds.length - 1;
          if (currentActiveElementIsNotLastItem) {
            const nextListItemId = listItemIds[currentActiveElementIndex + 1];
            document.querySelector(`#${nextListItemId}`).focus();
          }
        } else if (direction === UP_ARROW_KEY_CODE) {
          const currentActiveElementIsNotFirstItem = currentActiveElementIndex > 0;
          if (currentActiveElementIsNotFirstItem) {
            const nextListItemId = listItemIds[currentActiveElementIndex - 1];
            document.querySelector(`#${nextListItemId}`).focus();
          }
        }
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
    printMedia(sortedPop());

    // let selectTriOption = document.querySelector(".dropdown-menu");
    // // selectTriOption.value = "Titre";
    // // console.log(selectTriOption.value);

    // selectTriOption.addEventListener("input", (e) => {
    //   console.log(selectTriOption.value);
    //   // window.location.reload();
    //   // printMedia(media);
    //   // return selectTriOption.value;

    //   document.querySelectorAll(".media").forEach((media) => {
    //     media.remove();
    //   });

    //   switch (selectTriOption.value) {
    //     case "Popularité":
    //       console.log("pop");
    //       // media = sortedPop;
    //       printMedia(sortedPop());
    //       break;
    //     case "Date":
    //       console.log("date");
    //       // media = sortedDate;
    //       printMedia(sortedDate());
    //       break;
    //     case "Titre":
    //       console.log("titre");
    //       // media = sortedTitle;
    //       printMedia(sortedTitle());
    //       break;

    //     default:
    //       console.log("default");
    //       printMedia(media);

    //       break;
    //   }
    // });

    // const item = document.activeElement;
    // console.log(item);

    //-------------------LIKES-------------------------------
    const btnLike = document.getElementsByClassName("btn-like");
    console.log(btnLike);
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
        console.log(e);
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

    const focusableElements = modal.getElementsByClassName("focusableElements");
    const firstFocusableElements = modal.getElementsByClassName("focusableElements")[0];
    const lastFocusableElements = modal.getElementsByClassName("focusableElements")[focusableElements.length - 1];
    // console.log(focusableElements);

    function keyPress(e) {
      console.log(e.target);

      if (e.keyCode === 16) {
        if (document.activeElement === firstFocusableElements) {
          lastFocusableElements.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElements) {
          firstFocusableElements.focus();
          e.preventDefault();
        }
      }

      if (e.target.className == "focusableElements closeModalForm" && e.keyCode === 13) {
        closeModal();
      }
      // console.log(document.activeElement.classList);

      if (e.target.className == "media" && e.keyCode === 13) {
        displayLightbox();
      }

      if (e.keyCode === 37) {
        slidePrecedente();
      } else if (e.keyCode === 39) {
        slideSuivante();
      } else if (e.keyCode === 27) {
        closeLightbox();
        closeModal();
      }
    }
    document.addEventListener("keydown", keyPress);
  }
}
const app = new App();
app.main();
