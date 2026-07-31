// Seleccionamos todos los botones de "Agregar +"
const botonesAgregar = document.querySelectorAll('.btn-add');

botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', (e) => {
        // Evitamos que cualquier otra acción de la tarjeta se dispare
        e.stopPropagation(); 

        // Obtenemos el contenedor padre (la tarjeta) para saber el nombre del viaje
        const tarjeta = boton.closest('.card');
        const nombreViaje = tarjeta.getAttribute('data-name');

        // Cambiamos el estado visual del botón
        if (!boton.classList.contains('agregado')) {
            boton.classList.add('agregado');
            boton.textContent = '¡Agregado! ✓';
            boton.style.backgroundColor = '#10b981'; // Cambia a verde
            
            console.log(` ${nombreViaje} ha sido añadido al carrito.`);
            // Aquí podrías sumar a un contador de compras real
        } else {
            // Si le vuelven a dar clic, lo quitamos
            boton.classList.remove('agregado');
            boton.textContent = 'Agregar +';
            boton.style.backgroundColor = '#2563eb'; // Vuelve al azul original
            
            console.log(` ${nombreViaje} fue removido del carrito.`);
        }
    });
});