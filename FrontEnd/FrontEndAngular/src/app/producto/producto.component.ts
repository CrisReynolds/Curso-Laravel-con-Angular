import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { ProductoFormComponent } from './producto-form/producto-form.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  productos:Producto[]=[]
  constructor(private productoService:ProductoService,public dialog: MatDialog,private toatr:ToastrService){}
  llenar_imagen(nombre:string):string{
    return 'http://localhost:8000/api/producto/imagen/'+nombre
  }
  ngOnInit(): void {
    this.productoService.listar().subscribe(data=>{
      this.productos=data
    })
  }
  eliminar(item:Producto):void{
    Swal.fire({
      title: 'Seguro de Eliminar este registro?',
      text: item.descripcion,
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
            text: "Producto Eliminado Correctamente",
            showConfirmButton: false,
            timer: 1500
        });
        this.productoService.eliminar(item.id).subscribe(data=>{
          this.productos=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el usuario",
          showConfirmButton: false,
          timer: 1500
        })
          // 'Error', 'No se elimino el registro', 'error');
      }
    });
  }

  actualizar(item:Producto) {
    let user:Producto
    this.toatr.warning('complete el codigo correspondiente','Atencion')
  }
  openDialog() {
    let producto:Producto
    producto={
      id:0,
      descripcion:'',
      imagen:'',
      cantidad_minima:0,
      stock:0,
      precio_compra:0,
      precio_venta:0,
      categoria_id:0
    }
    const dialogRef = this.dialog.open(ProductoFormComponent,{data:{producto:producto,texto:"Registrar Producto"}});
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.value!=undefined){
        producto={
          id:0,
          descripcion:result.value.descripcion,
          imagen:result.value.imagen,
          cantidad_minima:result.value.cantidad_minima,
          stock:result.value.stock,
          precio_compra:result.value.precio_compra,
          precio_venta:result.value.precio_venta,
          categoria_id:result.value.categoria_id
        }
        this.productoService.agregar(producto).subscribe(data=>{
          this.productos=data
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
