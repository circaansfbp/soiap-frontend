import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

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
import { PagoFormComponent } from './components/pago/pago-form/pago-form.component';
import { PagoComponent } from './components/pago/pago.component';
import { AnamnesisComponent } from './components/anamnesis/anamnesis.component';
import { AnamnesisFormComponent } from './components/anamnesis/anamnesis-form/anamnesis-form.component';
import { AtencionesPacienteComponent } from './components/paciente/atenciones-paciente/atenciones-paciente.component';
import { FichaTratamientoComponent } from './components/ficha-tratamiento/ficha-tratamiento.component';
import { FichaTratamientoFormComponent } from './components/ficha-tratamiento/ficha-tratamiento-form/ficha-tratamiento-form.component';
import { HistorialPacientesComponent } from './components/paciente/historial-pacientes/historial-pacientes.component';
import { SesionTerapiaFormComponent } from './components/sesion-terapia/sesion-terapia-form/sesion-terapia-form.component';
import { ListaSesionesComponent } from './components/sesion-terapia/lista-sesiones.component';

const routes = [
  { path: '', component: AgendaComponent },
  { path: 'nuevo-horario', component: NuevoHorarioFormComponent },
  { path: 'nuevo-horario/:idAtencion', component: NuevoHorarioFormComponent },
  { path: 'pacientes/page/:page', component: ListaPacientesComponent },
  { path: 'pacientes/historial/page/:page', component: HistorialPacientesComponent},
  { path: 'pacientes/form/:idPaciente', component: PacienteFormComponent },
  { path: 'pacientes/:idPaciente', component: PacienteComponent },
  { path: 'pacientes/anamnesis/:idPaciente', component: AnamnesisFormComponent },
  { path: 'pacientes/ficha-tratamiento/:idPaciente', component: FichaTratamientoFormComponent },
  { path: 'pacientes/ficha-tratamiento/nueva-sesion/:idPaciente', component: SesionTerapiaFormComponent },
  { path: 'pacientes/ficha-tratamiento/modificar-sesion/:idSesion', component: SesionTerapiaFormComponent},
  { path: 'pacientes/ficha-tratamiento/sesiones/:idPaciente', component: ListaSesionesComponent},
  { path: 'pacientes/atenciones/:idPaciente', component: AtencionesPacienteComponent },
  { path: 'horario/pago/:idAtencion', component: PagoFormComponent },
  { path: 'horario/pago/:idAtencion/:idPago', component: PagoFormComponent }
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
    FiltrarAsistenciaComponent,
    PagoFormComponent,
    PagoComponent,
    AnamnesisComponent,
    AnamnesisFormComponent,
    AtencionesPacienteComponent,
    FichaTratamientoComponent,
    FichaTratamientoFormComponent,
    HistorialPacientesComponent,
    SesionTerapiaFormComponent,
    ListaSesionesComponent
  ],

  imports: [
    NgxPaginationModule,
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
