if(localStorage.uid && localStorage.dispname){
    const LOGIN = document.getElementById('login-modal-opener');
    const REGISTER = document.getElementById('register-modal-opener');
    const BOOKINGS = document.getElementById('bookings-viewer'); 
    const WISHLIST = document.getElementById('wishlist-viewer');
    const CONTAINER = document.getElementById('container');
    LOGIN.style.display = 'none';
    REGISTER.style.display = 'none';
    
    BOOKINGS.style.display = 'inline-block';
    WISHLIST.style.display = 'inline-block';
    CONTAINER.style.display = 'inline-block';
} else {
    const LOGIN = document.getElementById('login-modal-opener');
    const REGISTER = document.getElementById('register-modal-opener');
    const BOOKINGS = document.getElementById('bookings');
    
    const WISHLIST = document.getElementById('wishlist-viewer');

    LOGIN.style.display = 'inline-block';  // Muestra el login
    REGISTER.style.display = 'inline-block';  // Muestra el registro
    BOOKINGS.style.display = 'none';  // Oculta las reservas
    
    WISHLIST.style.display = 'none';  // Oculta la wishlist
}
