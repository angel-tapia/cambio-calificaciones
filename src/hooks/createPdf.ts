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

  // Build the query string with all required parameters
  const queryParams = new URLSearchParams({
    alumno: JSON.stringify(alumno), // Convert complex objects to string if needed
    materiaAlumno: JSON.stringify(materiaAlumno),
    plan: plan,
    profesor: JSON.stringify(profesor),
    calificacionIncorrecta: calificacionIncorrecta,
    calificacionCorrecta: calificacionCorrecta,
    motivo: motivo,
    academia: academia,
    nombreCoordinador: nombreCoordinador,
  });

  return apiClient.get(`${ENDPOINT}?${queryParams.toString()}`);
}
