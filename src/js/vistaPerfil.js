const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuarioLogueado'));

const labelEmailUsuario = document.getElementById('idEmailUser');
labelEmailUsuario.innerHTML = usuarioLogueado.email;

const labelNombreUsuario = document.getElementById('idLabelNombreUsuario');
labelNombreUsuario.innerHTML = usuarioLogueado.nombreUsuario;

let usuariosJSON = localStorage.getItem('usuarios');
let usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
let usuarioLogueadoVista = usuarioLogueado.vista || 'fila';

document.addEventListener('DOMContentLoaded', () => {
    const selectVistas = document.getElementById('listaVistas');
    
    actualizarVista(usuarioLogueadoVista);
        
    function actualizarVista(vistaAplicada) {    
        const contenedorFormularioPerfil = document.querySelector('.formularioPerfil');
        const contenedorPerfil = document.querySelector('.contenedorPerfil');
        const contenedorCheckboxPagoContainer = document.querySelector('.checkboxPagoContainer');
        const vistaSelect = selectVistas.options[selectVistas.selectedIndex].text.toLowerCase();
        const vista = vistaAplicada || vistaSelect;

        for (let i = 0; i < selectVistas.options.length; i++) {
            if (selectVistas.options[i].value.toLowerCase() === vista) {
                selectVistas.selectedIndex = i; // Establece la opción como seleccionada
                break; // Una vez encontrada, salimos del bucle
            }
        }

        if(vista === 'columna') {
            contenedorPerfil.style.flexDirection = 'column';
            const nuevoLayout = `
                'datos'
                'metodoDePago'
                'botones'
            `;
            contenedorPerfil.style.alignItems = 'center';
            contenedorFormularioPerfil.style.gridTemplateAreas = nuevoLayout;
            contenedorFormularioPerfil.style.marginTop='40px';
            contenedorFormularioPerfil.style.width = '80%'; 

            usuarioLogueado.vista = 'columna';
            sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
            const usuarioIndex = usuarios.findIndex(u => u.nombreUsuario === usuarioLogueado.nombreUsuario); 
            usuarios[usuarioIndex] = usuarioLogueado;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }else if(vista === 'fila') {
            contenedorPerfil.style.flexDirection = 'row';
            const nuevoLayout = `
                'datos metodoDePago'
                'botones botones'
            `;
            contenedorFormularioPerfil.style.gridTemplateAreas = nuevoLayout;
            contenedorFormularioPerfil.style.padding= '2% 5% 2% 5%';
            contenedorPerfil.style.justifyContent= 'space-evenly';
            contenedorCheckboxPagoContainer.style.justifyContent = 'space-arround';
            usuarioLogueado.vista = 'fila';
            sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
            const usuarioIndex = usuarios.findIndex(u => u.nombreUsuario === usuarioLogueado.nombreUsuario); 
            usuarios[usuarioIndex] = usuarioLogueado;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
    }

    selectVistas.addEventListener('change', () => {
        const vistaSeleccionada = selectVistas.options[selectVistas.selectedIndex].text.toLowerCase();
        actualizarVista(vistaSeleccionada);
    });

    const usuarioLogueadoJSON = sessionStorage.getItem('usuarioLogueado');
    const contraseñaRegex = /^(?=(?:.*[A-Za-z]){2,})(?=(?:.*\d){2,})(?=(?:.*[!@#$%^&*()_+={}\[\]:;"'<>,.?~\\/-]){2,}).{8,}$/;
    const idFormNewContra = document.getElementById('idFormNewContra');
    const idFormConfirmContra = document.getElementById('idFormConfirmContra');
    const radioButtonsPago = document.querySelectorAll('input[name="pago"]');
    //const btnGuardarCambios = document.getElementById('btnGuardarCambios');    

    if (usuarioLogueadoJSON) {
        const usuarioLogueado = JSON.parse(usuarioLogueadoJSON);
        const tipoPagoUsuario = usuarioLogueado.tipoPago;
        const radioButtonsPago = document.querySelectorAll('input[name="pago"]');

        radioButtonsPago.forEach(radio => {
            if (radio.value === tipoPagoUsuario) {
                radio.checked = true;
            }
        });
        if(tipoPagoUsuario === 'cupon') {
            const tipoCupon = usuarioLogueado.tipoCupon;
            const checkCuponPago = document.querySelector(`input[name="pagoCupon"][value="${tipoCupon}"]`);
            if (checkCuponPago) {
                checkCuponPago.checked = true;
            }
        }
    }
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            sessionStorage.removeItem('usuarioLogueado');       
            window.location.href = '../../index.html'; 
        });
    }
    if (btnGuardarCambios) {
        btnGuardarCambios.addEventListener('click', (event) => {
            event.preventDefault();
            let error = false;
            const nuevaContrasena = idFormNewContra.value.trim();
            const confirmarContrasena = idFormConfirmContra.value.trim();

            if (nuevaContrasena) {
                if (nuevaContrasena !== confirmarContrasena) {                    
                    error = true;
                    return mensaje(error);
                }
                if (!contraseñaRegex.test(nuevaContrasena)) {                    
                    error = true;
                    return mensaje(error);
                }                
                usuarioLogueado.contrasena = nuevaContrasena;
            }

            
            let nuevoTipoPago = null;
            
            if(usuarioLogueado.numeroTarjeta && usuarioLogueado.codigoSeguridad){
                usuarioLogueado.numeroTarjeta = null;
                usuarioLogueado.codigoSeguridad = null;
            }
            if(usuarioLogueado.tipoCupon){
                usuarioLogueado.tipoCupon = null;
            }            
            radioButtonsPago.forEach(radio => {
                if (radio.checked) {
                    nuevoTipoPago = radio.value;
                    usuarioLogueado.tipoPago = nuevoTipoPago;
                }
            });

            if (nuevoTipoPago === 'tarjeta') {
                let numeroTarjeta = document.querySelector('input[name="pagoTarjeta"][placeholder="XXXX XXXX XXXX XXXX"]').value;
                let cvvTarjeta = document.querySelector('input[name="pagoTarjeta"][placeholder="CVV"]').value;

                if(!numeroTarjeta || !cvvTarjeta) {
                    mostrarError(document.querySelector('input[name="pago"][value="tarjeta"]'), 'Debe completar los campos de tarjeta');
                    error = true;
                }
                const numero = numeroTarjeta.trim();
                if (!/^\d{16}$/.test(numero)) {
                    mostrarError(numero, 'Debe tener 16 dígitos numéricos');
                    error = true;
                } else {
                    const digitos = numero.split('').map(Number);
                    const suma = digitos.slice(0, -1).reduce((a, b) => a + b, 0);
                    const ultimo = digitos[15];

                    function esPar(n) {
                        if (n === 0 || n === 2 || n === 4 || n === 6 || n === 8) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                
                    const sumaUltimoDigito = Number(String(suma).slice(-1));
                    const sumaEsPar = esPar(sumaUltimoDigito);
                    const ultimoEsPar = esPar(ultimo);
                    
                    if ((sumaEsPar && ultimoEsPar) || (!sumaEsPar && !ultimoEsPar)) {
                        mostrarError(numero, 'El último dígito debe ser par si la suma es impar, e impar si la suma es par');
                        error = true;
                    }                
                }

                const cod = cvvTarjeta.trim();
                if (!/^\d{3}$/.test(cod) || cod === "000") {
                    mostrarError(cod, 'Código inválido');
                    error = true;
                }
                if (!error) {
                    usuarioLogueado.numeroTarjeta = numeroTarjeta;
                    usuarioLogueado.codigoSeguridad = cvvTarjeta;
                }
            }

            if (nuevoTipoPago === 'cupon') {
                if(document.querySelector('input[value="pago_facil"]').checked && document.querySelector('input[value="rapipago"]').checked){
                    mostrarError(document.querySelector('input[value="pago_facil"]'), 'Debe seleccionar un solo tipo de cupón');
                    error = false;
                }
                if(document.querySelector('input[value="pago_facil"]').checked){
                    const nuevoTipoCupon = "pago_facil";
                    usuarioLogueado.tipoCupon = nuevoTipoCupon;
                }else if(document.querySelector('input[value="rapipago"]').checked){
                    const nuevoTipoCupon = "rapipago";
                    usuarioLogueado.tipoCupon = nuevoTipoCupon;
                }else{
                    mostrarError(document.querySelector('input[value="pago_facil"]'), 'Debe seleccionar un tipo de cupón');
                    error = true;
                }
            }

            //SGI - Verificar si es necesario
            sessionStorage.removeItem('usuarioLogueado');
            sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));

            let usuariosEnLocalStorageJSON = localStorage.getItem('usuarios');
            let usuarios = [];
            if (usuariosEnLocalStorageJSON) {
                usuarios = JSON.parse(usuariosEnLocalStorageJSON);
            }

            const indexUsuario = usuarios.findIndex(user => user.email === usuarioLogueado.email);
            if (indexUsuario !== -1) {
                usuarios[indexUsuario] = usuarioLogueado;
                localStorage.setItem('usuarios', JSON.stringify(usuarios));                
            }
            mensaje(error);
        });
    }    
    
    if (btnCancelarSuscripcion) {
        btnCancelarSuscripcion.addEventListener('click', () => {
            if (usuarioLogueadoJSON) {
                const usuarioLogueado = JSON.parse(usuarioLogueadoJSON);
                let usuariosRegistradosJSON = localStorage.getItem('usuarios');
                let usuariosRegistrados = [];

                if (usuariosRegistradosJSON) {
                    usuariosRegistrados = JSON.parse(usuariosRegistradosJSON);
                }
                const usuariosActualizados = usuariosRegistrados.filter(usuario => {
                    return usuario.email !== usuarioLogueado.email;
                });

                localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
            }

            sessionStorage.removeItem('usuarioLogueado');       
            window.location.href = '../../index.html'; 
        });
    }
});

const mostrarError = (input, mensaje) => {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains('error')) {
        error = document.createElement('div');
        error.classList.add('error');
        error.style.color = 'red';
        error.style.fontSize = '0.9rem';
        input.insertAdjacentElement('afterend', error);
    }
    error.textContent = mensaje;
};

function mensaje(error){
    const nodoMensajeError = document.getElementById('error');
    if (!error) {
        nodoMensajeError.innerHTML= 'Cambios guardados exitosamente.';
        nodoMensajeError.style.color = '#009446';
    } else {
        nodoMensajeError.innerHTML= 'Hubo un error al guardar los cambios. Por favor, revisa los campos ingresados.';
        nodoMensajeError.style.color = '#940000';
    }
}

