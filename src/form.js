import {solicitud,Cliente,mp_credito,mp_efectivo,mp_debito_automatico} from "./classes.js";
import {renderPanel,renderPrecioFinalHtml } from "./render.js";

//Función que valida los datos ingresados y carga la solicitud
const formValid = () => {
    const user_name = document.querySelector('#user_name');
    const user_surname = document.querySelector('#user_surname');
    const user_email = document.querySelector('#user_email');
    const user_pay_method = document.querySelector('#user_pay_method');
    cleanErrors();

    let form_validation = true;

    if (!isRequired(user_name.value)){
        showError(user_name, 'Este es un campo requerido');
        form_validation = false;
    }
    if (!isRequired(user_surname.value)){
        showError(user_surname, 'Este es un campo requerido');
        form_validation = false;
    }
    if (!isRequired(user_email.value)){
        showError(user_email, 'Este es un campo requerido');
        form_validation = false;
    } else if (!isEmailValid(user_email.value)) {
        showError(user_email, 'No es un email válido');
        form_validation = false;
    }
    if (!isRequired(user_pay_method.value)){
        showError(user_pay_method, 'Este es un campo requerido');
        form_validation = false;
    }
    
    if (form_validation) {
        solicitud.setCliente(
            new Cliente(user_name.value,user_surname.value,user_email.value)
        )
        solicitud.activa = true;
    }

    return form_validation;
}

//Validadores del form
const isRequired = value => value === '' ? false : true;

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const showError = (input, message) => {
    input.classList.add('is-invalid');
    const error = input.parentElement.querySelector('.invalid-feedback');
    error.textContent = message;
};

export const cleanErrors = () => {
    const elements = document.querySelectorAll(".form-control, .form-select");
    elements.forEach(function (element) {
        element.classList.remove('is-invalid');
    });
}

//Función que se realiza calculos al cambiar de medio de pago
export const cambioMedioPago = () => {
    const user_pay_method = document.querySelector('#user_pay_method');

    switch (user_pay_method.value){
        case "1":
            solicitud.setMedioDePago(mp_efectivo)
            break;
        case "2":
            solicitud.setMedioDePago(mp_credito)
            break;
        case "3":
            solicitud.setMedioDePago(mp_debito_automatico)
            break;
        default:
            solicitud.setMedioDePago(mp_credito)
            break;
    }
    solicitud.calcularPrecioFinal()
    renderPrecioFinalHtml()
 }
//Función que se muestra alerta exitosa al cargar solicitud
export const confirmProduct = () => {
    if (formValid()){
        const modal = bootstrap.Modal.getInstance(document.querySelector('#modal-product'));
        modal.hide();

        Toastify({
            text: "La solicitud ha sido registrada",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              }
          }).showToast();
    }
}

//Función que se muestra alerta al eliminar la solicitud
export const deleteProduct = () => {
    solicitud.cancelar();
    renderPanel();
    Toastify({
        text: "La solicitud ha sido eliminada",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #ff5f6d, #ffc371)"
          }
      }).showToast();
}

