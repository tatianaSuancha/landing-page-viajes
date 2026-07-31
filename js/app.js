// ===============================================
// SE GUARDAN EN CONSTANTES LOS ELEMENTOS DEL DOM
// ===============================================
// Capturamos los elementos del DOM por su ID
const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const cuerpoCarrito = document.getElementById("cuerpo-carrito");
const contadorCarrito = document.getElementById("contador-carrito");
const totalCarrito = document.getElementById("total-carrito");

const botonAbrir = document.getElementById("boton-abrir-carrito");
const botonCerrar = document.getElementById("boton-cerrar-carrito");
const capaOscura = document.getElementById("capa-oscura-carrito");

// Capturamos el botón de reserva usando su clase CSS
const botonConfirmar = document.querySelector(".boton-confirmar-reserva");

// ========================================================
// FUNCIONALIDAD PARA ABRIR O CERRAR LA VENTNA DEL CARRITO
// =========================================================
botonAbrir.addEventListener('click', () => {
    capaOscura.classList.add('activo');
});

botonCerrar.addEventListener('click', () => {
    capaOscura.classList.remove('activo');
});

capaOscura.addEventListener('click', (evento) => {
    if (evento.target === capaOscura) {
        capaOscura.classList.remove('activo');
    }
});

// ==================================================
// CREAR EL ARAY CON LOS OBJETOS DE LOS PAQUETES
// ==================================================
const paquetesViajes = [
    {
        id: 1,
        nombre: "Cancún Paradise",
        descripcion: "5 días y 4 noches en resort All Inclusive con tiquetes aéreos incluidos.",
        precio: 3400000,
        imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
        alt: "Imagen Cancún"
    },
    {
        id: 2,
        nombre: "Machu Picchu Mágico",
        descripcion: "Recorrido guiado por Cuzco y la ciudadela inca con tren de primera clase.",
        precio: 2880000,
        imagen: "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=500&q=80",
        alt: "Imagen Machu Picchu"
    },
    {
        id: 3,
        nombre: "París Romance",
        descripcion: "7 días explorando la Torre Eiffel, Museos de Louvre y crucero por el Sena.",
        precio: 5800000,
        imagen: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80",
        alt: "Imagen París"
    },
    {
        id: 4,
        nombre: "Tokio Moderno",
        descripcion: "Descubre la mezcla perfecta de tradición y modernidad en la ciudad que nunca duerme.",
        precio: 7560000,
        imagen: "../img/tokio.png",
        alt: "Imagen tokio"
    },
    {
        id: 5,
        nombre: "Roma Clásica",
        descripcion: "Explora la historia y la arquitectura de la antigua Roma, donde cada calle cuenta una historia.",
        precio: 8000000,
        imagen: "../img/roma.jpg",
        alt: "Imagen roma"
    },
    {
        id: 6,
        nombre: "Bariloche Natural",
        descripcion: "Sumérgete en la belleza natural de Bariloche, con sus lagos cristalinos y montañas majestuosas.",
        precio: 8400000,
        imagen: "../img/bariloche.jpg",
        alt: "Imagen bariloche"
    },
    {
        id: 7,
        nombre: "Egipto Místico",
        descripcion: "Navega por el río Nilo y descubre los secretos milenarios de las pirámides de Giza.",
        precio: 6600000,
        imagen: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=500&q=80",
        alt: "Imagen Egipto"
    },
    {
        id: 8,
        nombre: "Australia Salvaje",
        descripcion: "Explora la Ópera de Sídney y sumérgete en la espectacular Gran Barrera de Coral.",
        precio: 9200000,
        imagen: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=500&q=80",
        alt: "Imagen Australia"
    },
    {
        id: 9,
        nombre: "Grecia Soñada",
        descripcion: "Relájate en los hermosos atardeceres de Santorini y recorre la mítica Acrópolis de Atenas.",
        precio: 6200000,
        imagen: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=500&q=80",
        alt: "Imagen Grecia"
    }
];

// ==========================================
// INICIALIZAR EL CARRITO DE COMPRAS
// ==========================================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ==========================================
// MOSTRAR LOS PAQUETES EN PANTALLA
// ==========================================
function renderizarPaquetes() {
    contenedorTarjetas.innerHTML = "";

    paquetesViajes.forEach((viaje) => {
        const tarjetaHtml = `
            <article class="tarjeta-viaje" data-name="${viaje.nombre}">
                <img src="${viaje.imagen}" alt="${viaje.alt}" class="imagen-tarjeta">
                <h2 class="titulo-tarjeta">${viaje.nombre}</h2>
                <p class="descripcion-tarjeta">${viaje.descripcion}</p>
                <div class="info-tarjeta">
                    <p class="precio">$${viaje.precio.toLocaleString('es-CO')} COP</p>
                    <button class="boton-agregar" onclick="agregarAlCarrito(${viaje.id})">Agregar +</button>
                </div>
            </article>
        `;
        contenedorTarjetas.innerHTML += tarjetaHtml;
    });
}

