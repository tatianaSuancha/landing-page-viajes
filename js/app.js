// 1. Selección de elementos del DOM por su ID en español
const botonAbrir = document.getElementById('boton-abrir-carrito');
const botonCerrar = document.getElementById('boton-cerrar-carrito');
const capaOscura = document.getElementById('capa-oscura-carrito');

// 2. Event Listener para ABRIR el carrito (añade la clase CSS '.activo')
botonAbrir.addEventListener('click', () => {
    capaOscura.classList.add('activo');
});

// 3. Event Listener para CERRAR con el botón de 'X' (remueve la clase '.activo')
botonCerrar.addEventListener('click', () => {
    capaOscura.classList.remove('activo');
});

// 4. Event Listener para CERRAR haciendo clic fuera del panel (en la capa oscura)
capaOscura.addEventListener('click', (evento) => {
    if (evento.target === capaOscura) {
        capaOscura.classList.remove('activo');
    }
});