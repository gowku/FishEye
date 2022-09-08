function photographerFactory(data) {
  console.log(data);
  const { name, portrait, city, country, id, price, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = `<article>
                       <img src=${picture}>
                       <h2>${name}</h2>
                         <p class='location'>${city}, ${country}</p>
                         <p> ${tagline} </p>
                         <p>${price}€/jour</p>                      
                    </article>`;
    return article;
  }
  return { name, picture, getUserCardDOM };
}
