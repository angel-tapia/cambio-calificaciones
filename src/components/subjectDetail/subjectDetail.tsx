import React from 'react';
import { ShimmeredDetailsList } from '@fluentui/react/lib/ShimmeredDetailsList';
import { IColumn } from '@fluentui/react/lib/DetailsList';
import { IStackTokens, Stack, Text } from '@fluentui/react';
import { MateriaAlumnos, MateriaProfesor } from '../../models';
import {
  getMateriaByKeyAndGroup420,
  getMateriaByKeyAndGroup430,
  getMateriaByKeyAndGroup440,
} from 'src/hooks/getAlumnos';

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
  subject: MateriaProfesor;
};

const SubjectDetail: React.FC<Props> = ({ subject }) => {
  const plan = subject.Plan;
  let materiaAlumno: MateriaAlumnos | undefined = undefined;
  console.log(plan + ' ' + subject.ClaveMateria + ' ' + subject.Grupo);
  switch (plan) {
    case '2015':
      materiaAlumno = getMateriaByKeyAndGroup420(
        subject.ClaveMateria,
        subject.Grupo
      );
      break;
    case '2021':
      materiaAlumno = getMateriaByKeyAndGroup430(
        subject.ClaveMateria,
        subject.Grupo
      );
      break;
    case '2022':
      materiaAlumno = getMateriaByKeyAndGroup440(
        subject.ClaveMateria,
        subject.Grupo
      );
      break;
    default:
      materiaAlumno = undefined;
  }

  console.log(materiaAlumno);
  if (!materiaAlumno) {
    return <Text>No hay alumnos inscritos en esta materia</Text>;
  }

  return (
    <Stack tokens={stackTokens}>
      <Stack horizontal tokens={stackTokens}>
        <Text variant="xLarge">Materia: {subject.NombreMateria}</Text>
        <Text variant="xLarge">Clave Materia: {subject.ClaveMateria}</Text>
        <Text variant="xLarge">Grupo: {subject.Grupo}</Text>
      </Stack>
      <ShimmeredDetailsList
        items={materiaAlumno!.Alumnos}
        columns={columns}
        layoutMode={1}
        enableShimmer={false}
      />
    </Stack>
  );
};

export default SubjectDetail;
