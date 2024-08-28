import { ShimmeredDetailsList } from '@fluentui/react/lib/ShimmeredDetailsList';
import { IColumn } from '@fluentui/react/lib/DetailsList';
import { IStackTokens, Stack, Text } from '@fluentui/react';

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
  claveMateria: `Dummy ${index}`,
  nombreMateria: `Subject ${index}`,
  grupo: `G${index}`,
  plan: `Plan ${index}`,
}));

const SubjectDetail = () => {
  return (
    <Stack tokens={stackTokens}>
      <Text variant="xLarge">Professor Name: John Doe</Text>
      <Text variant="large">Employee ID: 123456</Text>
      <ShimmeredDetailsList
        items={items}
        columns={columns}
        layoutMode={1}
        enableShimmer={false}
      />
    </Stack>
  );
};

export default SubjectDetail;
