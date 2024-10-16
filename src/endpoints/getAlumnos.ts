import axios from 'axios';
import { MateriaAlumnos } from 'src/models';

const BASE_URL = 'https://backcalificaciones.fly.dev';
const ENDPOINT = '/api/alumnos';

export function getAlumnos(plan: string, subjectId: string, group: string) {
  const TOKEN = sessionStorage.getItem('Token');

  const apiClient = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + TOKEN,
    },
  });

  return apiClient.get<MateriaAlumnos>(
    `${ENDPOINT}/${plan}/${subjectId}/${group}`
  );
}
