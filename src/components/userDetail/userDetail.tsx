import {
  IStackTokens,
  IColumn,
  Stack,
  ShimmeredDetailsList,
  Text,
} from '@fluentui/react';
import React, { useState } from 'react';
import SubjectDetail from '../subjectDetail/subjectDetail';
import { getProfessorByEmployeeId } from '../../hooks/getMaterias';
import { MateriaProfesor, Profesor } from '../../models';

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
  const profesor: Profesor | undefined = getProfessorByEmployeeId(employeeId);

  const handleItemClick = (item: MateriaProfesor) => {
    setSelectedSubject(item);
  };

  if (selectedSubject) {
    return <SubjectDetail subject={selectedSubject} />;
  }

  return (
    <Stack tokens={stackTokens}>
      <Stack horizontal tokens={stackTokens}>
        <Text variant="xLarge">Nombre profesor: {profesor!.NombreMaestro}</Text>
        <Text variant="xLarge">ID del empleado: {employeeId}</Text>
      </Stack>
      <ShimmeredDetailsList
        items={profesor!.Materias}
        columns={columns}
        setKey="set"
        layoutMode={0}
        enableShimmer={false}
        onItemInvoked={handleItemClick}
      />
    </Stack>
  );
};

export default UserDetail;
