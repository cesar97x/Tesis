import { Injectable } from '@angular/core';
import { Http, HttpOptions, HttpResponse } from '@capacitor-community/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraficaServiceService {

  constructor() {

   }
  async obtencionMejoresPeoresProductos(){
    const options:HttpOptions = {
      url: environment.WS_PATH+'obtenerMejoresPeoresPlatosRestaurantes',
      method:'GET',
      headers: {'Content-Type':  'application/json'}
    }
    const response: HttpResponse = await Http.request(options);
    return response.data
  }

  async dataParaGraficaPorGenero(){
    const options:HttpOptions = {
      url: environment.WS_PATH+'usersGenero',
      method:'GET',
      headers: {'Content-Type':  'application/json'}
    }
    const response: HttpResponse = await Http.request(options);
    return response.data
  }

  async dataNumeroComentariosPorTipo(){
    const options:HttpOptions = {
      url: environment.WS_PATH+'cantidadDeComentariosPorTipo',
      method:'GET',
      headers: {'Content-Type':  'application/json'}
    }
    const response: HttpResponse = await Http.request(options);
    return response.data
  }

  async dataEdadUsuarios(){
    
    const options:HttpOptions = {
      url: environment.WS_PATH+'usersEdad',
      method:'GET',
      headers: {'Content-Type':  'application/json'}
    }
    const response: HttpResponse = await Http.request(options);
    return response.data
  }

  async dataNGrama(analizarComentario: string, numeroPalabras:number, numeroNgrama:number , clasificacionComment:string){
    const options:HttpOptions = {
      url: environment.WS_PATH+'graficasNgramasPalabras',
      method:'POST',
      data: {'analizarComentario': analizarComentario, 'numeroPalabras': numeroPalabras, 'numeroNgrama': numeroNgrama, "clasificacionComment": clasificacionComment},
      headers: {'Content-Type':  'application/json'}
    }
      const response: HttpResponse = await Http.request(options);
      return response.data
  }

  async buscarComentarios(analizarComentario: string, texto:string){
    const options:HttpOptions = {
      url: environment.WS_PATH+'buscarEnDataset',
      method:'POST',
      data: {'analizarComentario': analizarComentario, 'texto': texto},
      headers: {'Content-Type':  'application/json'}
    }
      const response: HttpResponse = await Http.request(options);
      return response.data
  }

  async buscarComentariosCategoria(analizarComentario: string, categoria:string, clasificacionComment:string){
    const options:HttpOptions = {
      url: environment.WS_PATH+'buscarCategoriaComentario',
      method:'POST',
      data: {'analizarComentario': analizarComentario, 'categoria': categoria, 'clasificacionComment': clasificacionComment},
      headers: {'Content-Type':  'application/json'}
    }
      
      const response: HttpResponse = await Http.request(options);
      console.log("Probando"+response.data);
      return response.data
  }
    


  
}
