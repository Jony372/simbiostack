import { intCaja } from "../caja/cajaInterfaz";
import { intCliente } from "../clientes/clienteInterfaz";
import { intEstado } from "../estado/interfazEstado";
import { intProducto } from "../productos/productoInterface";
import { intUsuario } from "../usuarios/usuraioInterface";

export interface intProductoVenta{
    id: number | undefined,
    cantidad: number,
    producto: intProducto,
    venta: intVenta | undefined,
    total: number
}

export class ProductoVenta implements intProductoVenta{
    id: number | undefined;
    cantidad: number;
    producto: intProducto;
    venta: intVenta | undefined;
    total: number;
    constructor(id: number | undefined, cantidad: number, producto: intProducto, venta: intVenta | undefined, total: number){
        this.id = id;
        this.cantidad = cantidad;
        this.producto = producto;
        this.venta = venta;
        this.total = total;
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
    productos: Array<intProductoVenta>
}