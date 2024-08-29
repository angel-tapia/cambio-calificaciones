import { Alumno } from './alumno';

export type MateriaProfesor = {
  ClaveMateria: string;
  NombreMateria: string;
  Grupo: string;
  Plan: string;
};

export type MateriaAlumnos = {
  ClaveMateria: string;
  NombreMateria: string;
  Grupo: string;
  Alumnos: Alumno[];
};
