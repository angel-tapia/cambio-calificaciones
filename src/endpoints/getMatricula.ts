import axios from 'axios';

const BASE_URL = 'https://backcalificaciones.fly.dev';
const ENDPOINT = '/api/matricula';

export function getMatricula(employeeEmail: string) {
  const apiClient = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return apiClient.get<string>(`${ENDPOINT}/${employeeEmail}`);
}
