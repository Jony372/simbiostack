import Swal from "sweetalert2";
import { userInt } from "../app/services/login/userInterface";

let usuario!: userInt;

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
export function format(n: number): string {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export function setUser(user: userInt){
  usuario = user;
}

export function getUser(): userInt{
  return usuario;
}