import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})

export class UsuarioFormComponent{
  public name:string=""
  public previsualizacion:string=""
  texto:string=""
  constructor(public dialogRef:MatDialogRef<UsuarioFormComponent>, @ Inject (MAT_DIALOG_DATA) public data:any,private usuarioServicio:UsuarioService){
    this.texto=data.texto
    console.log(data)
    this.nombre?.setValue(data.usuario.nombre)
    this.apellido?.setValue(data.usuario.apellido)
    this.username?.setValue(data.usuario.username)
    this.password?.setValue(data.usuario.password)
    this.email?.setValue(data.usuario.email)
    // this.imagen?.setValue(data.usuario.imagen)
    if(data.texto=="Editar Usuario")
      this.password?.clearValidators()
    if(data.usuario.imagen!="")
      this.previsualizacion='http://localhost:8000/api/usuario/imagen/'+data.imagen
  }
  agregar=new FormGroup({
    id: new FormControl('',[]),
    nombre: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    apellido: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    imagen: new FormControl('',[Validators.required]),
    nombreImagen: new FormControl('',[])

  })
  get nombre(){return this.agregar.get('nombre')}
  get apellido(){return this.agregar.get('apellido')}
  get imagen(){return this.agregar.get('imagen')}
  get password(){return this.agregar.get('password')}
  get username(){return this.agregar.get('username')}
  get nombreImagen(){return this.agregar.get('nombreImagen')}
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
  cargarImagen(event:any):void{
    console.log(event.target.files)
    let file:File=<File>event.target.files[0]
    this.name=file.name
    this.nombreImagen?.setValue(this.name)
    this.previsualizar(file)
    this.usuarioServicio.subirImagen(file,this.name).subscribe(data=>{
      console.log(data)
    })
  }
  previsualizar(file:File):void{
    const reader=new FileReader()
    reader.onload=(e:any)=>{
      this.previsualizacion=e.target.result
    };
    reader.readAsDataURL(file)
    // console.log(this.previsualizacion)
  };
}