// ==========================================
// LOGICA DEL CARRITO DE COMPRAS
// ==========================================

// Añadir al carrito controlando duplicados
function agregarAlCarrito(id) {
    // Buscamos si el viaje ya existe dentro de la lista actual del carrito
    const viajeExistente = carrito.find(item => item.id === id);

    if (viajeExistente) {
        // Si ya existe, simplemente W3 aumenta la cantidad en 1
        viajeExistente.cantidad++;
    } else {
        // Si es nuevo, se busca los datos del viaje en el array de paquetes y se le asigna el 1
        const paqueteSeleccionado = paquetesViajes.find(viaje => viaje.id === id);
        carrito.push({ ...paqueteSeleccionado, cantidad: 1 });
    }

    actualizarInterfazCarrito();
}

// Eliminar o disminuir cantidad del carrito
function eliminarDelCarrito(id) {
    const viajeExistente = carrito.find(item => item.id === id);

    if (viajeExistente) {
        if (viajeExistente.cantidad > 1) {
            // Si tiene más de una unidad, restamos una sola
            viajeExistente.cantidad--;
        } else {
            // Si solo queda una unidad, removemos el producto por completo del array
            carrito = carrito.filter(item => item.id !== id);
        }
    }

    actualizarInterfazCarrito();
}

// Dibuja el carrito y controla estados de los botones
function actualizarInterfazCarrito() {
    cuerpoCarrito.innerHTML = "";

    if (carrito.length === 0) {
        cuerpoCarrito.innerHTML = `<p style="text-align:center; padding: 20px; color: #777;">Tu carrito está vacío.</p>`;

        // Se bloquea el boton de confirmar 
        botonConfirmar.disabled = true;
        botonConfirmar.style.opacity = "0.5";
        botonConfirmar.style.cursor = "not-allowed";
    } else {
        //Se activa elk boton de confirmar
        botonConfirmar.disabled = false;
        botonConfirmar.style.opacity = "1";
        botonConfirmar.style.cursor = "pointer";
    }

    // Se muestran las tarjetas del carrito agrupadas
    carrito.forEach((viaje) => {
        const precioAcumulado = viaje.precio * viaje.cantidad;

        const elementoHtml = `
            <div class="elemento-carrito">
                <img src="${viaje.imagen}" alt="${viaje.nombre}" class="imagen-producto-carrito">
                <div class="detalles-producto-carrito">
                    <h4>${viaje.nombre} <span style="color: #ff6b6b; font-weight: bold; font-size: 0.9em;">(x${viaje.cantidad})</span></h4>
                    <p>$${precioAcumulado.toLocaleString('es-CO')} COP</p>
                </div>
                <button class="boton-eliminar-producto" title="Eliminar" onclick="eliminarDelCarrito(${viaje.id})">&times;</button>
            </div>
        `;
        cuerpoCarrito.innerHTML += elementoHtml;
    });

    // Se cuentan las cantidades de cada viaje
    const totalCantidades = carrito.reduce((suma, viaje) => suma + viaje.cantidad, 0);
    contadorCarrito.textContent = totalCantidades;

    // Total general multiplicando precio por cantidad
    const precioTotal = carrito.reduce((suma, viaje) => suma + (viaje.precio * viaje.cantidad), 0);
    totalCarrito.textContent = `$${precioTotal.toLocaleString('es-CO')} COP`;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ==========================================
// 7. FLUJO DE RESERVA Y REDIRECCIÓN PAGO
// ==========================================
botonConfirmar.addEventListener("click", () => {
    // 1. Creamos una ventanita pequeña y elegante centrada
    const avisoPago = document.createElement("div");
    avisoPago.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: #1a1a1a; color: #fff; padding: 25px 40px; border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5); text-align: center; 
        z-index: 99999; font-family: sans-serif; border: 1px solid #333;
    `;

    avisoPago.innerHTML = `
        <span style="font-size: 40px;">💳</span>
        <h3 style="margin: 10px 0 5px; font-size: 1.3em;">Redirigiendo a la pasarela...</h3>
        <p style="margin: 0; color: #aaa; font-size: 0.9em;">Tu pago seguro se cargará en 3 segundos.</p>
    `;

    document.body.appendChild(avisoPago);

    // temporizador de 3 segundos para redireccionar y borrar el localStorage
    setTimeout(() => {
        avisoPago.remove(); // Borra la ventanita
        carrito = []; // Vacía el carrito
        actualizarInterfazCarrito(); // Actualiza el LocalStorage y la pantalla
        capaOscura.classList.remove('activo'); // Cierra el carrito lateral
    }, 3000);
});

// ==========================================
// 8. ARRANQUE DE LA APLICACIÓN
// ==========================================
renderizarPaquetes();
actualizarInterfazCarrito();