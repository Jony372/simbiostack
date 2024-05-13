import { intCliente } from "../clientes/clienteInterfaz";
import { intEstado } from "../estado/interfazEstado";
import { intPrioridad } from "../prioridad/interfazPrioridad";
import { intTipo } from "../tipo/interfazTipo";
import { intUsuario } from "../usuarios/usuraioInterface";

export interface intPendiente {
  id: number; 
  nombre: string;
  cliente: intCliente | null;
  usuario: intUsuario;
  prioridad: intPrioridad;
  descripcion: string;
  fecha: string; // Formato: "YYYY-MM-DD"
  fechaEstimada: string | null; // Formato: "YYYY-MM-DD"
  estado: intEstado;
  tipo: intTipo;
  fechaInicio: string | null
}

export interface addPendiente{
  nombre: string,
  usuario: number,
  prioridad: number,
  descripcion: string,
  estado: number,
  tipo: number,
  cliente?: number,
  fechaEstimada?: number
}