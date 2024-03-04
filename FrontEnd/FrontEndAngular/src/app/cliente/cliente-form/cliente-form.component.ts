import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente.service';
@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent {
  public name:string=""
  public previsualizacion:string=""
  texto:string=""
  constructor(public dialogRef:MatDialogRef<ClienteFormComponent>, @ Inject (MAT_DIALOG_DATA) public data:any,private clienteServicio:ClienteService){
    this.texto=data.texto
    console.log(data)
    this.nombre?.setValue(data.cliente.nombre)
    this.apellido?.setValue(data.cliente.apellido)
    this.ci?.setValue(data.cliente.ci)
    this.email?.setValue(data.cliente.email)
}
agregar=new FormGroup({
  id: new FormControl('',[]),
  nombre: new FormControl('',[Validators.required]),
  email: new FormControl('',[Validators.required,Validators.email]),
  apellido: new FormControl('',[Validators.required]),
  ci: new FormControl('',[Validators.required,Validators.minLength(7)]),
})
  get nombre(){return this.agregar.get('nombre')}
  get apellido(){return this.agregar.get('apellido')}
  get ci(){return this.agregar.get('ci')}
  get email(){
    return this.agregar.get('email')
  }
  error_nombre():string{
    if(this.nombre?.hasError('required'))
      return "Campo Obligatorio"
    return ""
  }
  error_email():string{
    if(this.email?.hasError('required'))
      return "Campo Obligatorio"
    if(this.email?.hasError('email'))
      return "Ingrese el formato de un correo"
    return ""
  }
  error_ci():string{
    if(this.ci?.hasError('required'))
      return "Campo Obligatorio"
    if(this.ci?.hasError('minlength'))
      return "El CI debe tener 7 digitos"
    return ""
  }
  
}