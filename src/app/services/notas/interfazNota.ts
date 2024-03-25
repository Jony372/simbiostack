import { intCliente } from "../clientes/clienteInterfaz";
import { intEstado } from "../estado/interfazEstado";
import { intPrioridad } from "../prioridad/interfazPrioridad";
import { intTipo } from "../tipo/interfazTipo";
import { intUsuario } from "../usuarios/usuraioInterface";

export interface intNotaEquipo{
  id: number,
  prioridad: intPrioridad,
  cliente: intCliente,
  usuario: intUsuario,
  date: Date,
  estado: intEstado,
  tipo: intTipo
}