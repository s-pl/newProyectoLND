import {filterByPrice, houseLoader} from './house-list.js'
// Obtener elementos del DOM para los filtros
const priceFilterBtn = document.getElementById('price-filter-btn');

const clearFiltersBtn = document.getElementById('clear-filters-btn');
const priceRange = document.getElementById('price-range');

const priceFilter = document.getElementById('price-filter');
const priceValue = document.getElementById('price-value');


// Mostrar el rango de precio cuando se hace clic en el botón
priceFilterBtn.addEventListener('click', () => {
    priceRange.style.display = priceRange.style.display === 'none' ? 'inline-block' : 'none';

});

// Mostrar la lista de ubicaciones cuando se hace clic en el botón


// Limpiar los filtros
clearFiltersBtn.addEventListener('click', () => {
    priceFilter.value = 1000000; // Rango de precio por defecto
    priceValue.textContent = priceFilter.value.toLocaleString(); // Actualizar el valor del precio máximo
    priceRange.style.display = 'none'; // Ocultar el rango de precio
   
    houseLoader(); // Recargar casas sin filtros
});

// Actualizar el precio máximo seleccionado
priceFilter.addEventListener('input', () => {
    priceValue.textContent = Number(priceFilter.value.toLocaleString()); // Mostrar el valor del precio en el DOM
    filterByPrice(priceFilter.value) // Recargar casas con el nuevo filtro de precio
});


