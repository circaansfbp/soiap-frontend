import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit, OnChanges {

  @Input() paginador!: any; // Objeto paginador devuelto por el backend e inyectado desde el componente padre
  paginas!: number[]; // Para manejar las páginas

  // Cuando el total de registros es alto, se maneja el paginador mediante rangos
  from!: number;
  until!: number;

  constructor() { }

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updatedPaginator = changes['paginador'];

    if (updatedPaginator.previousValue) {
      this.initPaginator();
    }

    console.log(updatedPaginator);
  }

  initPaginator() {
    this.from = Math.min(Math.max(1, this.paginador.number - 4), this.paginador.totalPages - 5);
    this.until = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 4), 6);

    if (this.paginador.totalPages > 5) {
      this.paginas = new Array((this.until - this.from) + 1).fill(0).map((valor, index) => index + this.from);

    }

    else this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, index) => index + 1);
  }

}
