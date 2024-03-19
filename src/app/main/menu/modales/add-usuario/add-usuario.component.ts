import { Component, Input } from '@angular/core';
import { intUsuario } from '../../../../services/usuarios/usuraioInterface';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  constructor(private usuarioServicio: UsuariosService, private formBuilder: FormBuilder){}

  ngOnChanges() {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(this.usuario){
      this.addUsuario.patchValue(this.usuario)
    }else{
      this.addUsuario.reset()
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
          error: err => console.error("Error al ingresar el usuario: "+ err),
          complete: () =>{
            alert('Se agrego correctamente');
            location.reload();
          }
        })
        
      }else{
        alert('Las contraseñas no coinciden');
      }
    }else{
      alert("Verifique todos los campos")
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
          next: data => console.log(data),
          error: err => console.error("Error al editar el usuario: "+ err),
          complete: () =>{
            alert('Se edito correctamente');
            location.reload();
          }
        })
        
      }else{
        alert('Las contraseñas no coinciden');
      }
    }else{
      alert("Verifique todos los campos")
    }
  }

}
