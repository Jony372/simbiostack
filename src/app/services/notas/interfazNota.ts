import { intCliente } from "../clientes/clienteInterfaz";
import { intEquipo } from "../equipos/equipoInterfaz";
import { intEstado } from "../estado/interfazEstado";
import { intPrioridad } from "../prioridad/interfazPrioridad";
import { intUsuario } from "../usuarios/usuraioInterface";

export interface intNotaEquipo{
  id: number,
  prioridad: intPrioridad,
  cliente: intCliente,
  usuario: intUsuario,
  fecha: Date,
  estado: intEstado
}

export interface intGetNotaEquipos extends intNotaEquipo{
  equipos: Array<intEquipo>
}