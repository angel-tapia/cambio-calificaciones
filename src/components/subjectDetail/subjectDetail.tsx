import React, { useState, useEffect } from 'react';
import { ShimmeredDetailsList } from '@fluentui/react/lib/ShimmeredDetailsList';
import { IColumn } from '@fluentui/react/lib/DetailsList';
import { IStackTokens, Stack, Text } from '@fluentui/react';
import {
  Alumno,
  MateriaAlumnos,
  MateriaProfesor,
  Profesor,
} from '../../models';
import ChangeRequest from '../changeRequest/changeRequest';
import { getAlumnos } from 'src/hooks/getAlumnos'; // Import the getAlumnos function

const stackTokens: IStackTokens = {
  childrenGap: 20,
  padding: 20,
};

const columns: IColumn[] = [
  {
    key: 'Matricula',
    name: 'Matrícula',
    fieldName: 'Matricula',
    minWidth: 100,
    maxWidth: 150,
  },
  {
    key: 'Nombre',
    name: 'Nombre',
    fieldName: 'Nombre',
    minWidth: 300,
    maxWidth: 500,
  },
  {
    key: 'Oportunidad',
    name: 'Oportunidad',
    fieldName: 'Oportunidad',
    minWidth: 100,
    maxWidth: 150,
  },
];

type Props = {
  profesor: Profesor;
  subject: MateriaProfesor;
  academia: string;
  plan: string;
};

const SubjectDetail: React.FC<Props> = ({
  profesor,
  subject,
  academia,
  plan,
}) => {
  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null);
  const [materiaAlumno, setMateriaAlumno] = useState<
    MateriaAlumnos | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await getAlumnos(
          subject.Plan,
          subject.ClaveMateria,
          subject.Grupo
        );
        setMateriaAlumno(response.data);
      } catch (err) {
        setError('Error fetching alumnos data.');
        console.error('Error fetching alumnos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlumnos();
  }, [subject.Plan, subject.ClaveMateria, subject.Grupo]); // Run when subject details change

  const handleItemClick = (item: Alumno) => {
    setSelectedAlumno(item);
  };

  if (isLoading) {
    return <Text variant="xLarge">Loading...</Text>;
  }

  if (error) {
    return <Text variant="xLarge">{error}</Text>;
  }

  if (!materiaAlumno) {
    return (
      <Text variant="xLarge">No hay alumnos inscritos en esta materia</Text>
    );
  }

  if (selectedAlumno) {
    return (
      <ChangeRequest
        alumno={selectedAlumno}
        materiaAlumno={materiaAlumno}
        plan={plan}
        profesor={profesor}
        academia={academia}
      />
    );
  }

  return (
    <Stack tokens={stackTokens}>
      <Stack horizontal tokens={stackTokens}>
        <Text variant="xLarge">Materia: {subject.NombreMateria}</Text>
        <Text variant="xLarge">Clave Materia: {subject.ClaveMateria}</Text>
        <Text variant="xLarge">Grupo: {subject.Grupo}</Text>
      </Stack>
      <ShimmeredDetailsList
        items={materiaAlumno.Alumnos}
        columns={columns}
        layoutMode={1}
        enableShimmer={false}
        onItemInvoked={handleItemClick}
      />
    </Stack>
  );
};

export default SubjectDetail;
