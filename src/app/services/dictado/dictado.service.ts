import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class DictadoService {

  recognition: any = new webkitSpeechRecognition();
  transcript: string = '';

  constructor(private toastr: ToastrService) { }

  // Al iniciar el servicio
  init() {
    this.recognition.lang = 'es-CL';
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
  }

  // Iniciar grabación 
  start() {
    this.toastr.info('Ahora puede comenzar a dictar la información que desea registrar. Recuerde esperar al menos 2 segundos antes de comenzar para asegurar el correcto registro de esta.', 'Escuchando...');

    this.transcript = '';
    this.recognition.start();

    this.recognition.onresult = (event: any) => {
      const results = event.results;
      this.transcript += results[results.length - 1][0].transcript;   
    }
  }

  // Detener grabación
  stop(): string {
    this.recognition.abort();

    if (this.transcript != '') {
      this.toastr.success('La información dictada ha sido capturada.', 'Captura exitosa!');
    }

    else this.toastr.error('Ocurrió un error al capturar la información. Por favor, intente nuevamente.', 'Ooops!');

    return this.transcript;
  }
}
