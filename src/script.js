import {Producto,solicitud,catalogo} from "./classes.js";
import {renderCategory,renderAlert,renderPanel } from "./render.js";
import {confirmProduct,cleanErrors,cambioMedioPago} from "./form.js";

//Función que cargar los productos en el catalogo
async function loadInitialData(){
    const response = await fetch("../assets/data.json");
    const products_json = await response.json();

    products_json.forEach( p => {
        catalogo.agregarProducto(new Producto(p.id,p.nombre,p.precio,p.descripcion,p.categoria));
    })

    renderCategory('pills-internet', catalogo.getCategoria("INTERNET"));
    renderCategory('pills-combos', catalogo.getCategoria("COMBOS"));
    renderCategory('pills-streaming', catalogo.getCategoria("STREAMING"));
    renderCategory('pills-portabilidad', catalogo.getCategoria("PORTABILIDAD"));
}

//Evento que se ejecuta al mostrar el modal de solicitud
document.getElementById('modal-product').addEventListener('show.bs.modal', function (e) {
    cleanErrors();
    renderAlert();
    const producto = catalogo.getProducto(parseInt(e.relatedTarget.getAttribute('data-product-id')));
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
document.getElementById('modal-product-btn-confirm').addEventListener('click', function () {
    confirmProduct();
})

loadInitialData();