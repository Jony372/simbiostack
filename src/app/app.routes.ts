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
import { PCompraComponent } from './main/menu/p-compra/p-compra.component';
import { ServiciosComponent } from './main/menu/servicios/servicios.component';
import { CategoriaComponent } from './main/menu/categoria/categoria.component';
import { NotaEntregaComponent } from './notas/nota-entrega/nota-entrega.component';
import { VentasComponent } from './main/menu/ventas/ventas.component';
import { ComprasComponent } from './main/menu/compras/compras.component';
import { NotaCompraComponent } from './notas/nota-compra/nota-compra.component';
import { EntregasComponent } from './main/menu/entregas/entregas.component';
import { ProveedoresComponent } from './main/menu/proveedores/proveedores.component';
import { NotasEquiposComponent } from './main/menu/notas-equipos/notas-equipos.component';

export const routes: Routes = [
  {
    path:"",
    redirectTo:"login",
    pathMatch:"full"},
  {
    path:"nota-equipo",
    component: NotaEquipoComponent},
  {
    path: "nota-venta",
    component: NotaVentaComponent},
  {
    path: "nota-entrega",
    component: NotaEntregaComponent
  },{
    path: 'nota-compra',
    component: NotaCompraComponent
  },{
    path: "login",
    component: LoginComponent},
  {
    path: "inicio",
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
    },{
      path: 'p-compra',
      component: PCompraComponent
    },{
      path: 'servicios',
      component: ServiciosComponent
    },{
      path: 'categorias',
      component: CategoriaComponent
    },{
      path: 'ventas',
      component: VentasComponent
    },{
      path: 'compras',
      component: ComprasComponent
    },{
      path: 'entregas',
      component: EntregasComponent
    },{
      path: 'proveedores',
      component: ProveedoresComponent
    },{
      path: 'notas-equipos',
      component: NotasEquiposComponent
    }]
  }
];
