// Configuración de usuario y contraseña
const USUARIO_CORRECTO = "veterinaria";
const PASSWORD_CORRECTO = "pettit2024";

// Mostrar página
function mostrarContenido() {
    document.body.classList.remove("oculto");
}

// Verificar si ya está autenticado
function verificarAutenticacion() {

    const autenticado = sessionStorage.getItem('autenticado');

    if (autenticado === 'true') {
        mostrarContenido();
        return true;
    }

    return false;
}

// Solicitar credenciales
function solicitarCredenciales() {

    let intentos = 0;
    const maxIntentos = 3;

    while (intentos < maxIntentos) {

        const usuario = prompt('Usuario:');

        if (usuario === null) {

            document.body.innerHTML =
                '<h1 style="text-align:center; margin-top:50px;">Acceso denegado</h1>';

            mostrarContenido();
            return false;
        }

        const password = prompt('Contraseña:');

        if (password === null) {

            document.body.innerHTML =
                '<h1 style="text-align:center; margin-top:50px;">Acceso denegado</h1>';

            mostrarContenido();
            return false;
        }

        if (
            usuario === USUARIO_CORRECTO &&
            password === PASSWORD_CORRECTO
        ) {

            sessionStorage.setItem('autenticado', 'true');
            mostrarContenido();
            return true;
        }

        intentos++;

        if (intentos < maxIntentos) {
            alert(`Credenciales incorrectas. Intento ${intentos} de ${maxIntentos}`);
        }
    }

    alert('Máximo de intentos alcanzado');

    document.body.innerHTML =
        '<h1 style="text-align:center; margin-top:50px;">Acceso denegado</h1>';

    mostrarContenido();

    return false;
}

// Esperar a que cargue el body
window.onload = function () {

    if (!verificarAutenticacion()) {

        if (!solicitarCredenciales()) {
            throw new Error('Autenticación fallida');
        }
    }
};

// Función para cerrar sesión
window.cerrarSesion = function () {

    sessionStorage.removeItem('autenticado');
    location.reload();
};