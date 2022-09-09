function photographerFactory(data) {
  console.log(data);
  const { name, portrait, city, country, id, price, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const $wrapper = document.createElement("a");
    $wrapper.setAttribute("href", `./photographer.html?id=${id}`);

    const article = `
  
                       <article>
                           <img src=${picture} alt='${name}'>
                           <h2>${name}</h2>
                           <p class='location'>${city}, ${country}</p>
                           <p> ${tagline} </p>
                           <p>${price}€/jour</p>                      
                       </article>
                    
                    `;

    $wrapper.innerHTML = article;
    return $wrapper;
  }
  return { name, portrait, city, country, id, price, tagline, picture, getUserCardDOM };
}
