import axios from 'axios';
import { MateriaAlumnos } from 'src/models';

const BASE_URL = 'http://127.0.0.1:8000';
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
