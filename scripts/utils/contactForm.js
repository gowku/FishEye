function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const message = document.getElementById("message");
const btnSubmit = document.querySelector(".contact_button");

console.log(prenom, nom, email, message);

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();

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
});
