import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent {
  public name:string=""
  public previsualizacion:string=""
  texto:string=""
  constructor(public dialogRef:MatDialogRef<CategoriaFormComponent>, @ Inject (MAT_DIALOG_DATA) public data:any,private categoriaServicio:CategoriaService){
    this.texto=data.texto
    console.log(data)
    this.tipo?.setValue(data.categoria.tipo)
}
agregar=new FormGroup({
  id: new FormControl('',[]),
  tipo: new FormControl('',[Validators.required]),
})
get tipo(){return this.agregar.get('tipo')}

error_tipo():string{
  if(this.tipo?.hasError('required'))
    return "Campo Obligatorio"
  return ""
}
}
