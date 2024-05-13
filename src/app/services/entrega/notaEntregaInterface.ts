import { intCaja } from "../caja/cajaInterfaz";
import { intCliente } from "../clientes/clienteInterfaz";
import { intEstado } from "../estado/interfazEstado";
import { intNotaEquipo } from "../notas/interfazNota";
import { intProducto } from "../productos/productoInterface";
import { intServicios } from "../servicios/interfazServicios";
import { intUsuario } from "../usuarios/usuraioInterface";

export interface intNotaEntrega{
  id: number,
  usuario: intUsuario,
  cliente: intCliente,
  total: number,
  caja: intCaja,
  estado: intEstado,
  fecha: string,
  isEfectivo: boolean,
  nota: intNotaEquipo,
  cancelado: boolean
}

export interface intEntregaServicio{
  id: number | undefined,
  notaEntrega: intNotaEntrega | undefined,
  servicio: intServicios | number | undefined,
  cantidad: number,
  producto: intProducto | number | undefined,
  nombre: string,
  subTotal: number,
  precio: number
}


export class entregaServicio implements intEntregaServicio{
  id: number | undefined
  notaEntrega: intNotaEntrega | undefined
  servicio: intServicios | number | undefined
  cantidad: number
  producto: intProducto | number | undefined
  nombre: string
  subTotal: number
  precio: number
  constructor(id: number | undefined, notaEntrega: intNotaEntrega | undefined, servicio: intServicios | number | undefined, cantidad: number, producto: intProducto | number | undefined , nombre: string, subTotal: number, precio: number){
      this.id = id;
      this.notaEntrega = notaEntrega;
      this.servicio = servicio;
      this.cantidad = cantidad;
      this.producto = producto;
      this.nombre = nombre;
      this.precio = precio;
      this.subTotal = subTotal;
  }
}