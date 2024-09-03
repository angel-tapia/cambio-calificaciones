import axios from 'axios';
import { MateriaAlumnos } from 'src/models';

const BASE_URL = 'http://127.0.0.1:8000';
const ENDPOINT = '/alumnos';

const parsePlan: { [key: string]: string } = {
  '2015': '420',
  '2021': '430',
  '2022': '440',
};

export function getAlumnos(plan: string, subjectId: string, group: string) {
  const apiClient = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const parsedPlan = parsePlan[plan];
  if (!parsedPlan) {
    throw new Error(`Invalid plan: ${plan}`);
  }

  return apiClient.get<MateriaAlumnos>(
    `${ENDPOINT}/${parsedPlan}/${subjectId}/${group}`
  );
}
