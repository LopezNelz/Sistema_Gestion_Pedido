// Funcionalidades básicas del sitio web

// Inicialización cuando el documento está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips de Bootstrap si existen
    var listaTooltips = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipsBootstrap = listaTooltips.map(function (elementoTooltip) {
        return new bootstrap.Tooltip(elementoTooltip);
    });

    // Manejo de tooltips personalizados para PC y móvil
    const elementosConTooltip = document.querySelectorAll('.tooltip-personalizado[data-tooltip]');
    
    elementosConTooltip.forEach(function(elemento) {
        // Para dispositivos táctiles (móvil)
        elemento.addEventListener('touchstart', function(e) {
            e.preventDefault();
            // Remover clase activo de otros elementos
            elementosConTooltip.forEach(function(otro) {
                if (otro !== elemento) {
                    otro.classList.remove('activo');
                }
            });
            // Toggle del tooltip actual
            elemento.classList.toggle('activo');
            
            // Cerrar tooltip al tocar fuera
            setTimeout(function() {
                document.addEventListener('touchstart', function cerrarTooltip(evento) {
                    if (!elemento.contains(evento.target)) {
                        elemento.classList.remove('activo');
                        document.removeEventListener('touchstart', cerrarTooltip);
                    }
                }, { once: true });
            }, 100);
        });
        
        // Para PC (hover) - el CSS ya maneja esto, pero añadimos soporte adicional
        elemento.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                elemento.classList.add('activo');
            }
        });
        
        elemento.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                elemento.classList.remove('activo');
            }
        });
    });

    // Desplazamiento suave para enlaces de anclas
    document.querySelectorAll('a[href^="#"]').forEach(function(ancla) {
        ancla.addEventListener('click', function (e) {
            e.preventDefault();
            const objetivo = document.querySelector(this.getAttribute('href'));
            if (objetivo) {
                objetivo.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Validación del formulario de contacto
    const formularioContacto = document.getElementById('contactForm');
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            
            if (nombre === '' || email === '' || mensaje === '') {
                alert('Por favor, complete todos los campos del formulario.');
                return;
            }
            
            // Validar email
            const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!expresionEmail.test(email)) {
                alert('Por favor, ingrese un email válido.');
                return;
            }
            
            // Simular envío (aquí se puede conectar con un backend)
            alert('¡Gracias por su mensaje! Nos pondremos en contacto pronto.');
            formularioContacto.reset();
        });
    }

    // Efecto de scroll en navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar-custom');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // Animación de entrada para las tarjetas de información
    const opcionesObservador = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observador = new IntersectionObserver(function(entradas) {
        entradas.forEach(function(entrada) {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = '1';
                entrada.target.style.transform = 'translateY(0)';
            }
        });
    }, opcionesObservador);

    // Observar elementos con animación
    document.querySelectorAll('.info-card').forEach(function(tarjeta) {
        tarjeta.style.opacity = '0';
        tarjeta.style.transform = 'translateY(20px)';
        tarjeta.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observador.observe(tarjeta);
    });
    
    // Cerrar tooltips al hacer clic fuera en PC
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768) {
            elementosConTooltip.forEach(function(elemento) {
                if (!elemento.contains(e.target)) {
                    elemento.classList.remove('activo');
                }
            });
        }
    });

    // Sistema de navegación activa - detectar página actual
    function marcarNavegacionActiva() {
        // Obtener el nombre del archivo actual
        const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
        const nombrePagina = paginaActual.replace('.html', '').replace('index', 'inicio');
        
        // Mapeo de páginas
        const mapaPaginas = {
            'inicio': 'inicio',
            'modelo-ambiental': 'modelo-ambiental',
            'modelo-comportamiento': 'modelo-comportamiento',
            'diagrama-clases': 'diagrama-clases',
            'casos-uso': 'casos-uso',
            'marco-teorico': 'marco-teorico',
            'video-tutorial': 'video-tutorial',
            'contacto': 'contacto'
        };
        
        // Buscar y marcar enlace activo en navbar
        const enlacesNav = document.querySelectorAll('.nav-link[data-page], .dropdown-item[data-page]');
        enlacesNav.forEach(function(enlace) {
            const paginaEnlace = enlace.getAttribute('data-page');
            if (paginaEnlace === nombrePagina) {
                enlace.classList.add('activo');
                // Si es un dropdown item, también marcar el dropdown padre
                const dropdownPadre = enlace.closest('.dropdown');
                if (dropdownPadre) {
                    const dropdownToggle = dropdownPadre.querySelector('.dropdown-toggle');
                    if (dropdownToggle) {
                        dropdownToggle.classList.add('activo');
                    }
                }
            }
        });
        
        // Si estamos en index.html con hash, marcar la sección correspondiente
        if (paginaActual === 'index.html' && window.location.hash) {
            const hash = window.location.hash.replace('#', '');
            const enlaceHash = document.querySelector(`.nav-link[data-page="${hash}"]`);
            if (enlaceHash) {
                enlaceHash.classList.add('activo');
            }
        }
    }
    
    // Ejecutar al cargar la página
    marcarNavegacionActiva();
});

