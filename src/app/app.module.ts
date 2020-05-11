import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// modulo de rutas
import { AppRoutingModule } from './app-routing.module';
// formularios por template
import { FormsModule } from '@angular/forms';
// para hacer peticiones http importar HttpClient Module
// el modulo hay que importarlo tambien dentro del servicio que lo use
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
// mis componentes, se injectan atomatico con el comando de 'ng g c'
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroeComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,    // esta viene por default
    AppRoutingModule, // importar las rutas
    FormsModule,      // importar modulodeformularios por template
    HttpClientModule // importarlo aca tambien
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
