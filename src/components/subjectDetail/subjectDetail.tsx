import React from 'react';
import { ShimmeredDetailsList } from '@fluentui/react/lib/ShimmeredDetailsList';
import { IColumn } from '@fluentui/react/lib/DetailsList';
import { IStackTokens, Stack, Text } from '@fluentui/react';
import { MateriaProfesor } from '../../models';

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

// Dummy listaAlumnos array
const listaAlumnos = new Array(10).fill(null).map((_, index) => ({
  key: index,
  Matricula: `M${index}`,
  Nombre: `Student ${index}`,
  Oportunidad: `Oportunidad ${index}`,
}));

type Props = {
  subject: MateriaProfesor;
};

const SubjectDetail: React.FC<Props> = ({ subject }) => {
  return (
    <Stack tokens={stackTokens}>
      <Stack horizontal tokens={stackTokens}>
        <Text variant="xLarge">Materia: {subject.NombreMateria}</Text>
        <Text variant="large">Clave Materia: {subject.ClaveMateria}</Text>
        <Text variant="large">Grupo: {subject.Grupo}</Text>
      </Stack>
      <ShimmeredDetailsList
        items={listaAlumnos}
        columns={columns}
        layoutMode={1}
        enableShimmer={false}
      />
    </Stack>
  );
};

export default SubjectDetail;
