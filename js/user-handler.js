const REGISTER_MODAL = document.getElementById("register-modal");
const LOGIN_MODAL = document.getElementById('login-modal');
const REG_BTN = document.getElementById("register-modal-opener");
const LOG_BTN = document.getElementById('login-modal-opener')
const CLOSE_MODAL = document.getElementsByClassName("close")[0];
const CLOSE_LOGIN_MODAL = document.getElementsByClassName("close")[1];
const CLOSE_WISH_MODAL = document.getElementsByClassName("close")[2];
const BUTTON_REGISTER = document.getElementById('submit-register');
const BUTTON_LOGIN = document.getElementById('submit-login');
const SEE_WISHLIST = document.getElementById('wishlist-viewer')
const WISHLIST = document.getElementById('wishlist')
const WISHLIST_CONTAINER = document.getElementById('wishlist-container')
const CLOSE_BOOK_MODAL = document.getElementsByClassName('close')[3]

const SEE_BOOKINGS = document.getElementById('bookings-viewer')
const BOOKINGS = document.getElementById('bookings')
const BOOKINGS_CONTAINER = document.getElementById('bookings-container')
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, arrayUnion,arrayRemove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC1rzgKotUmuqYdrFcZ71bCAHEfo0rNm2c",
  authDomain: "proyecto-lnd-8a35f.firebaseapp.com",
  projectId: "proyecto-lnd-8a35f",
  storageBucket: "proyecto-lnd-8a35f.appspot.com", 
  messagingSenderId: "1076534043083",
  appId: "1:1076534043083:web:df702ce4d24aeff779964e"
};

//Inicialización
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);



REG_BTN.onclick = function() {
    REGISTER_MODAL.style.display = "block";
}

CLOSE_MODAL.onclick = function() {
    REGISTER_MODAL.style.display = "none";
   
}
CLOSE_LOGIN_MODAL.onclick = function() {
  LOGIN_MODAL.style.display = "none";
 
}
CLOSE_WISH_MODAL.onclick = function() {
  WISHLIST.style.display = "none";
 
}
CLOSE_BOOK_MODAL.onclick = function() {
  BOOKINGS.style.display = "none";
 
}
LOG_BTN.onclick = function() {
  LOGIN_MODAL.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == REGISTER_MODAL) {
    REGISTER_MODAL.style.display = "none";
  }
} 


BUTTON_REGISTER.addEventListener('click', function(event) {
    event.preventDefault();
    
    
    const ISVALIDPASS = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    
   
    const FIRST_NAME = document.getElementById('first-name').value;
    const LAST_NAME = document.getElementById('last-name').value;
    const EMAIL = document.getElementById('email').value;
    const PASSWORD = document.getElementById('password').value;
  
    
    let ISVALID= true;
  
   
    if (FIRST_NAME.trim() === "") { //Si cuando quita los espacios iniciales y finales (no intermedios) no hay texto -> accion
      document.getElementById('error-first-name').style.display = 'block';
      document.getElementById('first-name').style.borderColor = 'red';
      ISVALID = false;
    } else {
      document.getElementById('error-first-name').style.display = 'none';
      document.getElementById('first-name').style.borderColor = '';
    }
  
    
    if (LAST_NAME.trim() === "") {
      document.getElementById('error-second-name').style.display = 'block';
      document.getElementById('last-name').style.borderColor = 'red';
      ISVALID = false;
    } else {
      document.getElementById('error-second-name').style.display = 'none';
      document.getElementById('last-name').style.borderColor = '';
    }
  
   
    const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!EMAIL_PATTERN.test(EMAIL)) {
      document.getElementById('error-email').style.display = 'block';
      document.getElementById('email').style.borderColor = 'red';
      ISVALID = false;
    } else {
      document.getElementById('error-email').style.display = 'none';
      document.getElementById('email').style.borderColor = '';
    }
  
   
    if (!ISVALIDPASS.test(PASSWORD)) {
      document.getElementById('error-password').style.display = 'block';
      document.getElementById('password').style.borderColor = 'red';
      ISVALID = false;
    } else {
      document.getElementById('error-password').style.display = 'none';
      document.getElementById('password').style.borderColor = '';
    }
  
    
    if (ISVALID) {
      registerWithEmail(EMAIL, PASSWORD, FIRST_NAME, LAST_NAME);
    } else {
      console.log("Hay errores en el formulario.");
    }
  });





  BUTTON_LOGIN.addEventListener('click', function(event) {
    event.preventDefault();
    const ISVALIDPASS = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    const EMAIL = document.getElementById('login-email').value;
    const PASSWORD = document.getElementById('login-password').value;
  
    
    let ISVALID= true;
  
   
    const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!EMAIL_PATTERN.test(EMAIL)) {
      document.getElementById('login-error-email').style.display = 'block';
      document.getElementById('login-email').style.borderColor = 'red';
      ISVALID = false;
    } else {
      document.getElementById('login-error-email').style.display = 'none';
      document.getElementById('login-email').style.borderColor = '';
    }
  
   
    if (!ISVALIDPASS.test(PASSWORD)) {
      document.getElementById('login-error-password').style.display = 'block';
      document.getElementById('login-password').style.borderColor = 'red';
      ISVALID = false;
    } else {
      document.getElementById('login-error-password').style.display = 'none';
      document.getElementById('login-password').style.borderColor = '';
    }
  
    
    if (ISVALID) {
      loginWithEmail(EMAIL,PASSWORD)
    } else {
      console.log("Hay errores en el formulario.");
    }
  });

  SEE_WISHLIST.addEventListener('click', async function() {
    WISHLIST.style.display = 'flex';
    
    WISHLIST_CONTAINER.innerHTML = '';
  
    const WISHLIST_DATA = await getUserData(localStorage.getItem('uid'));
    

    const houseList = await fetch('../data/house-list.json')  
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error('Error al cargar las casas desde el archivo JSON:', error);
            return []; 
        });

  
    for (let index = 0; index < WISHLIST_DATA.wishlistArray.length; index++) {
        const houseIndex = WISHLIST_DATA.wishlistArray[index]; 
        
        
        if (houseIndex >= 0 && houseIndex < houseList.length) {
            const houseData = houseList[houseIndex]; 
            
        
        
            
            WISHLIST_CONTAINER.innerHTML += `
                <div class="wishlist-card">
                    <div class="wishlist-card-header">
                        <img src="${houseData.image}" alt="${houseData.title}" class="wishlist-card-image">
                        <div class="wishlist-card-info">
                            <h3 class="wishlist-card-title">${houseData.title}</h3>
                            <p class="wishlist-card-description">${houseData.description}</p>
                        </div>
                    </div>
                    <div class="wishlist-card-footer">
                        <p class="wishlist-card-price">${houseData.price} <span>IVA incluido</span></p>
                        <button class="remove-from-wishlist" id="${houseIndex}">Eliminar</button>
                    </div>
                </div>
            `;
        } else {
            console.error("error");
        }
    }
});


