import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit{
  title = 'barchartApp';
  dataset = [
    { name: "X", value: 1 },
    { name: "Y", value: 2 }
  ];
  gdpData = [];
  constructor(private productoServicio:ProductoService){}
  ngOnInit(): void {
    this.productoServicio.meses(2006).subscribe(data=>{
      this.gdpData=data[4]
      console.log(data)
    })
  }
}
