import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }
  base='http://localhost:8000/api/'
  listar_usuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.base+'usuario')
  }
  eliminar(id:number):Observable<Usuario[]>{
    return this.http.delete<Usuario[]>(this.base+'usuario/'+id)
  }
  agregar(formulario:Usuario):Observable<Usuario[]>{
    return this.http.post<Usuario[]>(this.base+'usuario/',formulario)
  }
  actualizar(formulario:Usuario,id:number):Observable<Usuario[]>{
    return this.http.put<Usuario[]>(this.base+'usuario/'+id,formulario)
  }
  subirImagen(file:File,nombre:string):Observable<any>{
    const fd = new FormData
    fd.append('image',file,nombre)
    return this.http.post(this.base+'usuario/imagen',fd)
  }

}
