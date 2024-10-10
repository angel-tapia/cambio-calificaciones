import axios from 'axios';
import { Alumno, MateriaAlumnos, Profesor } from 'src/models';

const BASE_URL = 'https://backcalificaciones.fly.dev';
const ENDPOINT = '/api/pdf';

export function createPdf(
  alumnos: Alumno[],
  materiaAlumno: MateriaAlumnos,
  plan: string,
  profesor: Profesor,
  calificacionesIncorrectas: Record<string, string>,
  calificacionesCorrectas: Record<string, string>,
  motivo: string,
  academia: string,
  nombreCoordinador: string
) {
  const apiClient = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
  });

  return apiClient.post(ENDPOINT, {
    alumnos: alumnos,
    materiaAlumno: materiaAlumno,
    plan: plan,
    profesor: profesor,
    calificacionesIncorrectas: calificacionesIncorrectas,
    calificacionesCorrectas: calificacionesCorrectas,
    motivo: motivo,
    academia: academia,
    nombreCoordinador: nombreCoordinador,
  });
}
