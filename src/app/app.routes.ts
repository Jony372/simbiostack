import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ProductosComponent } from './main/menu/productos/productos.component';
import { AddProductoComponent } from './main/menu/modales/add-producto/add-producto.component';
import { ClientesComponent } from './main/menu/clientes/clientes.component';

export const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
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
  }]
}
];