SEE_BOOKINGS.addEventListener('click', async function () {
  BOOKINGS.style.display = 'flex'; // Muestra el modal de reservas

  try {
    const BOOKINGS_DATA = await getUserData(localStorage.getItem('uid')); // Obtiene los datos del usuario
    const houseList = await fetch('../data/house-list.json')
      .then(response => response.json())
      .catch(error => {
        console.error('Error al cargar las casas desde el archivo JSON:', error);
        return [];
      });

    BOOKINGS_CONTAINER.innerHTML = ''; // Limpia el contenedor antes de agregar las reservas

    // Obtener los días de viaje desde el localStorage y verificar si es un número válido
    const daysTravelling = Number(localStorage.getItem('daysTravelling'));
    console.log(daysTravelling)
    if (isNaN(daysTravelling)) {
      console.error('Días de viaje no definidos o inválidos');
      return; // Si los días de viaje no son válidos, detenemos la ejecución.
    }

    // Itera sobre las reservas y agrega las tarjetas
    for (let index = 0; index < BOOKINGS_DATA.houseArray.length; index++) {
      const houseDataObject = BOOKINGS_DATA.houseArray[index];  // Es el objeto con houseId y daysTravelling
      const houseId = houseDataObject.houseId;  // Obtén el houseId

      if (houseId >= 0 && houseId < houseList.length) {
        const houseData = houseList[houseId];
        // Aquí calculamos el precio total
       const price =  Number(houseData.price.split("€")[0]) * daysTravelling
       console.log(price)

        BOOKINGS_CONTAINER.innerHTML += `
          <div class="bookings-card">
            <div class="bookings-card-header">
              <img src="${houseData.image}" alt="${houseData.title}" class="bookings-card-image">
              <div class="bookings-card-info">
                <h3 class="bookings-card-title">${houseData.title}</h3>
                <p class="bookings-card-description">${houseData.description}</p>
              </div>
            </div>
            <div class="bookings-card-footer">
              <p class="bookings-card-price">${price}€ Total <span>IVA incluido</span></p>
              <button class="remove-from-bookings" id="${houseId}">Cancelar Reserva</button>
            </div>
          </div>
        `;
      } else {
        console.error('Índice de casa inválido:', houseDataObject);
      }
    }

  } catch (error) {
    console.error('Error al obtener los datos de reservas:', error);
  }
});

