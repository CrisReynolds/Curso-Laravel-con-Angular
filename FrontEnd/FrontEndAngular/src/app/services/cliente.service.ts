import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }
  base='http://localhost:8000/api/'
  listar():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.base+'cliente')
  }
  eliminar(id:number):Observable<Cliente[]>{
    return this.http.delete<Cliente[]>(this.base+'cliente/'+id)
  }
  agregar(formulario:Cliente):Observable<Cliente[]>{
    return this.http.post<Cliente[]>(this.base+'cliente/',formulario)
  }
  actualizar(formulario:Cliente,id:number):Observable<Cliente[]>{
    return this.http.put<Cliente[]>(this.base+'cliente/'+id,formulario)
  }
}
