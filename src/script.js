import {Producto,solicitud,catalogo} from "./classes.js";
import {renderCategory,renderAlert,renderPanel,renderbtnSolicitudNavBar } from "./render.js";
import {confirmSolicitud,cleanErrors,cambioMedioPago, searchCoupon,showError} from "./form.js";

//Función que cargar los productos en el catalogo
async function loadInitialData(){
    const response = await fetch("./assets/data.json");
    const products_json = await response.json();

    products_json.forEach( p => {
        catalogo.agregarProducto(new Producto(p.id,p.nombre,p.precio,p.descripcion,p.categoria));
    })

    renderCategory('pills-internet', catalogo.getCategoria("INTERNET"));
    renderCategory('pills-combos', catalogo.getCategoria("COMBOS"));
    renderCategory('pills-streaming', catalogo.getCategoria("STREAMING"));
    renderCategory('pills-portabilidad', catalogo.getCategoria("PORTABILIDAD"));
}

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
document.getElementById('frmSolicitud').addEventListener('submit', function (e) {
    e.preventDefault();
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

//Evento que se ejecuta cuando se carga el DOM para habilitar los popover de bootstrap
document.addEventListener("DOMContentLoaded", function(){
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function(element){
        return new bootstrap.Popover(element);
    });
});


//Funciones que se ejecutan al inicio
loadInitialData();
renderbtnSolicitudNavBar();
