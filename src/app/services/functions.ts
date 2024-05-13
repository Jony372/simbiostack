import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

// export class funciones{
  export function handleError(error:HttpErrorResponse){
    console.log(error)
    if (error.status === 0 ) {
      console.error("Se ha producido un error ", error.error);
    }else{
      console.error("El servidor mando el código de error ", error.status, error.error);
    }
    return throwError(()=> new Error("Algo salio mal, por favor vuelve a intentarlo: "+error.error))
  }
// }