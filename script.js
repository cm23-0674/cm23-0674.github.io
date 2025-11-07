document.addEventListener('DOMContentLoaded', function() {

    inicializarModoOscuro();
});

function inicializarModoOscuro() {
    const btnModoOscuro = document.getElementById('btnModoOscuro');
    const modoOscuro = localStorage.getItem('modoOscuro') === 'true';
    
    if (modoOscuro) {
        document.body.classList.add('dark-mode');
        btnModoOscuro.innerHTML = '<i class="bi bi-sun"></i>';
    }

    btnModoOscuro.addEventListener('click', function() {
        toggleModoOscuro();
    });
}

function toggleModoOscuro() {
    const body = document.body;
    const btnModoOscuro = document.getElementById('btnModoOscuro');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        btnModoOscuro.innerHTML = '<i class="bi bi-sun"></i>';
        localStorage.setItem('modoOscuro', 'true');
        mostrarNotificacion('Modo oscuro activado', 'info');
    } else {
        btnModoOscuro.innerHTML = '<i class="bi bi-moon"></i>';
        localStorage.setItem('modoOscuro', 'false');
        mostrarNotificacion('Modo claro activado', 'info');
    }
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    let toastElement, messageElement;
    
    switch(tipo) {
        case 'success':
            toastElement = document.getElementById('toastSuccess');
            messageElement = document.getElementById('toastSuccessMessage');
            break;
        case 'warning':
            toastElement = document.getElementById('toastWarning');
            messageElement = document.getElementById('toastWarningMessage');
            break;
        default:
            toastElement = document.getElementById('toastInfo');
            messageElement = document.getElementById('toastInfoMessage');
    }
    
    if (toastElement && messageElement) {
        messageElement.textContent = mensaje;
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 5000
        });
        toast.show();
    }
}

function aceptarPoliticas() {

    const modal = bootstrap.Modal.getInstance(document.getElementById('modalPoliticas'));
    modal.hide();
    
    mostrarNotificacion('Has aceptado nuestras políticas de privacidad.', 'success');
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function enviarCorreo() {
    const nombre = document.getElementById('nombreContacto') ? document.getElementById('nombreContacto').value : '';
    const email = document.getElementById('emailContacto') ? document.getElementById('emailContacto').value : '';
    const asunto = document.getElementById('asuntoContacto') ? document.getElementById('asuntoContacto').value : '';
    const mensaje = document.getElementById('mensajeContacto') ? document.getElementById('mensajeContacto').value : '';
    const aceptoPoliticas = document.getElementById('aceptoPoliticas') ? document.getElementById('aceptoPoliticas').checked : false;


    if (!nombre || !email || !mensaje) {
        mostrarNotificacion('Por favor, completar todos los campos antes de enviar.', 'warning');
        return;
    }

    if (!validarEmail(email)) {
        mostrarNotificacion('Por favor, introduce un email válido.', 'warning');
        return;
    }

     if (!aceptoPoliticas) {
        mostrarNotificacion('Debes aceptar las políticas de privacidad para continuar.', 'warning');
        return;
    }    

    const cuerpo = `Hola,%0D%0A%0D%0AMe llamo ${nombre}.%0D%0A%0D%0A${mensaje}%0D%0A%0D%0A Saludos.`;
    
    window.location.href = `mailto:info@spernes.com?subject=${asunto}&body=${cuerpo}`;
}