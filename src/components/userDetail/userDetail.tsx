import {
  IStackTokens,
  IColumn,
  Stack,
  ShimmeredDetailsList,
  Text,
} from '@fluentui/react';
import React, { useState } from 'react';
import { Materia } from '../../models';
import SubjectDetail from '../subjectDetail/subjectDetail';

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

// Dummy items array
const items = new Array(10).fill(null).map((_, index) => ({
  key: index,
  ClaveMateria: `Dummy ${index}`,
  NombreMateria: `Subject ${index}`,
  Grupo: `G${index}`,
  Plan: `Plan ${index}`,
}));

type Props = {
  employeeId: string;
};

const UserDetail: React.FC<Props> = ({ employeeId }) => {
  const [selectedSubject, setSelectedSubject] = useState<Materia | null>(null);

  const handleItemClick = (item: Materia) => {
    setSelectedSubject(item);
  };

  if (selectedSubject) {
    return <SubjectDetail subject={selectedSubject} />;
  }

  return (
    <Stack tokens={stackTokens}>
      <Stack horizontal tokens={stackTokens}>
        <Text variant="xLarge">Professor Name: Angel Tapia</Text>
        <Text variant="xLarge">Employee ID: {employeeId}</Text>
      </Stack>
      <ShimmeredDetailsList
        items={items}
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
