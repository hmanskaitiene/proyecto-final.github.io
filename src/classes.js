
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

class CuponDescuento {
    constructor(codigo,descuento) {
        this.codigo = codigo;
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
        this.cliente = null;
        this.cupon = 0;
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
    setCupon = (cp) => {
        this.cupon = cp;
    }
    calcularPrecioFinal = () => {
        this.descuento = this.producto.precio * this.medio_pago.descuento;
        this.precio_final =  this.producto.precio - this.descuento - this.cupon
    }
    cancelar = () => {
        this.activa = false;
        this.setStorage();
        this.eliminarTurno();
    }
    limpiarDescuentos = () => {
        this.descuento = 0;
        this.cupon = 0;
    }
    getStorage = () => {
        let solicitud_activa = localStorage.getItem('solicitud_activa');

        if (solicitud_activa !== null){
            solicitud_activa = JSON.parse(localStorage.getItem('solicitud_activa'));
        } else {
            this.setStorage();
            solicitud_activa = localStorage.getItem('solicitud_activa');
        }
        return solicitud_activa;
    }

    setStorage = () => {
            localStorage.setItem('solicitud_activa',JSON.stringify(this))
    }

    setFechaTurno = (fecha) => {
        localStorage.setItem('fecha_turno',fecha)
    }
    eliminarTurno = () => {
        localStorage.removeItem('fecha_turno');
    }
}

export const catalogo = new Catalogo();
export const solicitud = new Solicitud();
export const mp_efectivo = new MedioDePago('Efectivo/Tarjeta de débito',0.10);
export const mp_credito = new MedioDePago('Tarjeta de crédito',0);
export const mp_debito_automatico = new MedioDePago('Débito automático',0.20);
const cupon1 = new CuponDescuento('cupon1',500);
const cupon2 = new CuponDescuento('cupon2',700);
const cupon3 = new CuponDescuento('cupon3',800);
export const cupones = [cupon1,cupon2,cupon3];

export {Cliente,MedioDePago,Catalogo,Producto,Solicitud}
