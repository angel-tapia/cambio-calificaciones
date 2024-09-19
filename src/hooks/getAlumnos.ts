import axios from 'axios';
import { MateriaAlumnos } from 'src/models';

const BASE_URL = 'https://backend-calificaciones.vercel.app';
const ENDPOINT = '/alumnos';

export function getAlumnos(plan: string, subjectId: string, group: string) {
  const apiClient = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return apiClient.get<MateriaAlumnos>(
    `${ENDPOINT}/${plan}/${subjectId}/${group}`
  );
}
