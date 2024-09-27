import axios from 'axios';
import { Profesor } from 'src/models';

const BASE_URL = process.env.BACKEND_API_URL;
const ENDPOINT = '/api/materias';

export function getMaterias(employeeId: string) {
  const apiClient = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return apiClient.get<Profesor>(`${ENDPOINT}/${employeeId}`);
}