BOOKINGS_CONTAINER.addEventListener('click', async function (event) {
  if (event.target.classList.contains('remove-from-bookings')) {
    
    const houseId = event.target.id; 
    rentHouse(houseId); 
  }
});
WISHLIST_CONTAINER.addEventListener('click', async function (event) {
  if (event.target.classList.contains('remove-from-wishlist')) {
    const wishlistId = event.target.id;
    addToWishlist(wishlistId);
    
  }
});


  export async function addToWishlist(houseId) {
    
    if (!houseId) {
      console.log("No se proporcionó ningún ID para manejar en la wishlist.");
      return;
    }
  
    const userId = localStorage.getItem("uid"); 
    if (!userId) {
      console.error("No se encontró el UID del usuario en localStorage.");
      return;
    }
  
    const userRef = doc(db, "users", userId); 
  
    try {
      
      // Obtener el documento actual del usuario
      const docSnap = await getDoc(userRef);
  
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const wishlistArray = userData.wishlistArray || [];
  
        if (wishlistArray.includes(houseId)) {
          sendMessage("Producto eliminado de la lista de deseos.");
          await setDoc(
            userRef,
            { wishlistArray: arrayRemove(houseId) },
            { merge: true }
          );
          console.log(`ID ${houseId} eliminado de la wishlist.`);
        } else {
          sendMessage("Producto añadido a la lista de deseos.");
          await setDoc(
            userRef,
            { wishlistArray: arrayUnion(houseId) },
            { merge: true }
          );
          console.log(`ID ${houseId} agregado a la wishlist.`);
        }
      } else {
        console.log("El documento del usuario no existe, creando una nueva wishlist.");
        await setDoc(
          userRef,
          { wishlistArray: arrayUnion(houseId) },
          { merge: true }
        );
        console.log(`ID ${houseId} agregado a la nueva wishlist.`);
      }
    } catch (error) {
      console.error("Error al manejar la wishlist:", error.message);
    }
  }

  export async function rentHouse(houseId) {
    const daysTravelling = localStorage.getItem('daysTravelling');
    
    if (!houseId || !daysTravelling) {
      sendMessage("Debes introducir los días que quieres viajar.");
      return;
    }
  
    const userId = localStorage.getItem("uid");
    if (!userId) {
      console.error("No se encontró el UID del usuario en localStorage.");
      return;
    }
  
    const userRef = doc(db, "users", userId);
  
    try {
      
      const docSnap = await getDoc(userRef);
      let houseArray = [];
  
      if (docSnap.exists()) {
        const userData = docSnap.data();
        houseArray = userData.houseArray || [];
      }
  
      
      const existingIndex = houseArray.findIndex(house => house.houseId === houseId);
  
      if (existingIndex !== -1) {
        
        houseArray.splice(existingIndex, 1);
        sendMessage("Casa eliminada de tus reservas.");
        console.log(`ID ${houseId} eliminado de la houseArray.`);
      } else {
        
        const houseData = {
          houseId: houseId,
          daysTravelling: daysTravelling
        };
        houseArray.push(houseData);
        sendMessage("Casa añadida a tus reservas.");
        console.log(`ID ${houseId} agregado a la houseArray.`);
      }
  
      // Actualizar el array completo en Firestore
      await setDoc(userRef, { houseArray }, { merge: true });
    } catch (error) {
      console.error("Error al manejar la houseArray:", error.message);
    }
  }
  
function registerWithEmail(email, password, firstName, lastName) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      }).then(() => {
        console.log("Perfil actualizado con nombre y apellidos:", user.displayName);
        document.getElementById("register-modal").style.display = 'none';
        localStorage.setItem('uid', user.uid)
        localStorage.setItem("dispname", user.displayName);
        const userData = {
          houseArray: [],
          wishlistArray:[]
        };
        saveUserData(user.uid, userData)
        
      }).catch((error) => {
        console.error("Error al actualizar el perfil:", error.message);
      });
    })
    .catch((error) => {
      console.error("Error en el registro:", error.message);
    });
}


function loginWithEmail(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      document.getElementById("login-modal").style.display = 'none';
      const user = userCredential.user;
      localStorage.setItem("dispname", user.displayName);
      localStorage.setItem("uid", user.uid);
      location.reload();
    })
    .catch((error) => {
      console.error("Error en el log-in:", error.message);
    });
}

async function saveUserData(userId, data) {
  try {
    await setDoc(doc(db, "users", userId), data);
    console.log("Datos guardados exitosamente");
  } catch (error) {
    console.error("Error al guardar datos:", error);
  }
}





function sendMessage(deletedOrNot) {
  const message = document.getElementById('message');
  message.textContent = deletedOrNot;
  message.classList.remove('hide');
  message.classList.add('show');
  setTimeout(() => {
      message.classList.add('hide');
      setTimeout(() => {
          message.classList.remove('show'); 
          message.classList.remove('hide'); 
      }, 500); 
  }, 3000); 
}

  
async function getUserData(userId) {
  try {
    const docSnap = await getDoc(doc(db, "users", userId));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No se encontró el documento");
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}
