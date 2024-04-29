import { intProducto } from "../productos/productoInterface";
import { intProveedor } from "../proveedor/interfazProveedor";

export interface intCompra{
  id: number,
  proveedor: intProveedor,
  total: number,
  fecha: string
  productos: Array<intProducto>
}

export class CompraProducto implements intProductoCompra{
  id: number | undefined;
  cantidad: number;
  producto: intProducto | undefined;
  compra: intCompra | undefined;
  subTotal: number;
  precio: number;
  nombre: string;
  constructor(id: number | undefined, cantidad: number, producto: intProducto | undefined, compra: intCompra | undefined, total: number, precio: number, nombre: string){
      this.id = id;
      this.cantidad = cantidad;
      this.producto = producto;
      this.compra = compra;
      this.subTotal = total;
      this.precio = precio;
      this.nombre = nombre;
  }
}

export interface intProductoCompra{
  id: number | undefined,
  cantidad: number,
  producto: intProducto | undefined,
  compra: intCompra | undefined,
  subTotal: number,
  precio: number,
  nombre: string
}

