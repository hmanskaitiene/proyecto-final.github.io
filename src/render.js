import {solicitud} from "./classes.js";
import { deleteProduct } from "./form.js";

//Función que renderiza el HTML de una categoría
export const renderCategory = (id, products) => {
    let html=`<div class="row row-cols-1 row-cols-md-3 g-4">`;
    if (products.length > 0) {
        products.forEach(product => {
            html +=`
                <div class="col">
                <div class="card text-white bg-primary" style="max-width: 20rem;">
                    <div class="card-header">${product.nombre}</div>
                    <div class="card-body text-dark bg-light">
                    <h5 class="card-title">$${product.precio} final por mes</h5>
                    <p class="card-text">${product.descripcion}</p>
                    </div>
                    <div class="card-footer text-dark bg-light text-center">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" 
                        data-bs-target="#modal-product" data-product-id="${product.id}">Lo quiero!</button>
                    </div>
                </div>
            </div>`;
        });
    } else {
        html += `<p>No hay productos para la categoría seleccionada</p>`;
    }

    html+="</div>";
    document.getElementById(id).innerHTML = html
}

//Función que renderiza el panel lateral izquierdo 
export const renderPanel = () => {
    let div_product_active = document.querySelector('#offcanvas_panel_product_active')
    div_product_active.innerHTML = '';

    if (solicitud.cliente) {
        document.querySelector('#offcanvas_panel_username').textContent = `${solicitud.cliente.nombre} ${solicitud.cliente.apellido}`
    }
    
    if (solicitud.activa){
        let div1 = document.createElement('div')
        const deleteFunction = deleteProduct
        div1.classList.add('d-flex','justify-content-between');

        let div2 = document.createElement('div')
        div2.innerHTML = '<h4>Solicitud activa</h4>'

        let div3 = document.createElement('div')
        let button = document.createElement('button')
        button.classList.add('btn','btn-sm','btn-outline-danger');
        button.onclick = deleteFunction
        button.innerHTML = '<i class="bi bi-trash"></i>'

        div3.appendChild(button)
        div1.appendChild(div2)
        div1.appendChild(div3)
        div_product_active.appendChild(div1);

        let ul = document.createElement('ul')
        ul.classList.add('list-group')

        let li = document.createElement('li')
        li.classList.add('list-group-item')

        let li_div1 = document.createElement('div')
        li_div1.classList.add('d-flex','justify-content-between');
        li_div1.innerHTML = `<h5><strong>${solicitud.producto.nombre}</strong></h5>`;
        li.appendChild(li_div1);

        let li_div2 = document.createElement('div')
        li_div2.classList.add('d-flex','justify-content-between');
        let div21 = document.createElement('div')
        div21.innerHTML = `<h6>Precio final</h6>`;
        let div22 = document.createElement('div')
        div22.innerHTML = `<strong >$ ${solicitud.precio_final}</strong>`;
        li_div2.appendChild(div21);
        li_div2.appendChild(div22);
        li.appendChild(li_div2);

        let li_div3 = document.createElement('div')
        li_div3.classList.add('d-flex','justify-content-between');
        let div31 = document.createElement('div')
        div31.innerHTML = `<h6>Medio de pago</h6>`;
        let div32 = document.createElement('div')
        div32.innerHTML = `<strong >${solicitud.medio_pago.nombre}</strong>`;
        li_div3.appendChild(div31);
        li_div3.appendChild(div32);
        li.appendChild(li_div3);

        ul.appendChild(li);
        div_product_active.appendChild(li);
    } else {
        div_product_active.textContent = `Sin solicitud de producto`;
    }
}

//Función que renderiza HTML de precios y descuentos
export const renderPrecioFinalHtml = () => {
    document.querySelector('#product-price').textContent = `$ ${solicitud.producto.precio}`

    if (solicitud.descuento > 0){
        document.querySelector('#li-product-discount').classList.remove("d-none");
        document.querySelector('#product-discount').textContent = `- $ ${solicitud.descuento}`
    } else {
        document.querySelector('#li-product-discount').classList.add("d-none");
    }
    document.querySelector('#product-total-price').textContent = `$ ${solicitud.precio_final}`
}

//Función que muestra alerta en el caso de solicitud pre-existente y modifica valor de botón
export const renderAlert = () => {
     if (solicitud.activa){
        document.querySelector('#alert-product-active').style.display = 'block';
        document.querySelector('#modal-product-btn-confirm').textContent = 'Modificar solicitud';
    } else {
        document.querySelector('#alert-product-active').style.display = 'none';
        document.querySelector('#modal-product-btn-confirm').textContent = 'Confirmar';
    }
}