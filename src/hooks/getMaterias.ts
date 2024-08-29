import { Profesor } from '../models/profesor';
import data from '../data/professors_subjects.json'; // Adjust the path accordingly

export function getProfessorByEmployeeId(
  employeeId: string
): Profesor | undefined {
  return data.find((profesor: Profesor) => profesor.EmployeeId === employeeId);
}
