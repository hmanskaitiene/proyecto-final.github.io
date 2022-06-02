import { solicitud,Cliente,mp_credito,mp_efectivo,mp_debito_automatico,cupones } from "./classes.js";
import { renderPanel,renderPrecioFinalHtml,renderbtnSolicitudNavBar,renderTurnos,renderToasty } from "./render.js";
const API_WEATHER_KEY = '268ae32af07cc789e5c0bb5f23adf23e';

//Función que valida los datos ingresados y carga la solicitud
const formValid = () => {
    const frmSolicitud = new FormData(document.querySelector('#frmSolicitud'))
    const user_name = frmSolicitud.get('user_name');
    const user_surname = frmSolicitud.get('user_surname');
    const user_email = frmSolicitud.get('user_email');
    const user_pay_method = frmSolicitud.get('user_pay_method');
    cleanErrors();

    let form_validation = true;

    if (!isRequired(user_name)){
        showError('user_name', 'Este es un campo requerido');
        form_validation = false;
    }
    if (!isRequired(user_surname)){
        showError('user_surname', 'Este es un campo requerido');
        form_validation = false;
    }
    if (!isRequired(user_email)){
        showError('user_email', 'Este es un campo requerido');
        form_validation = false;
    } else if (!isEmailValid(user_email)) {
        showError('user_email', 'No es un email válido');
        form_validation = false;
    }
    if (!isRequired(user_pay_method)){
        showError('user_pay_method', 'Este es un campo requerido');
        form_validation = false;
    }
    
    if (form_validation) {
        solicitud.setCliente(
            new Cliente(user_name,user_surname,user_email)
        )
        solicitud.activa = true;
        solicitud.setStorage();
        solicitud.eliminarTurno();
        renderbtnSolicitudNavBar();
    }

    return form_validation;
}

//Validadores del form
const isRequired = value => value === '' ? false : true;

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const showError = (input_id, message) => {
    const input = document.querySelector(`#${input_id}`);
    input.classList.add('is-invalid');
    const error = input.parentElement.querySelector('.invalid-feedback');
    error.textContent = message;
};

export const cleanErrors = () => {
    const elements = document.querySelectorAll(".form-control, .form-select");
    elements.forEach(function (element) {
        element.classList.remove('is-invalid');
    });
    document.querySelector('#user_pay_coupon').value = '';
    
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
export const confirmSolicitud = () => {
    if (formValid()){
        const modal = bootstrap.Modal.getInstance(document.querySelector('#modal-product'));
        modal.hide();
        renderToasty('success','La solicitud ha sido registrada');
    }
}

//Función que se muestra alerta al eliminar la solicitud
export const deleteSolicitud = () => {
    solicitud.cancelar();
    renderPanel();
    renderbtnSolicitudNavBar();
    renderToasty('error','La solicitud ha sido eliminada');
}

//Función que busca cupón de descuento
export const searchCoupon = () => {
    const user_coupon = document.getElementById('user_pay_coupon');
    user_coupon.classList.remove('is-invalid');
    const descuento = cupones.find(c => c.codigo === user_coupon.value)

    if (descuento === undefined){
        showError('user_pay_coupon', 'No existe el cupón ingresado');
        solicitud.setCupon(0);
    } else {
        solicitud.setCupon(descuento.descuento);
    }
    solicitud.calcularPrecioFinal()
    renderPrecioFinalHtml();
    document.getElementById('btn_coupon_validate').textContent = 'Validar cupon';
}

//Función que buscar los datos de ubicación del browser
export const getGeoData = (data) => {
    let lat = data.coords.latitude;
    let lon = data.coords.longitude;
    fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=es&cnt=13&appid=${API_WEATHER_KEY}`)
    .then(function(resp) { return resp.json() })
    .then(function(data) { renderTurnos(data) });
 }

 //Función que se encarga de asignar el turno
 export const solicitarTurno = (e) => {
    const fecha_turno = e.target.getAttribute('data-date')
    solicitud.setFechaTurno(fecha_turno);
    document.querySelector('#offcanvas_panel_product_turn').innerHTML = '';
    renderPanel();
    renderToasty('success',`El turno ha sido otorgado para el: ${fecha_turno}`);
}
