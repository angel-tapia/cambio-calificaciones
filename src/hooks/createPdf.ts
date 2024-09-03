import axios from 'axios';
import { Alumno, MateriaAlumnos, Profesor } from 'src/models';

const BASE_URL = 'http://127.0.0.1:8000';
const ENDPOINT = '/pdf';

export function createPdf(
  alumno: Alumno,
  materiaAlumno: MateriaAlumnos,
  profesor: Profesor
) {
  const apiClient = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
  });

  return apiClient.post(ENDPOINT, {
    alumno: alumno,
    materiaAlumno: materiaAlumno,
    profesor: profesor,
  });
}
