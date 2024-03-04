import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/producto.service';
@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent {
  public name:string=""
  public previsualizacion:string=""
  texto:string=""
  constructor(public dialogRef:MatDialogRef<ProductoFormComponent>, @ Inject (MAT_DIALOG_DATA) public data:any,private productoServicio:ProductoService){
    this.texto=data.texto
    console.log(data)
    this.descripcion?.setValue(data.producto.descripcion)
    this.imagen?.setValue(data.producto.imagen)
    this.cantidad_minima?.setValue(data.producto.cantidad_minima)
    this.stock?.setValue(data.producto.stock)
    this.precio_compra?.setValue(data.producto.precio_compra)
    this.precio_venta?.setValue(data.producto.precio_venta)
    this.categoria_id?.setValue(data.producto.categoria_id)
}
agregar=new FormGroup({
  id: new FormControl('',[]),
  descripcion: new FormControl('',[Validators.required]),
  imagen: new FormControl('',[Validators.required]),
  cantidad_minima: new FormControl('',[Validators.required]),
  stock: new FormControl('',[Validators.required]),
  precio_compra: new FormControl('',[Validators.required]),
  precio_venta: new FormControl('',[Validators.required]),
  categoria_id: new FormControl('',[Validators.required]),
})
get descripcion(){return this.agregar.get('descripcion')}
get imagen(){return this.agregar.get('imagen')}
get cantidad_minima(){return this.agregar.get('cantidad_minima')}
get stock(){return this.agregar.get('stock')}
get precio_compra(){return this.agregar.get('precio_compra')}
get precio_venta(){return this.agregar.get('precio_venta')}
get categoria_id(){return this.agregar.get('categoria_id')}

error_descripcion():string{
  if(this.descripcion?.hasError('required'))
    return "Campo Obligatorio"
  return ""
}

}
