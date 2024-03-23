import { intCliente } from "../clientes/clienteInterfaz"

export interface intEquipo{
  id: number,
  tipo: string,
  marca: string,
  modelo: string,
  color: string,
  pass: string,
  problema: string,
  cliente: intCliente,
  cargador: boolean,
  funda: boolean,
  usb: boolean,
  cables: boolean,
  extras: string
}

export interface formEquipo{
  tipo: string,
  marca: string,
  modelo: string,
  color: string,
  pass: string,
  problema: string,
  cargador: boolean,
  funda: boolean,
  usb: boolean,
  cables: boolean,
  extras: string,
  cliente: number
}