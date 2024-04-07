import { intCategoria } from "../categorias/categoriaInterfaz";

interface producto{
  id: number,
  codigobarra: string;
  cantidad: number;
  nombre: string;
  costo: number;
  utilidad: number;
  precio: number;
}

export interface intProducto extends producto{
  categoria: intCategoria;
}

export interface intRegProducto extends producto{
  categoria: number
}

export class Producto {
  constructor(
    public cantidad: number,
    public nombre: string,
    public precio: number
  ){
    this.cantidad = cantidad;
    this.nombre = nombre;
    this.precio = precio;
  }
}