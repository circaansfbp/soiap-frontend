export class Usuario {
  userId!: number;
  nombre!: string;
  apellido!: string;
  username!: string;
  password!: string;
  roles: string[] = new Array();

  constructor() {}
}
