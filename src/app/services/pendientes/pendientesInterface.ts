export interface pendienteInt {
  id: number; 
  nombre: string;
  idCliente: number;
  idUsuario: number;
  prioridad: "BAJA" | "NORMAL" | "ALTA";
  descripcion: string;
  fecha: string; // Formato: "YYYY-MM-DD"
  fechaEstimada: string; // Formato: "YYYY-MM-DD"
  estado: "PENDIENTE" | "CANCELADO" | "TERMINADO";
}