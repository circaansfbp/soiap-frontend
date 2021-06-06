import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class DictadoService {

  recognition: any = new webkitSpeechRecognition();
  transcript: string = '';

  constructor() { }

  // Al iniciar el servicio
  init() {
    this.recognition.lang = 'es-CL';
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
  }

  // Iniciar grabación 
  start() {
    this.transcript = '';
    this.recognition.start();

    this.recognition.onresult = (event: any) => {
      const results = event.results;
      this.transcript += results[results.length - 1][0].transcript;
      console.log(this.transcript);
    };
  }

  // Detener grabación
  stop(): string {
    this.recognition.abort();
    return this.transcript;
  }
}
