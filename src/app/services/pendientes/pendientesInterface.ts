import { intCliente } from "../clientes/clienteInterfaz";
import { intEstado } from "../estado/interfazEstado";
import { intPrioridad } from "../prioridad/interfazPrioridad";
import { intTipo } from "../tipo/interfazTipo";
import { intUsuario } from "../usuarios/usuraioInterface";

export interface intPendiente {
  id: number; 
  nombre: string;
  cliente: intCliente;
  usuarios: intUsuario;
  prioridad: intPrioridad;
  descripcion: string;
  fecha: string; // Formato: "YYYY-MM-DD"
  fechaEstimada: string; // Formato: "YYYY-MM-DD"
  estado: intEstado;
  tipo: intTipo
}