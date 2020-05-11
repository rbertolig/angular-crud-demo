import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false; // para saber cuando se esta cargando informacion asincrona


  constructor( private heroesService: HeroesService ) { }

  ngOnInit() {

    this.cargando = true; // inicializar con true en cargando
    this.heroesService.getHeroes()
      .subscribe( resp => {
        this.heroes = resp;
        this.cargando = false; // quitar propiedadde cargando al tener respuesta lista
      });

  }

  borrarHeroe( heroe: HeroeModel, i: number ) {
    // pedir confirmacion de borrado con swal
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ heroe.nombre }`,
      icon: 'question',
      showConfirmButton: true, // mostrar boton de confirmacion
      showCancelButton: true // mostrar  boton de cancelar
    }).then( resp => { // resp sera la respuesta del usuario

      if ( resp.value ) {  // si fur confirmacion proceder con borrado
        this.heroes.splice(i, 1); //  extraer el registro correspondiente del array con listado, i viene del ngFor en html
        // angular renderiza el html automaticamente cuando cambie el array
        this.heroesService.borrarHeroe( heroe.id ).subscribe(); // llamar funcion que borra el registro en la BD
      }

    });



  }


}
