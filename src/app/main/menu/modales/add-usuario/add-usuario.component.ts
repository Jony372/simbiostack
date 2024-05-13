import { Component, EventEmitter, Input, Output } from '@angular/core';
import { intUsuario } from '../../../../services/usuarios/usuraioInterface';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalInterface } from 'flowbite';
import { Toast } from '../../../../../assets/const';

@Component({
  selector: 'app-add-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.css'
})
export class AddUsuarioComponent {
  @Input() add!: boolean;
  @Input() usuario!: intUsuario | undefined;
  @Input() modal!: ModalInterface;
  @Output() actualizar = new EventEmitter<null>;

  constructor(private usuarioServicio: UsuariosService, private formBuilder: FormBuilder){}

  ngOnChanges() {
    this.addUsuario.reset();
    if(this.usuario){
      this.addUsuario.patchValue(this.usuario)
    }
  }

  addUsuario = this.formBuilder.group({
    id:[0],
    nombre: ['', [Validators.required]],
    user:['', [Validators.required]],
    tel: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]*")]],
    isAdmin: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
    pass: ['', [Validators.required]],
    pass2: ['', [Validators.required]]
  })

  agregar(){
    let form = this.addUsuario;
    if (form.valid){
      let pass = form.value.pass === form.value.pass2;
      if (pass) {
        let user = form.value;
        delete user.pass2;
        this.usuarioServicio.agregar(user.nombre as string, user.tel as string, user.user as string, user.pass as string, user.isAdmin as number).subscribe({
          next: data => {
            Toast.fire({
              icon: 'success',
              title: 'Se agrego el usuario ' + data.nombre
            })
          },
          error: err => {
            Toast.fire({
              icon: 'error',
              title: 'Error al agregar el usuario: ' + err
            })
          },
          complete: () =>{
            this.modal.hide();
            this.actualizar.emit();
          }
        })
        
      }else{
        Toast.fire({
          icon: 'warning',
          title: 'Las contraseñas no coinciden'
        })
      }
    }else{
      Toast.fire({
        icon: 'warning',
        title: 'Revise todos los campos, por favor'
      });
      this.addUsuario.markAllAsTouched();
    }
  }

  editar(){
    let form = this.addUsuario;
    if (form.valid){
      let pass = form.value.pass === form.value.pass2;
      if (pass) {
        let user = form.value;
        delete user.pass2;
        this.usuarioServicio.editar(user.id as number, user.nombre as string, user.tel as string, user.user as string, user.pass as string, user.isAdmin as number).subscribe({
          next: data => {
            Toast.fire({
              icon: 'success',
              title: 'Se edito el usuario ' + data.nombre
            })
          },
          error: err => {
            Toast.fire({
              icon: 'error',
              title: 'Error al editar el usuario: ' + err
            })
          },
          complete: () =>{
            this.modal.hide();
            this.actualizar.emit();
          }
        })
        
      }{
        Toast.fire({
          icon: 'warning',
          title: 'Las contraseñas no coinciden'
        })
      }
    }else{
      Toast.fire({
        icon: 'warning',
        title: 'Revise todos los campos, por favor'
      });
      this.addUsuario.markAllAsTouched();
    }
  }

}
