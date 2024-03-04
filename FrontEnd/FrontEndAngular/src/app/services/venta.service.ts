import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  base='http://localhost:8000/api/'
  constructor(private http:HttpClient) { }
  listar():Observable<Venta[]>{
    return this.http.get<Venta[]>(this.base+'venta')
  }
  eliminar(id:number):Observable<Venta[]>{
    return this.http.delete<Venta[]>(this.base+'venta/'+id)
  }
  agregar(formulario:Venta):Observable<Venta[]>{
    return this.http.post<Venta[]>(this.base+'venta/',formulario)
  }
  actualizar(formulario:Venta,id:number):Observable<Venta[]>{
    return this.http.put<Venta[]>(this.base+'venta/'+id,formulario)
  }

}
