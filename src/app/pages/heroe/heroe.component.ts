import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();


  constructor( private heroesService: HeroesService,
               private route: ActivatedRoute ) { }

  ngOnInit() {
    // obtener parametro id desde la url de la ruta de este componente
    const id = this.route.snapshot.paramMap.get('id');
    // el id es 'nuevo' cuando se va a crear un nuevo registro x tanto no existe en la BD
    if ( id !== 'nuevo' ) {

      this.heroesService.getHeroe( id ) // colsultar record al servicio
        .subscribe( (resp: HeroeModel) => {
          this.heroe = resp;   // contiene todo pero en firebase el id esta en el nodo superior
          this.heroe.id = id; // lo tomo de la ruta que es mas facil
        });

    }

  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    // crear ua variable tipo observable para monitorear el estado observable de las peticiones http
    let peticion: Observable<any>;

    if ( this.heroe.id ) {
      peticion = this.heroesService.actualizarHeroe( this.heroe );
    } else {
      peticion = this.heroesService.crearHeroe( this.heroe );
    }
    // peticion puede serua actualizacion o un registro unuevo pero me suscribo una sola vez a lo que sea
    peticion.subscribe( resp => {

      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

    });



  }

}
