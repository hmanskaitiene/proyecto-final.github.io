import { solicitud,catalogo } from "./classes.js";
import { renderAlert,renderPanel,renderbtnSolicitudNavBar,loadInitialData } from "./render.js";
import { confirmSolicitud,cleanErrors,cambioMedioPago, searchCoupon,showError,getGeoData } from "./form.js";

//Evento que se ejecuta cuando se carga el DOM
document.addEventListener("DOMContentLoaded", function(){
    loadInitialData();
    renderbtnSolicitudNavBar();
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(element){
        return new bootstrap.Popover(element);
    });
});

//Evento que se ejecuta previo a mostrar el modal de solicitud
document.getElementById('modal-product').addEventListener('show.bs.modal', function (e) {
    solicitud.limpiarDescuentos();
    cleanErrors();
    renderAlert();
    const producto = catalogo.getProducto(parseInt(e.relatedTarget.getAttribute('data-product-id')));
    document.querySelector('#user_pay_method').value = '';
    solicitud.setProducto(producto)
    cambioMedioPago();
    document.querySelector('#label-product-name').textContent = `${producto.nombre}`
  })

//Evento que se ejecuta al cambio el medio de pago
document.getElementById('user_pay_method').addEventListener("change", function(){
    cambioMedioPago();
}); 

//Evento que se ejecuta al mostrar el panel lateral donde muestra la solicitud
document.getElementById('offcanvas_panel').addEventListener('show.bs.offcanvas', function () {
    renderPanel();
})

//Evento que se ejecuta al confirmar la solicitud
document.getElementById('modal-product-btn-confirm').addEventListener('click', function (e) {
    confirmSolicitud();
})

//Evento que se ejecuta al buscar el cupón
document.getElementById('btn_coupon_validate').addEventListener('click', function (e) {
    if (document.getElementById('user_pay_coupon').value != ""){
        document.getElementById('btn_coupon_validate').textContent = 'Buscando...';
        //Simula un tiempo de espera de 1 segundo como parecer que busca en la base
        setTimeout(searchCoupon,1000);
    } else {
        showError('user_pay_coupon', 'Debe ingresar un código valido');
    }
})

//Evento que se ejecuta cuando se buscan los turnos disponibles
document.getElementById('btn_buscar_turnos').addEventListener('click', function (e) {
    document.querySelector('#btn_buscar_turnos').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Buscando turnos de instalación disponibles`
    document.querySelector('#offcanvas_panel_product_turn').innerHTML = '';
    navigator.geolocation.getCurrentPosition(getGeoData,function(){
        document.querySelector('#btn_buscar_turnos').innerHTML = 'Buscar turnos de instalación disponibles'
    });
})

