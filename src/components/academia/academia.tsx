import {
  IColumn,
  IStackTokens,
  ShimmeredDetailsList,
  Stack,
  Text,
} from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { getMaterias } from 'src/hooks/getMaterias';
import { MateriaProfesor } from 'src/models';
import { Profesor } from 'src/models/profesor';
import { getTitleAndNameByDepartment } from 'src/utils/academiaProfesores';
import UserDetail from '../userDetail/userDetail';

const stackTokens: IStackTokens = {
  childrenGap: 20,
  padding: 20,
};

const columns: IColumn[] = [
  {
    key: 'Academia',
    name: 'Academia',
    fieldName: 'Academia',
    minWidth: 100,
    maxWidth: 150,
  },
  {
    key: 'NombreCoordinador',
    name: 'Nombre Coordinador',
    fieldName: 'NombreCoordinador',
    minWidth: 300,
    maxWidth: 600,
  },
];

type Props = {
  employeeId: string;
};

const Academia: React.FC<Props> = ({ employeeId }) => {
  const [selectedAcademia, setSelectedAcademia] = useState<string>('');
  const [profesor, setProfesor] = useState<Profesor | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<
    { Academia: string; NombreCoordinador: string | null }[]
  >([]);

  console.log(selectedAcademia);
  console.log(profesor);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await getMaterias(employeeId);
        setProfesor(response.data);

        if (response.data?.Materias) {
          const academias = Array.from(
            new Set(
              response.data.Materias.map(
                (materia: MateriaProfesor) => materia.Academia
              )
            )
          );

          const updatedItems = academias.map((academia) => ({
            Academia: academia,
            NombreCoordinador: getTitleAndNameByDepartment(academia),
          }));

          setItems(updatedItems);
        }
      } catch (error) {
        console.error('There was an error fetching the materias!', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaterias();
  }, [employeeId]);

  if (isLoading) {
    return <Text variant="xLarge">Loading...</Text>;
  }

  if (selectedAcademia) {
    return <UserDetail employeeId={employeeId} academia={selectedAcademia} />;
  }

  return (
    <Stack tokens={stackTokens}>
      <Text variant="xLarge">Acadiemias</Text>
      <Text variant="large">Seleccione una academia:</Text>
      <ShimmeredDetailsList
        items={items}
        columns={columns}
        setKey="set"
        layoutMode={0}
        enableShimmer={isLoading}
        onItemInvoked={(item) => setSelectedAcademia(item.Academia)}
      />
    </Stack>
  );
};

export default Academia;
