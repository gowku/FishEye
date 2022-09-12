function photographerFactory(data) {
  // console.log(data);
  const { name, portrait, city, country, id, price, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const $wrapper = document.createElement("article");
    // $wrapper.setAttribute("href", `./photographer.html?id=${id}`);

    const article = `
  
                      
                       <a href="./photographer.html?id=${id}">
                           <img src=${picture} alt='${name}'>
                           <h2>${name}</h2>
                           </a>
                           
                           <p class='location'>${city}, ${country}</p>
                           <p> ${tagline} </p>
                           <p>${price}€/jour</p>                      
                    
                    
                    `;

    $wrapper.innerHTML = article;
    return $wrapper;
  }
  return { name, portrait, city, country, id, price, tagline, picture, getUserCardDOM };
}
