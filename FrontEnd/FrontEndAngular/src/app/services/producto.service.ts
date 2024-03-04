import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private http:HttpClient) { }
  base='http://localhost:8000/api/'
  listar():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.base+'producto')
  }
  eliminar(id:number):Observable<Producto[]>{
    return this.http.delete<Producto[]>(this.base+'producto/'+id)
  }
  agregar(formulario:Producto):Observable<Producto[]>{
    return this.http.post<Producto[]>(this.base+'producto/',formulario)
  }
  actualizar(formulario:Producto,id:number):Observable<Producto[]>{
    return this.http.put<Producto[]>(this.base+'producto/'+id,formulario)
  }
  subirImagen(file:File,nombre:string):Observable<any>{
    const fd = new FormData
    fd.append('image',file,nombre)
    return this.http.post(this.base+'producto/imagen',fd)
  }
  meses(gestion:number):Observable<any>{
    return this.http.get(this.base+'producto/meses/'+gestion)
  }

}
