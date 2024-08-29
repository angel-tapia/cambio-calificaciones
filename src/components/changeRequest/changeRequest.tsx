import React from 'react';
import { Alumno, MateriaAlumnos, Profesor } from 'src/models';

// Define the props interface
interface Props {
  alumno: Alumno;
  materiaAlumno: MateriaAlumnos;
  profesor: Profesor;
}

// Define the functional component
const ChangeRequest: React.FC<Props> = ({
  alumno,
  materiaAlumno,
  profesor,
}) => {
  return (
    <div>
      <h1>
        {alumno.Nombre} {alumno.Matricula} {materiaAlumno.ClaveMateria}{' '}
        {materiaAlumno.Grupo} {profesor.NombreMaestro}
        {alumno.Oportunidad} {materiaAlumno.NombreMateria} {profesor.EmployeeId}
      </h1>
    </div>
  );
};

// Export the component as default
export default ChangeRequest;
