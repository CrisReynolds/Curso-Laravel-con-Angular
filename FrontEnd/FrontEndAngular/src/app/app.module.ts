import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { PruebaComponent } from './prueba/prueba.component';
import { Prueba2Component } from './prueba2/prueba2.component';
import { Prueba3Component } from './prueba3/prueba3.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { ClienteComponent } from './cliente/cliente.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ImagenRotaDirective } from './imagen-rota.directive';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProductoComponent } from './producto/producto.component';
import { VentaComponent } from './venta/venta.component';
import { TransaccionComponent } from './transaccion/transaccion.component';
import {MatSelectModule} from '@angular/material/select';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { GraficoComponent } from './grafico/grafico.component';
import { PrincipalComponent } from './principal/principal.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { CategoriaFormComponent } from './categoria/categoria-form/categoria-form.component';
import { ProductoFormComponent } from './producto/producto-form/producto-form.component';  // added

@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent,
    Prueba2Component,
    Prueba3Component,
    UsuarioComponent,
    ClienteComponent,
    UsuarioFormComponent,
    ImagenRotaDirective,
    CategoriaComponent,
    ProductoComponent,
    VentaComponent,
    TransaccionComponent,
    GraficoComponent,
    PrincipalComponent,
    ClienteFormComponent,
    CategoriaFormComponent,
    ProductoFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxChartsModule,
    ToastrModule.forRoot(), // ToastrModule added

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
