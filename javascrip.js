document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach((carousel) => {
        let currentIndex = 0;
        const items = carousel.querySelectorAll('.carousel-item');
        const totalItems = items.length;

        // Crear contenedor para los indicadores
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.classList.add('indicators');

        // Función para mostrar el elemento actual
        const mostrarElemento = () => {
            items.forEach((item, index) => {
                item.style.display = index === currentIndex ? 'block' : 'none';
            });

            // Actualizar el estado de los indicadores
            Array.from(indicatorsContainer.children).forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        };

        // Inicializar los indicadores
        for (let i = 0; i < totalItems; i++) {
            const indicator = document.createElement('span');
            indicator.classList.add('indicator');
            if (i === currentIndex) indicator.classList.add('active');
            indicator.addEventListener('click', () => {
                currentIndex = i;
                mostrarElemento();
            });
            indicatorsContainer.appendChild(indicator);
        }

        // Inicializar el carrusel mostrando el primer elemento
        mostrarElemento();

        // Función para avanzar al siguiente elemento
        const siguiente = () => {
            currentIndex = (currentIndex + 1) % totalItems;
            mostrarElemento();
        };

        // Función para retroceder al elemento anterior
        const anterior = () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            mostrarElemento();
        };

        // Crear y agregar botones de navegación
        const btnSiguiente = document.createElement('button');
        btnSiguiente.classList.add('btn', 'btn-siguiente');
        btnSiguiente.innerHTML = '&#10095;';
        btnSiguiente.addEventListener('click', siguiente);

        const btnAnterior = document.createElement('button');
        btnAnterior.classList.add('btn', 'btn-anterior');
        btnAnterior.innerHTML = '&#10094;';
        btnAnterior.addEventListener('click', anterior);

        // Insertar botones y contenedor de indicadores en el carrusel
        const carouselContainer = carousel.closest('.carousel-container');
        carouselContainer.appendChild(btnAnterior);
        carouselContainer.appendChild(btnSiguiente);
        carouselContainer.appendChild(indicatorsContainer);
    });
});

// aqui le daremos vida al buscador //////////////////////////////////////7

document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    const searchInput = document.getElementById('buscador');
    const mensajeError = document.getElementById('mensajeError');
    const sugerencias = document.getElementById('sugerencias');
    const spinner = document.getElementById('spinner');
    const toggleThemeButton = document.getElementById('toggleTheme');
    const noResultsDiv = document.getElementById('no-results'); // Nuevo contenedor

    // Inicialmente ocultar mensaje de error
    mensajeError.style.display = 'none';

    // Mostrar sugerencias dinámicas
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        sugerencias.innerHTML = ''; // Limpia sugerencias previas

        if (!query) {
            sugerencias.style.display = 'none';
            return;
        }

        let suggestionsFound = false;

        carousels.forEach((carousel) => {
            const items = carousel.querySelectorAll('.carousel-item');
            items.forEach((item) => {
                const titulo = item.querySelector('.titulodepelicula').textContent.toLowerCase();

                if (titulo.includes(query)) {
                    const li = document.createElement('li');
                    li.textContent = titulo;
                    li.addEventListener('click', () => {
                        searchInput.value = titulo; // Autocompleta el buscador
                        sugerencias.style.display = 'none';
                        searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' })); // Ejecuta la búsqueda
                    });
                    sugerencias.appendChild(li);
                    suggestionsFound = true;
                }
            });
        });

        sugerencias.style.display = suggestionsFound ? 'block' : 'none';
    });

    // Búsqueda al presionar Enter
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') { // Detectar la tecla Enter
            const query = searchInput.value.trim().toLowerCase();
            let found = false;

            if (!query) {
                mensajeError.style.display = 'block';
                mensajeError.classList.add('visible');
                return;
            } else {
                mensajeError.style.display = 'none';
                mensajeError.classList.remove('visible');
            }

            spinner.style.display = 'block'; // Mostrar spinner

            setTimeout(() => {
                spinner.style.display = 'none'; // Ocultar spinner

                carousels.forEach((carousel) => {
                    const items = carousel.querySelectorAll('.carousel-item');
                    items.forEach((item) => {
                        const titulo = item.querySelector('.titulodepelicula').textContent.toLowerCase();

                        if (titulo.includes(query)) {
                            items.forEach((itm) => itm.style.display = 'none'); // Ocultar todos los elementos
                            item.style.display = 'block'; // Mostrar el elemento encontrado

                            const carouselContainer = carousel.closest('.carousel-container');
                            carouselContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

                            found = true;
                        }
                    });
                });

                if (!found) {
                    noResultsDiv.innerHTML = `
                        <p>No encontramos nada para "<b>${query}</b>". 😔</p>
                        <img src="https://i3.wp.com/c.tenor.com/x9-7KZEXRD4AAAAC/bob-esponja-patricio-estrella.gif" alt="No encontrado" />
                    `;
                    noResultsDiv.classList.remove('hidden');
                    noResultsDiv.style.display = 'block';

                    setTimeout(() => {
                        noResultsDiv.style.display = 'none'; // Ocultar después de unos segundos
                    }, 5000);
                }
            }, 1000); // Simula tiempo de carga
        }
    });
    
    // Cambiar tema oscuro/claro
    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleThemeButton.textContent = document.body.classList.contains('dark-mode')
            ? 'Modo Claro'
            : 'Modo Oscuro';
    });
});






// Video y clic en la imagen
const images = document.querySelectorAll('.carousel img');
const videoContainer = document.getElementById('videoContainer');
const video = document.getElementById('video');
const videoSource = document.getElementById('videoSource');

carousel.addEventListener('click', function(e) {
    if (e.target.tagName.toLowerCase() === 'img') {
        const videoFile = e.target.getAttribute('data-video');
        videoSource.src = videoFile;
        video.load();
        video.play();
        videoContainer.style.display = 'block';
    }
});

// Botón para cerrar el video
const closeVideoButton = document.getElementById('closeVideoButton');
closeVideoButton.addEventListener('click', () => {
    video.pause();  // Pausar el video
    video.currentTime = 0;  // Reiniciar el video
    videoContainer.style.display = 'none';  // Ocultar el contenedor del video
});

// Manejador de errores para el video
video.addEventListener('error', () => {
    alert("El video no se pudo cargar.");
});



// activa o cierra el menu lateral al achicar la pagina /////////////////////////

const menu = document.querySelector('.menu');
const btn = document.querySelector('.menu-btn');

    btn.addEventListener('click', () => {
        menu.classList.toggle('active')
    
    }
    // btn.addEventListener('click', () => {
    // 	menu.classList.toggle('pause')
    // }
    );

    


// le da sonido a los botones   ////////////////////////////////////////////////////     

type="text/javascript">
	$(document).ready(function(){

		// $('.menu-i').mouseup(function(){
		// 	$('audio')[1].play();
		// });

		// $('.imagenpeli').mouseenter(function(){
		// 	$('audio')[5].play();
		// });

		// $('.ContenedorBuscador').mouseup(function(){
		// 	$('audio')[4].play();
		// });

		// $('.n').mousedown(function(){
		// 	$('audio')[6].play();
		// });
	});
