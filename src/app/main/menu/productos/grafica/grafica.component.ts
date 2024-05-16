import { Component, Input } from '@angular/core';
import { ChartType, Chart} from 'chart.js/auto';
import { ProductosService } from '../../../../services/productos/productos.service';

@Component({
  selector: 'app-grafica',
  standalone: true,
  imports: [],
  templateUrl: './grafica.component.html',
  styleUrl: './grafica.component.css'
})
export class GraficaComponent {
  public chart!:any;
  public valores!: Array<number>
  private labels!: Array<string>
  @Input() opcion: number = 3;

  constructor(private productoServicio: ProductosService){

  }
  
  ngOnInit(){
    this.update()
  }

  update(){
    this.valores = []
    this.labels = []
    this.chart?this.chart.destroy():undefined;
    
    this.productoServicio.masVendidos(this.opcion).subscribe({
      next: data => {
        let val: Array<number> = []
        let lab: Array<string> = []
        data.forEach(element => {
          lab.push(element[0] as string)
          val.push(element[1] as number)
        })
        this.valores = val;
        this.labels = lab;
      },
      error: err => console.error("Error al cargar datos: " + err),
      complete: () => {

        const data = {
          labels: this.labels,
          datasets: [{
            label: 'Ventas',
            data:this.valores,
            backgroundColor: [
              'rgb(255,45,135)',
              'rgb(0,98,76)',
              'rgb(76,45,145)',
              'rgb(255,45,135)',
              'rgb(0,98,76)',
              'rgb(76,45,145)',
              'rgb(255,45,135)',
              'rgb(0,98,76)',
              'rgb(76,45,145)',
              'rgb(76,45,145)'
            ]
          }]
        };
        // console.log(data.datasets[0].data);

    
        // const ctx = this.chartCanvas.nativeElement.getContext('2d');
    
        this.chart = new Chart('chart', {
          type: "pie" as ChartType,
          data: data
        });
        console.log(this.chart.config)
      }
    })
  }

  ngOnChanges(): void {
    this.update();
  }

  select(evt: any){
    this.opcion = evt.target.value;
    this.update()
  }
}
