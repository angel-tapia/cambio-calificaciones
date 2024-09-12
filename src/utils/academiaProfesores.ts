function getTitleAndNameByDepartment(department: string): string | null {
  const departmentMapping: { [key: string]: string } = {
    LM: 'Dra. María Esther Grimaldo Reyna',
    LF: 'Dr. Omar González Amezcua',
    LCC: 'Dra. Perla Marlene Viera González',
    LA: 'MEA Abigail Contreras Mendoza',
    LSTI: 'Dr. Guillermo Ezequiel Sanchez Guerrero',
    LMAD: 'M.C. Adriana Guadalupe Garza Alvarez',
    FOGU: 'M.A. Lázaro Treviño Castillo',
  };

  return departmentMapping[department] || null;
}

export { getTitleAndNameByDepartment };
