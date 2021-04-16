import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HorarioComponent } from './components/hora-atencion/agenda/horario/horario.component';
import { NuevoHorarioFormComponent } from './components/hora-atencion/agenda/horario/nuevo-horario-form/nuevo-horario-form.component';
import { AgendaComponent } from './components/hora-atencion/agenda/agenda.component';

const routes = [
  { path: '', component: AgendaComponent },
  { path: 'nuevo-horario', component: NuevoHorarioFormComponent },
  { path: 'nuevo-horario/:idAtencion', component: NuevoHorarioFormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HorarioComponent,
    NuevoHorarioFormComponent,
    AgendaComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
