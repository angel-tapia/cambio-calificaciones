import React, { useState, useEffect } from 'react';
import {
  IStackTokens,
  IColumn,
  Stack,
  ShimmeredDetailsList,
  Text,
} from '@fluentui/react';
import SubjectDetail from '../subjectDetail/subjectDetail';
import { MateriaProfesor, Profesor } from '../../models';
import { getMaterias } from 'src/hooks/getMaterias';

const stackTokens: IStackTokens = {
  childrenGap: 20,
  padding: 20,
};

const columns: IColumn[] = [
  {
    key: 'ClaveMateria',
    name: 'Clave Materia',
    fieldName: 'ClaveMateria',
    minWidth: 100,
    maxWidth: 150,
  },
  {
    key: 'NombreMateria',
    name: 'Nombre Materia',
    fieldName: 'NombreMateria',
    minWidth: 300,
    maxWidth: 500,
  },
  {
    key: 'Grupo',
    name: 'Grupo',
    fieldName: 'Grupo',
    minWidth: 100,
    maxWidth: 150,
  },
  {
    key: 'Plan',
    name: 'Plan',
    fieldName: 'Plan',
    minWidth: 100,
    maxWidth: 150,
  },
];

type Props = {
  employeeId: string;
};

const UserDetail: React.FC<Props> = ({ employeeId }) => {
  const [selectedSubject, setSelectedSubject] =
    useState<MateriaProfesor | null>(null);
  const [profesor, setProfesor] = useState<Profesor | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await getMaterias(employeeId);
        setProfesor(response.data);
      } catch (error) {
        console.error('There was an error fetching the materias!', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaterias();
  }, [employeeId]);

  const handleItemClick = (item: MateriaProfesor) => {
    setSelectedSubject(item);
  };

  if (selectedSubject) {
    return (
      <SubjectDetail
        profesor={profesor!}
        subject={selectedSubject}
        academia={selectedSubject.Academia}
        plan={selectedSubject.Plan}
      />
    );
  }

  if (isLoading) {
    return <Text variant="xLarge">Loading...</Text>;
  }

  if (!profesor) {
    return <Text variant="xLarge">No data available</Text>;
  }

  return (
    <Stack tokens={stackTokens}>
      <Stack horizontal tokens={stackTokens}>
        <Text variant="xLarge">Nombre profesor: {profesor.NombreMaestro}</Text>
        <Text variant="xLarge">ID del empleado: {employeeId}</Text>
      </Stack>
      <ShimmeredDetailsList
        items={profesor.Materias}
        columns={columns}
        setKey="set"
        layoutMode={0}
        enableShimmer={isLoading}
        onItemInvoked={handleItemClick}
      />
    </Stack>
  );
};

export default UserDetail;
