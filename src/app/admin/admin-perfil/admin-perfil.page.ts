import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import Chart, { ChartOptions } from 'chart.js/auto';
import { Key } from 'protractor';
import { GraficaServiceService } from 'src/app/services/grafica-service.service';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { ChartComponent, NgApexchartsModule, ApexAxisChartSeries, ApexChart, ChartType, ApexDataLabels, ApexTitleSubtitle, ApexPlotOptions, ApexLegend, ApexYAxis } from 'ng-apexcharts';
import { Router } from '@angular/router';


export type ChartCalificacionOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  colors: string[];
};

@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.page.html',
  styleUrls: ['./admin-perfil.page.scss'],
})
export class AdminPerfilPage implements OnInit {
  public milinearChart: Chart;
  public milinearChart1: Chart;
  public milinearChart2: Chart;
  public linearChart: Chart;
  public barChart: Chart;

  public data = [];
  public data1 = [];

  //GRAFICAS PASTEL
  public label = [];
  public label1 = [];

  //GRAFICAS
  public labelL = [];


  public dataL = [];
  public idGraficoL = 'linear1';
  public idGraficoB = 'bar1';

  //Parametros para mensajes e informacion
  public nombre: String = '';
  public enfoqueEnEdadesMayor: number = 0;
  public enfoqueEnEdadesMenor: number = 0;
  public isOpen = false;
  public cantidadHombres = '';
  public cantidadMujeres = '';

  //Configuracion de valores para barra horizontal
  public series: ApexAxisChartSeries;
  public chartBarHorizontal: ApexChart;
  public plotOptions: ApexPlotOptions;
  public colors: string[];
  public axesY: ApexYAxis;


  @ViewChild("chartCalificacion") chartCalificacion: ChartComponent;
  public chartCalificacionOptions: Partial<ChartCalificacionOptions> = {
    series: [{ data: [] }],
    chart: {
      height: 350,
      type: "treemap"
    },
    title: { text: "Basic Treemap" },
    colors: []
  };

  constructor(
    private usurio: AuthService,
    private user: FirestoreService,
    private dataGraficaService: GraficaServiceService,
    private router: Router
  ) { }
  ngOnInit() {
    this.user
      .getUsuarioByID(this.usurio.getUserProfile().uid)
      .subscribe((res) => {
        this.nombre = res.nombres;
      });
    this.crearData();
  }

  setOpen(isOpen: boolean) {
    this.isOpen = isOpen;
  }
  openModalComentario(isOpen: boolean) {
    this.isOpen = isOpen;
  }

  crearData() {
    this.dataGraficaService.dataParaGraficaPorGenero().then((res) => {
      this.label = res.genero as [];
      this.data = res.count as [];
      this.cantidadHombres = this.data[0];
      this.cantidadMujeres = this.data[1];
      this.graficaBarraHorizontal(this.data, this.label);
    });

    this.dataGraficaService.dataNumeroComentariosPorTipo().then((res) => {
      this.labelL = res.sentimiento as [];
      this.dataL = res.count as [];
      this.graficaHeadmap(this.dataL, this.labelL);
    });

    this.dataGraficaService.dataEdadUsuarios().then((res) => {
      this.label = res.rango as [];
      this.data = res.count as [];
      let cont = 0;
      let cont2 = 10000000000;
      let aux = 0;
      let posicion = -1;
      let posicion2 = -1;

      this.data.forEach((valor) => {
        if (valor >= cont) {
          cont = valor;
          posicion = aux;
        }
        if (valor < cont2 && valor > 0) {
          cont2 = valor;
          posicion2 = aux;
        }
        aux++;
      });
      this.enfoqueEnEdadesMayor = this.label[posicion];
      this.enfoqueEnEdadesMenor = this.label[posicion2];

      this.graficaBar(this.data, this.idGraficoB, this.label);
    });
  }


  graficaBarraHorizontal(data, label) {

    this.series = [
      {
        name: label[0],
        data: [data[0]],
      },
      {
        name: label[1],
        data: [data[1]],
      },
    ];
    this.colors = ['#CF9F69', '#00512D'];
    this.axesY = {
      show: false,
    };
    this.chartBarHorizontal = {
      type: 'bar',
      stacked: true,
      stackType: '100%',
    };
    //console.log(this.chartBarHorizontal)
    this.plotOptions = {
      bar: {
        horizontal: true,
      },
    };
  }

  graficaBar(data, idGraficoBar, labelB) {
    this.barChart = new Chart(idGraficoBar, {
      type: 'bar',
      data: {
        labels: labelB,
        datasets: [
          {
            label: '',
            data: data,
            backgroundColor: [
              '#A2C2C2',
              '#5C8282',
              '#3E5858',
              '#93959E',
              '#56756',
              '#eadbf9',
            ],

            borderWidth: 1,
            order: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  graficaHeadmap(data, label) {
    this.chartCalificacionOptions = {
      series: [
        {
          data: [

            { x: 'Muy Bueno', y: data[0] },
            { x: label[1], y: data[1] },
            { x: label[2], y: data[2] },
            { x: label[3], y: data[3] },
            { x: 'Muy Malo', y: data[4] }
          ]
        }
      ],

      chart: {

        type: "treemap"
      },
      title: {
        text: "Basic Treemap"
      },
      colors: [
        "#76b536",
        "#5C8282",
        "#FFCE41",
        "#93959E",
        "#FF7A5B",
        "#EC4156",
      ],
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false
        }
      }
    };

    /*
      */
  }

  salir() {
    this.usurio.logout();
    this.router.navigateByUrl('/login-page', { replaceUrl: true });
    console.log('salir')
  }
}
