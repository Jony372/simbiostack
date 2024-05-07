import { intCaja } from "../caja/cajaInterfaz";
import { intCliente } from "../clientes/clienteInterfaz";
import { intEstado } from "../estado/interfazEstado";
import { intProducto } from "../productos/productoInterface";
import { intUsuario } from "../usuarios/usuraioInterface";

export interface intProductoVenta{
    id: number | undefined,
    cantidad: number,
    producto: intProducto | undefined,
    venta: intVenta | undefined,
    subTotal: number,
    precio: number,
    productoNombre: string
}



export class ProductoVenta implements intProductoVenta{
    id: number | undefined;
    cantidad: number;
    producto: intProducto | undefined;
    venta: intVenta | undefined;
    subTotal: number;
    precio: number;
    productoNombre: string;
    constructor(id: number | undefined, cantidad: number, producto: intProducto | undefined, venta: intVenta | undefined, total: number, precio: number, nombre: string){
        this.id = id;
        this.cantidad = cantidad;
        this.producto = producto;
        this.venta = venta;
        this.subTotal = total;
        this.precio = precio;
        this.productoNombre = nombre;
    }
}

export interface intVenta{
    id: number,
    usuario: intUsuario,
    cliente: intCliente,
    total: number,
    fecha: string,
    caja: intCaja,
    estado: intEstado,
    productos: Array<intProductoVenta>,
    cancelado: number
}