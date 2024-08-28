export type ListaAlumnos = {
  ClaveMateria: string;
  NombreMateria: string;
  Grupo: string;
  Plan: string;
  Alumnos: Alumno[];
};

export type Alumno = {
  Matricula: string;
  Nombre: string;
  Oportunidad: number;
};
