import { Component, OnInit } from '@angular/core';
import { ClienteService} from '../services/cliente.service';
import { Cliente } from '../models/cliente';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import Swal from 'sweetalert2';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  clientes:Cliente[]=[]
  constructor(private clienteServicio:ClienteService,public dialog: MatDialog,private toatr:ToastrService){}
  ngOnInit(): void {
    this.clienteServicio.listar().subscribe(data=>{
      this.clientes=data
    })
  }
  eliminar(item:Cliente):void{
    Swal.fire({
      title: 'Seguro de Eliminar este registro?',
      text: item.apellido+" "+item.nombre,
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
        this.clienteServicio.eliminar(item.id).subscribe(data=>{
          this.clientes=data
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
  actualizar(item:Cliente):void{
    let cliente:Cliente
    const dialogRef = this.dialog.open(ClienteFormComponent,{data:{cliente:item,texto:"Editar Cliente"}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result.value);
      cliente={
        id:item.id,
        nombre:result.value.nombre,
        apellido:result.value.apellido,
        ci:result.value.ci,
        email:result.value.email
      }
      this.clienteServicio.actualizar(cliente,item.id).subscribe(data=>{
        this.clientes=data
        this.toatr.success('Exito','Registro Actualizado')
      },
      error=>{
        this.toatr.error('Error','Operacion Fallida')

      })
    });
  }
  openDialog() {
    let cliente:Cliente
    cliente={
      id:0,
      nombre:'',
      apellido:'',
      ci:'',
      email:''
    }
    const dialogRef = this.dialog.open(ClienteFormComponent,{data:{cliente:cliente,texto:"Crear Cliente"}});
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.value!=undefined){
        cliente={
          id:0,
          nombre:result.value.nombre,
          apellido:result.value.apellido,
          ci:result.value.ci,
          email:result.value.email
        }
        this.clienteServicio.agregar(cliente).subscribe(data=>{
          this.clientes=data
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
