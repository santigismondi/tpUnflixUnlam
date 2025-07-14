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
    const idFormNewContra = document.getElementById('idFormNewContra');
    const idFormConfirmContra = document.getElementById('idFormConfirmContra');
    const radioButtonsPago = document.querySelectorAll('input[name="pago"]');
    const btnGuardarCambios = document.getElementById('btnGuardarCambios');
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    const btnCancelarSuscripcion = document.getElementById('btnCancelarSuscripcion');
    const radioTarjeta = document.querySelector('input[name="pago"][value="tarjeta"]');
    const radioCupon = document.querySelector('input[name="pago"][value="cupon"]');
    const radioTransferencia = document.querySelector('input[name="pago"][value="transferencia"]');
    const checkboxPagoFacil = document.querySelector('input[name="pagoCupon"][value="pago_facil"]');
    const checkboxRapipago = document.querySelector('input[name="pagoCupon"][value="rapipago"]');
    const numeroTarjetaInput = document.querySelector('input[name="pagoTarjeta"][placeholder="XXXX XXXX XXXX XXXX"]');
    const cvvTarjetaInput = document.querySelector('input[name="pagoTarjeta"][placeholder="CVV"]');
    const contraseñaRegex = /^(?=(?:.*[A-Za-z]){2,})(?=(?:.*\d){2,})(?=(?:.*[!@#$%^&*()_+={}\[\]:;"'<>,.?~\\/-]){2,}).{8,}$/;

    function limpiarTodosLosErrores() {
        const errores = document.querySelectorAll('.error');
        errores.forEach(error => error.remove());
    }

    function actualizarVista(vistaAplicada) {
        const contenedorFormularioPerfil = document.querySelector('.formularioPerfil');
        const contenedorPerfil = document.querySelector('.contenedorPerfil');
        const contenedorCheckboxPagoContainer = document.querySelector('.checkboxPagoContainer');
        const vistaSelect = selectVistas.options[selectVistas.selectedIndex].text.toLowerCase();
        const vista = vistaAplicada || vistaSelect;

        for (let i = 0; i < selectVistas.options.length; i++) {
            if (selectVistas.options[i].value.toLowerCase() === vista) {
                selectVistas.selectedIndex = i;
                break;
            }
        }

        if (vista === 'columna') {
            contenedorPerfil.style.flexDirection = 'column';
            const nuevoLayout = `
                'datos'
                'metodoDePago'
                'botones'
            `;
            contenedorPerfil.style.alignItems = 'center';
            contenedorFormularioPerfil.style.gridTemplateAreas = nuevoLayout;
            contenedorFormularioPerfil.style.marginTop = '40px';
            contenedorFormularioPerfil.style.width = '80%';

            usuarioLogueado.vista = 'columna';
            sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
            const usuarioIndex = usuarios.findIndex(u => u.nombreUsuario === usuarioLogueado.nombreUsuario);
            usuarios[usuarioIndex] = usuarioLogueado;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        } else if (vista === 'fila') {
            contenedorPerfil.style.flexDirection = 'row';
            const nuevoLayout = `
                'datos metodoDePago'
                'botones botones'
            `;
            contenedorFormularioPerfil.style.gridTemplateAreas = nuevoLayout;
            contenedorFormularioPerfil.style.padding = '2% 5% 2% 5%';
            contenedorPerfil.style.justifyContent = 'space-evenly';
            contenedorCheckboxPagoContainer.style.justifyContent = 'space-arround';
            usuarioLogueado.vista = 'fila';
            sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
            const usuarioIndex = usuarios.findIndex(u => u.nombreUsuario === usuarioLogueado.nombreUsuario);
            usuarios[usuarioIndex] = usuarioLogueado;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
    }

    if (selectVistas) {
        actualizarVista(usuarioLogueadoVista);
        selectVistas.addEventListener('change', () => {
            const vistaSeleccionada = selectVistas.options[selectVistas.selectedIndex].text.toLowerCase();
            actualizarVista(vistaSeleccionada);
        });
    }


    if (usuarioLogueado.tipoPago) {
        radioButtonsPago.forEach(radio => {
            radio.checked = radio.value === usuarioLogueado.tipoPago;
        });
        if (usuarioLogueado.tipoPago === 'cupon' && usuarioLogueado.tipoCupon) {
            if (usuarioLogueado.tipoCupon === 'pago_facil') checkboxPagoFacil.checked = true;
            if (usuarioLogueado.tipoCupon === 'rapipago') checkboxRapipago.checked = true;
        }
    }


    function actualizarCheckboxCuponPerfil() {
        if (radioCupon.checked) {
            checkboxPagoFacil.disabled = false;
            checkboxRapipago.disabled = false;
        } else {
            checkboxPagoFacil.checked = false;
            checkboxRapipago.checked = false;
            checkboxPagoFacil.disabled = true;
            checkboxRapipago.disabled = true;
        }
    }
    radioTarjeta.addEventListener('change', actualizarCheckboxCuponPerfil);
    radioCupon.addEventListener('change', actualizarCheckboxCuponPerfil);
    radioTransferencia.addEventListener('change', actualizarCheckboxCuponPerfil);
    actualizarCheckboxCuponPerfil();


    checkboxPagoFacil.addEventListener('change', function () {
        if (this.checked) checkboxRapipago.checked = false;
    });
    checkboxRapipago.addEventListener('change', function () {
        if (this.checked) checkboxPagoFacil.checked = false;
    });

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            sessionStorage.removeItem('usuarioLogueado');
            window.location.href = '../../index.html';
        });
    }

    if (btnCancelarSuscripcion) {
        btnCancelarSuscripcion.addEventListener('click', () => {
            const usuarioLogueadoJSON = sessionStorage.getItem('usuarioLogueado');
            if (usuarioLogueadoJSON) {
                const usuarioLogueado = JSON.parse(usuarioLogueadoJSON);
                let usuariosRegistradosJSON = localStorage.getItem('usuarios');
                let usuariosRegistrados = [];
                if (usuariosRegistradosJSON) {
                    usuariosRegistrados = JSON.parse(usuariosRegistradosJSON);
                }
                const usuariosActualizados = usuariosRegistrados.filter(usuario => usuario.email !== usuarioLogueado.email);
                localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
            }
            sessionStorage.removeItem('usuarioLogueado');
            window.location.href = '../../index.html';
        });
    }

    if (btnGuardarCambios) {
        btnGuardarCambios.addEventListener('click', (event) => {
            event.preventDefault();
            limpiarTodosLosErrores();
            let error = false;


            const nuevaContrasena = idFormNewContra.value.trim();
            const confirmarContrasena = idFormConfirmContra.value.trim();
            if (nuevaContrasena) {
                if (nuevaContrasena !== confirmarContrasena) {
                    mostrarError(idFormConfirmContra, 'Las contraseñas no coinciden');
                    error = true;
                } else if (!contraseñaRegex.test(nuevaContrasena)) {
                    mostrarError(idFormNewContra, 'La contraseña debe tener al menos 8 caracteres, 2 letras, 2 números y 2 símbolos');
                    error = true;
                } else {
                    usuarioLogueado.contrasena = nuevaContrasena;
                }
            }


            let nuevoTipoPago = null;
            radioButtonsPago.forEach(radio => {
                if (radio.checked) {
                    nuevoTipoPago = radio.value;
                    usuarioLogueado.tipoPago = nuevoTipoPago;
                }
            });


            usuarioLogueado.numeroTarjeta = null;
            usuarioLogueado.codigoSeguridad = null;
            usuarioLogueado.tipoCupon = null;

            if (nuevoTipoPago === 'tarjeta') {
                const numeroTarjeta = numeroTarjetaInput.value.trim();
                const cvvTarjeta = cvvTarjetaInput.value.trim();

                if (!numeroTarjeta) {
                    mostrarError(numeroTarjetaInput, 'Debe completar el número de tarjeta');
                    error = true;
                }
                if (!cvvTarjeta) {
                    mostrarError(cvvTarjetaInput, 'Debe completar el código de seguridad');
                    error = true;
                }


                if (numeroTarjeta && !/^\d{16}$/.test(numeroTarjeta)) {
                    mostrarError(numeroTarjetaInput, 'Debe tener 16 dígitos numéricos');
                    error = true;
                } else if (numeroTarjeta) {
                    const digitos = numeroTarjeta.split('').map(Number);
                    const suma = digitos.slice(0, -1).reduce((a, b) => a + b, 0);
                    const ultimo = digitos[15];

                    function esPar(n) {
                        return [0, 2, 4, 6, 8].includes(n);
                    }

                    const sumaUltimoDigito = Number(String(suma).slice(-1));
                    const sumaEsPar = esPar(sumaUltimoDigito);
                    const ultimoEsPar = esPar(ultimo);

                    if ((sumaEsPar && ultimoEsPar) || (!sumaEsPar && !ultimoEsPar)) {
                        mostrarError(numeroTarjetaInput, 'El último dígito debe ser par si la suma es impar, e impar si la suma es par');
                        error = true;
                    }
                }


                if (cvvTarjeta && (!/^\d{3}$/.test(cvvTarjeta) || cvvTarjeta === "000")) {
                    mostrarError(cvvTarjetaInput, 'Código inválido');
                    error = true;
                } else if (cvvTarjeta) {

                    const cvvArr = cvvTarjeta.split('');
                    if (cvvArr.some(d => d === '0')) {
                        mostrarError(cvvTarjetaInput, 'El código no debe contener ceros');
                        error = true;
                    }
                    if (new Set(cvvArr).size < 3) {
                        mostrarError(cvvTarjetaInput, 'Los dígitos deben ser distintos');
                        error = true;
                    }
                }

                if (!error) {
                    usuarioLogueado.numeroTarjeta = numeroTarjeta;
                    usuarioLogueado.codigoSeguridad = cvvTarjeta;
                }
            }


            if (nuevoTipoPago === 'cupon') {
                const pagoFacilChecked = checkboxPagoFacil.checked;
                const rapipagoChecked = checkboxRapipago.checked;

                if (!pagoFacilChecked && !rapipagoChecked) {
                    mostrarError(checkboxPagoFacil, 'Debe seleccionar al menos un tipo de cupón');
                    error = true;
                }
                if (pagoFacilChecked && rapipagoChecked) {
                    mostrarError(checkboxPagoFacil, 'Debe seleccionar solo un tipo de cupón');
                    error = true;
                }
                if (pagoFacilChecked) {
                    usuarioLogueado.tipoCupon = "pago_facil";
                } else if (rapipagoChecked) {
                    usuarioLogueado.tipoCupon = "rapipago";
                }
            }


            if (!error) {
                sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
                const indexUsuario = usuarios.findIndex(user => user.email === usuarioLogueado.email);
                if (indexUsuario !== -1) {
                    usuarios[indexUsuario] = usuarioLogueado;
                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                }
            }
            mensaje(error);
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

function mensaje(error) {
    const nodoMensajeError = document.getElementById('error');
    if (!error) {
        nodoMensajeError.innerHTML = 'Cambios guardados exitosamente.';
        nodoMensajeError.style.color = '#009446';
    } else {
        nodoMensajeError.innerHTML = 'Hubo un error al guardar los cambios. Por favor, revisa los campos ingresados.';
        nodoMensajeError.style.color = '#940000';
    }
}