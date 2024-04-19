import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ProductosComponent } from './main/menu/productos/productos.component';
import { AddProductoComponent } from './main/menu/modales/add-producto/add-producto.component';
import { ClientesComponent } from './main/menu/clientes/clientes.component';
import { UsuariosComponent } from './main/menu/usuarios/usuarios.component';
import { CrearNotasComponent } from './main/menu/crear-notas/crear-notas.component';
import { NotaEquipoComponent } from './notas/nota-equipo/nota-equipo.component';
import { PVentaComponent } from './main/menu/p-venta/p-venta.component';
import { NotaVentaComponent } from './notas/nota-venta/nota-venta.component';
import { PendientesComponent } from './main/menu/pendientes/pendientes.component';
import { PvEntregaComponent } from './main/menu/pv-entrega/pv-entrega.component';

export const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"nota-equipo",
  component: NotaEquipoComponent},
  {path: "nota-venta",
  component: NotaVentaComponent},
  {path: "login",
  component: LoginComponent},
  {path: "inicio",
  component: MainComponent, 
  children:[{
    path:'',
    component: DashboardComponent
  },{
    path: 'productos',
    component: ProductosComponent
  },{
    path: "clientes",
    component: ClientesComponent
  },{
    path: "usuarios",
    component: UsuariosComponent
  },{
    path:"crear-notas",
    component: CrearNotasComponent
  },{
    path: 'p-venta',
    component: PVentaComponent
  },{
    path: 'pendientes',
    component: PendientesComponent
  },{
    path: 'pv-entrega',
    component: PvEntregaComponent
  }]
}
];
