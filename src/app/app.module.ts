import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HorarioComponent } from './components/hora-atencion/agenda/horario/horario.component';
import { NuevoHorarioFormComponent } from './components/hora-atencion/agenda/horario/nuevo-horario-form/nuevo-horario-form.component';
import { AgendaComponent } from './components/hora-atencion/agenda/agenda.component';
import { ListaPacientesComponent } from './components/paciente/lista-pacientes.component';
import { PaginadorComponent } from './components/paginador/paginador.component';
import { PacienteFormComponent } from './components/paciente/paciente-form/paciente-form.component';
import { BusquedaPacienteComponent } from './components/busqueda/busqueda-pacientes/busqueda-paciente.component';
import { PacienteComponent } from './components/paciente/paciente/paciente.component';
import { FiltrarAsistenciaComponent } from './components/busqueda/filtrar-asistencia/filtrar-asistencia.component';

const routes = [
  { path: '', component: AgendaComponent },
  { path: 'nuevo-horario', component: NuevoHorarioFormComponent },
  { path: 'nuevo-horario/:idAtencion', component: NuevoHorarioFormComponent },
  { path: 'pacientes/page/:page', component: ListaPacientesComponent },
  { path: 'pacientes/form/:idPaciente', component: PacienteFormComponent },
  { path: 'pacientes/:idPaciente', component: PacienteComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HorarioComponent,
    NuevoHorarioFormComponent,
    AgendaComponent,
    ListaPacientesComponent,
    PaginadorComponent,
    PacienteFormComponent,
    BusquedaPacienteComponent,
    PacienteComponent,
    FiltrarAsistenciaComponent
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
