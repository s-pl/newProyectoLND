import {addToWishlist,rentHouse } from './user-handler.js'
const HOUSE_CONTAINER = document.getElementById('house-list')

//Hacemos un fetch para conseguir los datos de ../data/house-list.json

/*
Para poder detectar en que casa se hace click se hará lo siguiente:

-asignamos una id dependiendo del index del .forEach (0,1,2,3,4,5,6,7,8,...)
-añadimos un onclick a cada div generado, que ejecutará: rentHouse(this.id)
-this.id devuelve la ID del div, que está relacionada con la posición en el array de house-list. (https://stackoverflow.com/questions/4825295/onclick-to-get-the-id-of-the-clicked-button)

*/
export function houseLoader() {
    let content = '';
    HOUSE_CONTAINER.innerHTML = content;
    fetch('../data/house-list.json')
        .then(response => response.json())
        .then(data => {
            let content = ''; // Usar una variable temporal para mejorar el rendimiento
            data.forEach((element,index) => {
                content += `
                  <div class="property-card" id="${index}" data-aos="fade-up-right">
                      <img src="${element.image}" alt="${element.title}">
                      <div class="details" >
                          <h3>${element.title} 
                              <i class="bi bi-heart wishlist-icon" data-id="${index}"></i>
                          </h3>
                          <p>${element.description}</p>
                          <p class="price">${element.price} IVA Incluido</p>
                      </div>
                  </div>
                `;
            });
            HOUSE_CONTAINER.innerHTML = content;

            // Evento para los íconos del corazón
            document.querySelectorAll('.wishlist-icon').forEach(icon => {
                icon.addEventListener('click', function(event) {
                    event.stopPropagation(); // Evita propagación al div padre
                    const houseId = this.getAttribute('data-id');
                    this.style.color = 'red';
                    addToWishlist(houseId); 
                });
            });

            // Evento para los contenedores de las propiedades
            document.querySelectorAll('.property-card').forEach(card => {
                card.addEventListener('click', function() {
                    const houseId = this.id; // El ID único de la casa
                    rentHouse(houseId); // Llama a la función de rentar casa
                });
            });
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}
export function filterByPrice(price) {
    fetch('../data/house-list.json')
        .then(response => response.json())
        .then(data => {
            // Limpiar el contenedor de casas antes de agregar las filtradas
            let content = ''; 

            // Usar un bucle for para recorrer las casas y filtrarlas según el precio
            for (let i = 0; i < data.length; i++) {
                const house = data[i];
                
                if (Number(house.price.split("€")[0]) <= price) {
                 
                    content += `
                        <div class="property-card" id="${i}">
                            <img src="${house.image}" alt="${house.title}">
                            <div class="details">
                                <h3>${house.title} 
                                    <i class="bi bi-heart wishlist-icon" data-id="${i}"></i>
                                </h3>
                                <p>${house.description}</p>
                                <p class="price">${house.price} IVA Incluido</p>
                            </div>
                        </div>
                    `;
                }
            }

         
            HOUSE_CONTAINER.innerHTML = content;

          
            document.querySelectorAll('.wishlist-icon').forEach(icon => {
                icon.addEventListener('click', function(event) {
                    event.stopPropagation(); // Evita propagación al div padre
                    const houseId = this.getAttribute('data-id');
                    addToWishlist(houseId); // Llama a la función con el ID único
                });
            });

            // Evento para los contenedores de las propiedades
            document.querySelectorAll('.property-card').forEach(card => {
                card.addEventListener('click', function() {
                    const houseId = this.id; 
                    rentHouse(houseId); // Llama a la función de rentar casa
                });
            });
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}

houseLoader();
