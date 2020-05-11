import { Injectable } from '@angular/core';
// para hacer peticiones http importar HttpClient Module
// el modulo hay que importarlo tambien dentro de app.module.ts
import { HttpClient } from '@angular/common/http';
// importar operadores para la logica
// map: para obtener/mapear contenido de objetos regresados por observables
import { map, delay } from 'rxjs/operators';
// importar mi modelo personalizado de datos
import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  // esta es la url base de la API de firebase para bases de datos
  // en este caso login-app-eef87 es el id de la app
  private url = 'https://login-app-eef87.firebaseio.com';


  constructor( private http: HttpClient ) { } // injectar el modulo http

  // metodo para crear un registro en BD con POST
  crearHeroe( heroe: HeroeModel ) {
    // hacer la peticion http a la url de la api con un post
    // .post(url: string, body: any, options?:{headers?: HttpHeaders | {[header: string]: string | string[];})
    // aqui solo mandamos la url y el body
    return this.http.post(`${ this.url }/heroes.json`, heroe) // retorna un observable tipo body con formato de objeto json
            .pipe(
              map( (resp: any) => {
                heroe.id = resp.name; // obtener el id contenido en 'resp.name' usando map
                return heroe;
              })
            );

  }

  actualizarHeroe( heroe: HeroeModel ) {
    // variable temporal para eliminar algunos campos del objeto a actualizar
    const heroeTemp = {
      ...heroe // esto hace que la variable nueva sea un clon de la otra ( heroe)
    };
    // borrar las llaves que no deseo enviar a la base de datos
    // no se le hace el delete a la variable original porque lo eliminariay perdemos ese campo
    delete heroeTemp.id;
    // se hace el PUT de acrtualizacion solo con los campos modificables usando la variable temporal
    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);


  }

  borrarHeroe( id: string ) {
    // hacer peticion DELETE para borrar el record deseado
    // basta con pasar la url con el id a borrar
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);

  }


  getHeroe( id: string ) {

    return this.http.get(`${ this.url }/heroes/${ id }.json`);

  }


  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`)
            .pipe(
              // esto abajo es igual a: 'map( resp=> this.crearAreglo(resp) )'
              // es una sintaxis mas simple que require poner solo el nombre del metodo
              map( this.crearArreglo ),
              delay(0) // esto no es necesario es solo para probar el 'loading'
            );
  }

  // este es el metodo que maneja la respuesta del 'map'
  // vamos a retornar un arreglo de objetos, no un objeto json ( objeto de objetos)
  // esto es necesario para poder iterar con *ngForr en el html
  // porque *ngFor no itera con json sino con array
  private crearArreglo( heroesObj: object ) {
    const heroes: HeroeModel[] = [];
    // una validacion si bd esta vacia
    if ( heroesObj === null ) { return []; }

    // funcion para barrer las llaves de un objeto
    Object.keys( heroesObj ).forEach( key => {

      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push( heroe ); // empuja el objeto actual de heroe al arreglo que estoy armando
    });


    return heroes;

  }


}
