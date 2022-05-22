
class Cliente {
    constructor(nombre,apellido,email) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
    }
}

class MedioDePago {
    constructor(nombre,descuento) {
        this.nombre = nombre;
        this.descuento = descuento;
    }
}

class Catalogo {
    constructor(){
        this.catalogo = [];
    }
    agregarProducto = (item) => {
        this.catalogo.push(item)
    }
    getProducto = (id) => this.catalogo.find(item => item.id === id);
    getCategoria = (categoria) => this.catalogo.filter(a => a.categoria == categoria);
}

class Producto {
    constructor(id,nombre,precio,descripcion,categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.categoria = categoria;
    }
}

class Solicitud {
    constructor() {
        this.activa = false;
    }
    setProducto = (producto) => {
        this.producto = producto;
    }
    setCliente = (cliente) => {
        this.cliente = cliente;
    }
    setMedioDePago = (mp) => {
        this.medio_pago = mp;
    }
    calcularPrecioFinal = () => {
        this.descuento = this.producto.precio * this.medio_pago.descuento;
        this.precio_final =  this.producto.precio - this.descuento
    }
    cancelar = () => {
        this.activa = false;
    }
}

export const catalogo = new Catalogo();
export const solicitud = new Solicitud();
export const mp_efectivo = new MedioDePago('Efectivo/Tarjeta de débito',0.10);
export const mp_credito = new MedioDePago('Tarjeta de crédito',0);
export const mp_debito_automatico = new MedioDePago('Débito automático',0.20);

export {Cliente,MedioDePago,Catalogo,Producto,Solicitud}