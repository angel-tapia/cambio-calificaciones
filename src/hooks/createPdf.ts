import axios from 'axios';
import { Alumno, MateriaAlumnos, Profesor } from 'src/models';

const BASE_URL = 'https://backend-calificaciones.vercel.app';
const ENDPOINT = '/pdf';

export function createPdf(
  alumno: Alumno,
  materiaAlumno: MateriaAlumnos,
  plan: string,
  profesor: Profesor,
  calificacionIncorrecta: string,
  calificacionCorrecta: string,
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
    alumno: alumno,
    materiaAlumno: materiaAlumno,
    plan: plan,
    profesor: profesor,
    calificacionIncorrecta: calificacionIncorrecta,
    calificacionCorrecta: calificacionCorrecta,
    motivo: motivo,
    academia: academia,
    nombreCoordinador: nombreCoordinador,
  });
}
