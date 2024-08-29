import { MateriaAlumnos } from 'src/models/materia';
import dataPlan420 from '../data/Listas 420.json';
import dataPlan430 from '../data/Listas 430.json';
import dataPlan440 from '../data/Listas 440.json';

export function getMateriaByKeyAndGroup420(
  Key: string,
  Group: string
): MateriaAlumnos | undefined {
  if (Group.length === 2) {
    Group = '0' + Group;
  }

  return dataPlan420.find((materia: MateriaAlumnos) => {
    return materia.ClaveMateria === Key && materia.Grupo === Group;
  });
}

export function getMateriaByKeyAndGroup430(
  Key: string,
  Group: string
): MateriaAlumnos | undefined {
  if (Group.length === 2) {
    Group = '0' + Group;
  }
  console.log(Key + ' ' + Group);
  return dataPlan430.find((materia: MateriaAlumnos) => {
    console.log('Checking: ' + materia.ClaveMateria + ' ' + materia.Grupo);
    return materia.ClaveMateria === Key && materia.Grupo === Group;
  });
}

export function getMateriaByKeyAndGroup440(
  Key: string,
  Group: string
): MateriaAlumnos | undefined {
  if (Group.length === 2) {
    Group = '0' + Group;
  }

  return dataPlan440.find((materia: MateriaAlumnos) => {
    return materia.ClaveMateria === Key && materia.Grupo === Group;
  });
}
