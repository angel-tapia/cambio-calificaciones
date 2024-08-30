import React from 'react';
import { Stack, TextField, Text } from '@fluentui/react';
import { Alumno, MateriaAlumnos, Profesor } from 'src/models';

const stackTokensVertical = {
  childrenGap: 10,
};

const stackTokensHorizontal = {
  childrenGap: 20,
};

type Props = {
  alumno: Alumno;
  materiaAlumno: MateriaAlumnos;
  profesor: Profesor;
};

const ChangeRequest: React.FC<Props> = ({
  alumno,
  materiaAlumno,
  profesor,
}) => {
  const [calificacionIncorrecta, setCalificacionIncorrecta] =
    React.useState<string>('');
  const [calificacionCorrecta, setCalificacionCorrecta] =
    React.useState<string>('');
  const [motivo, setMotivo] = React.useState<string>('');
  const [errorCalificacionIncorrecta, setErrorCalificacionIncorrecta] =
    React.useState<string | undefined>(undefined);
  const [errorCalificacionCorrecta, setErrorCalificacionCorrecta] =
    React.useState<string | undefined>(undefined);

  const validateCalificacion = (calificacion: string) => {
    if (!calificacion) {
      return 'Calificación es requerida';
    }

    if (isNaN(parseFloat(calificacion))) {
      return 'Calificación debe ser un número';
    }

    if (parseFloat(calificacion) < 0 || parseFloat(calificacion) > 100) {
      return 'Calificación debe estar entre 0 y 100';
    }

    return undefined;
  };

  console.log(
    'calificaciones y motivos',
    calificacionIncorrecta,
    calificacionCorrecta,
    motivo
  );

  return (
    <div>
      <Stack tokens={stackTokensVertical}>
        <Text variant="xLarge">Solicitud de cambio</Text>
        <Stack horizontal tokens={stackTokensHorizontal}>
          <Text style={{ fontWeight: 'bold' }}>Alumno:</Text>
          <Text>
            {alumno.Nombre} ({alumno.Matricula})
          </Text>
        </Stack>

        <Stack tokens={stackTokensVertical}>
          <Stack horizontal tokens={stackTokensHorizontal}>
            <Text style={{ fontWeight: 'bold' }}>Materia:</Text>
            <Text>
              {materiaAlumno.NombreMateria} (Clave: {materiaAlumno.ClaveMateria}
              , Grupo: {materiaAlumno.Grupo})
            </Text>
          </Stack>
          <Stack horizontal tokens={stackTokensHorizontal}>
            <Text style={{ fontWeight: 'bold' }}>Profesor:</Text>
            <Text>
              {profesor.NombreMaestro} (ID: {profesor.EmployeeId})
            </Text>
          </Stack>
          <Stack horizontal tokens={stackTokensHorizontal}>
            <Text style={{ fontWeight: 'bold' }}>Oportunidad:</Text>
            <Text>{alumno.Oportunidad}</Text>
          </Stack>
        </Stack>

        <Stack horizontal tokens={stackTokensHorizontal}>
          <TextField
            label="Calificación Incorrecta"
            onChange={(_, newValue) => {
              setErrorCalificacionIncorrecta(
                validateCalificacion(newValue || '')
              );
              setCalificacionIncorrecta(newValue || '');
            }}
            errorMessage={errorCalificacionIncorrecta}
          />
          <TextField
            label="Calificación Correcta"
            onChange={(_, newValue) => {
              setErrorCalificacionCorrecta(
                validateCalificacion(newValue || '')
              );
              setCalificacionCorrecta(newValue || '');
            }}
            errorMessage={errorCalificacionCorrecta}
          />
        </Stack>

        <TextField
          label="Motivo"
          multiline
          rows={4}
          onChange={(_, newValue) => {
            setMotivo(newValue || '');
          }}
        />
      </Stack>
    </div>
  );
};

// Export the component as default
export default ChangeRequest;
