import { intCliente } from "../clientes/clienteInterfaz"
import { intTipo } from "../tipo/interfazTipo"

interface equipo{
  id: number,
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
  extras: string
}

export interface intEquipo extends equipo{
  cliente: intCliente,
  tipoPendiente: intTipo
}

export interface formEquipo extends equipo{
  cliente: number,
  tipoPendiente: number
}