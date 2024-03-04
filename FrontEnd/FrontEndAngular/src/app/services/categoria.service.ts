import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  constructor(private http:HttpClient) { }
  base='http://localhost:8000/api/'
  listar():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.base+'categoria')
  }
  eliminar(id:number):Observable<Categoria[]>{
    return this.http.delete<Categoria[]>(this.base+'categoria/'+id)
  }
  agregar(formulario:Categoria):Observable<Categoria[]>{
    return this.http.post<Categoria[]>(this.base+'categoria/',formulario)
  }
  actualizar(formulario:Categoria,id:number):Observable<Categoria[]>{
    return this.http.put<Categoria[]>(this.base+'categoria/'+id,formulario)
  }
  productos(id:number):Observable<any[]>{
    return this.http.get<any[]>(this.base+'categoria/productos/'+id)
  }
}
