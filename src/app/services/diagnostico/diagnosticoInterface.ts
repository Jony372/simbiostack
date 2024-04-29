import { intEquipo } from "../equipos/equipoInterfaz";

export interface intDiagnostico{
  id: number | undefined,
  diagnostico: string,
  equipo: intEquipo|number,
  pantalla: boolean,
  cargador: boolean,
  enciende: boolean,
  bisagras: boolean,
  ram: number,
  almacenamiento: string
}

// export class Diagnostico implements intDiagnostico{
//   id: number | undefined,
//   diagnostico: string,
//   equipo: intEquipo|number,
//   pantalla: boolean,
//   cargador: boolean,
//   enciende: boolean,
//   bisagras: boolean,
//   ram: number,
//   almacenamiento: string

//   constructor()
// }