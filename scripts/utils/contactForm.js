const body = document.getElementsByTagName("body");
const modal = document.getElementById("contact_modal");
const main = document.getElementsByTagName("main");
const firstFocusableElements = modal.getElementsByClassName("focusableElements")[0];
console.log(firstFocusableElements);

// console.log(body);

function displayModal() {
  main[0].setAttribute("aria-hidden", "true");
  body[0].classList.add("noscroll");
  modal.style.display = "block";
  firstFocusableElements.focus();
}

function closeModal() {
  main[0].setAttribute("aria-hidden", "false");
  body[0].classList.remove("noscroll");
  modal.style.display = "none";
}

const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const message = document.getElementById("message");
const btnSubmit = document.querySelector(".contact_button");

const masqueNomPrenom = /^[A-Za-z-]{2,30}$/;
const masqueMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// console.log(prenom, nom, email, message);

const checkprenom = () => {
  if (!masqueNomPrenom.test(prenom.value)) {
    // console.log("prenom invalide");
    prenom.parentElement.setAttribute("data-error-visible", true);
    prenom.parentElement.setAttribute("data-error", "Vous devez entrer 2 caractere minimum");
    return false;
  } else {
    prenom.parentElement.setAttribute("data-error-visible", false);
    return true;
  }
};

prenom.addEventListener("input", () => {
  checkprenom();
});

const checknom = () => {
  if (!masqueNomPrenom.test(nom.value)) {
    // console.log("nom invalide");
    nom.parentElement.setAttribute("data-error-visible", true);
    nom.parentElement.setAttribute("data-error", "Vous devez entrer 2 caractere minimum");
    return false;
  } else {
    nom.parentElement.setAttribute("data-error-visible", false);
    return true;
  }
};
nom.addEventListener("input", () => {
  checknom();
});

const checkemail = () => {
  if (!masqueMail.test(email.value)) {
    // console.log("email invalide");
    email.parentElement.setAttribute("data-error-visible", true);
    email.parentElement.setAttribute("data-error", "Vous devez entrer 2 caractere minimum");
    return false;
  } else {
    email.parentElement.setAttribute("data-error-visible", false);
    return true;
  }
};
email.addEventListener("input", () => {
  checkemail();
});

const checkmessage = () => {
  if (!masqueNomPrenom.test(message.value)) {
    // console.log("message invalide");
    message.parentElement.setAttribute("data-error-visible", true);
    message.parentElement.setAttribute("data-error", "Vous devez entrer 2 caractere minimum");
    return false;
  } else {
    message.parentElement.setAttribute("data-error-visible", false);
    return true;
  }
};
message.addEventListener("input", () => {
  checkmessage();
});

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  if (checkprenom() && checknom() && checkemail() && checkmessage()) {
    console.log({
      form: {
        prenom: prenom.value,
        nom: nom.value,
        email: email.value,
        message: message.value,
      },
    });
    prenom.value = "";
    nom.value = "";
    email.value = "";
    message.value = "";
    closeModal();
  } else {
    console.log(false);
  }
});
