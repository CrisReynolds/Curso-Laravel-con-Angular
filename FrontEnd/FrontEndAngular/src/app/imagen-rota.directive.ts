import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appImagenRota]'
})
export class ImagenRotaDirective {

  constructor(private elemntRef:ElementRef) { }
  @HostListener('error')
  cargarImagenRota(){
    let img=this.elemntRef.nativeElement
    img.src='assets/imagenrota.jpg'
  }
}
