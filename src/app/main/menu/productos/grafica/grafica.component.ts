import { Component } from '@angular/core';
import { ChartType, Chart} from 'chart.js/auto';

@Component({
  selector: 'app-grafica',
  standalone: true,
  imports: [],
  templateUrl: './grafica.component.html',
  styleUrl: './grafica.component.css'
})
export class GraficaComponent {
  public chart:any;

  ngOnInit(){
    const data = {
      labels: [
        'ENE',
        'FEB',
        'MAR'
      ],
      datasets: [{
        label: 'Grafica ejemplo',
        data:[123,1354,3455],
        backgroundColor: [
          'rgb(255,45,135)',
          'rgb(0,98,76)',
          'rgb(76,45,145)'
        ]
      }]
    };

    // const ctx = this.chartCanvas.nativeElement.getContext('2d');

    this.chart = new Chart('chart', {
      type: "pie" as ChartType,
      data: data
    });
  }
}
