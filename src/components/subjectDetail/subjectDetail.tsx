import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ShimmeredDetailsList,
  Selection,
  SelectionMode,
  IColumn,
  IStackTokens,
  Stack,
  Text,
  PrimaryButton,
} from '@fluentui/react';
import {
  Alumno,
  MateriaAlumnos,
  MateriaProfesor,
  Profesor,
} from '../../models';
import ChangeRequest from '../changeRequest/changeRequest';
import { getAlumnos } from 'src/endpoints/getAlumnos';

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
  const [selectedAlumnos, setSelectedAlumnos] = useState<Alumno[]>([]);
  const [materiaAlumno, setMateriaAlumno] = useState<
    MateriaAlumnos | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const [showChangeRequest, setShowChangeRequest] = useState<boolean>(false);

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
  }, [subject.Plan, subject.ClaveMateria, subject.Grupo]);

  const handleButtonClick = () => {
    setShowChangeRequest(false);
    if (selectedAlumnos.length === 0) {
      setSelectionError('Debe seleccionar al menos un alumno.');
      return;
    }

    if (selectedAlumnos.length > 5) {
      setSelectionError('No se pueden seleccionar más de 5 alumnos.');
      return;
    }

    setShowChangeRequest(true);
  };

  const alumnosWithKeys = useMemo(
    () =>
      materiaAlumno?.Alumnos.map((alumno, index) => ({
        ...alumno,
        key: alumno.Matricula || index,
      })) || [],
    [materiaAlumno]
  );

  const selection = useRef<Selection>(
    new Selection({
      onSelectionChanged: () => {
        const selectedItems = selection.current.getSelection() as Alumno[];
        setSelectedAlumnos(selectedItems);
      },
    })
  );

  if (isLoading) {
    return <Text variant="xLarge">Cargando...</Text>;
  }

  if (error) {
    return <Text variant="xLarge">{error}</Text>;
  }

  if (!materiaAlumno) {
    return (
      <Text variant="xLarge">No hay alumnos inscritos en esta materia</Text>
    );
  }

  if (showChangeRequest) {
    return (
      <ChangeRequest
        alumnos={selectedAlumnos}
        materiaAlumno={materiaAlumno}
        plan={plan}
        profesor={profesor}
        academia={academia}
      />
    );
  }

  return (
    <Stack tokens={stackTokens}>
      <Stack horizontal tokens={stackTokens} horizontalAlign="space-between">
        <Text variant="xLarge">Materia: {subject.NombreMateria}</Text>
        <Text variant="xLarge">Clave Materia: {subject.ClaveMateria}</Text>
        <Text variant="xLarge">Grupo: {subject.Grupo}</Text>
        {selectionError && (
          <Text variant="xLarge" styles={{ root: { color: 'red' } }}>
            {selectionError}
          </Text>
        )}
        <PrimaryButton
          styles={{ root: { marginLeft: 'auto' } }}
          onClick={handleButtonClick}
        >
          Cambiar Calificación
        </PrimaryButton>
      </Stack>
      <ShimmeredDetailsList
        items={alumnosWithKeys}
        columns={columns}
        layoutMode={1}
        enableShimmer={false}
        selection={selection.current}
        selectionMode={SelectionMode.multiple}
      />
    </Stack>
  );
};

export default SubjectDetail;
