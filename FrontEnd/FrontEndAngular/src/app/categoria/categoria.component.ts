import { Component, OnInit } from '@angular/core';
import { ClienteService} from '../services/cliente.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categoria.service';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  categorias:Categoria[]=[]
  constructor(private categoriaServicio:CategoriaService,public dialog: MatDialog,private toatr:ToastrService){}
  ngOnInit(): void {
    this.categoriaServicio.listar().subscribe(data=>{
      this.categorias=data
    })
  }
  eliminar(item:Categoria):void{
    Swal.fire({
      title: 'Seguro de Eliminar este registro?',
      text: item.tipo,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor:'#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor:'#d33'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
            icon: "success",
            title: "Satisfactorio",
            text: "Cliente Eliminado Correctamente",
            showConfirmButton: false,
            timer: 1500
        });
        this.categoriaServicio.eliminar(item.id).subscribe(data=>{
          this.categorias=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar la categoria",
          showConfirmButton: false,
          timer: 1500
        })
          // 'Error', 'No se elimino el registro', 'error');
      }
    });
  }
  successNotification() {
    Swal.fire('Hi', 'We have been informed!', 'success');
  }
  alertConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Error', 'Product still in our database.)', 'error');
      }
    });
  }
  actualizar(item:Categoria):void{
    let categoria:Categoria
    const dialogRef = this.dialog.open(CategoriaFormComponent,{data:{categoria:item,texto:"Editar Categoria"}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result.value);
      categoria={
        id:item.id,
        tipo:result.value.tipo
      }
      this.categoriaServicio.actualizar(categoria,item.id).subscribe(data=>{
        this.categorias=data
        this.toatr.success('Exito','Registro Actualizado')
      },
      error=>{
        this.toatr.error('Error','Operacion Fallida')

      })
    });
  }
  openDialog() {
    let categoria:Categoria
    categoria={
      id:0,
      tipo:''
    }
    const dialogRef = this.dialog.open(CategoriaFormComponent,{data:{categoria:categoria,texto:"Crear Categoria"}});
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.value!=undefined){
        categoria={
          id:0,
          tipo:result.value.tipo
        }
        this.categoriaServicio.agregar(categoria).subscribe(data=>{
          this.categorias=data
          this.toatr.success('Exito','Registro Guardado')
        },
        error=>{
          this.toatr.error('Error','Operacion Fallida')
  
        })
      }
      else
        this.toatr.info('Nota','Operacion Cancelada')
    });
  }
}
