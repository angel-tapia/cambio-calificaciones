import React, { useState } from 'react';
import {
  Stack,
  TextField,
  Text,
  IStackTokens,
  IStackStyles,
  PrimaryButton,
  DefaultButton,
  Dialog,
  DialogType,
  DialogFooter,
} from '@fluentui/react';
import { Alumno, MateriaAlumnos, Profesor } from 'src/models';
import { createPdf } from 'src/endpoints/createPdf';
import { saveAs } from 'file-saver';
import { getTitleAndNameByDepartment } from 'src/utils/academiaProfesores';

const stackTokensVertical: IStackTokens = {
  childrenGap: 20,
};

const stackTokensHorizontal: IStackTokens = {
  childrenGap: 20,
};

const stackStyles: IStackStyles = {
  root: {
    width: '100%',
    maxWidth: 600,
    margin: '0 auto',
    padding: 20,
    boxShadow: '0 0 10px rgba(0, 0, 0)',
    borderRadius: 5,
    backgroundColor: 'white',
  },
};

const outerStackStyles: IStackStyles = {
  root: {
    height: '70vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

type StudentData = {
  alumno: Alumno;
  calificacionIncorrecta: string;
  calificacionCorrecta: string;
  motivo: string;
  errorCalificacionIncorrecta?: string;
  errorCalificacionCorrecta?: string;
};

type Props = {
  alumnos: Alumno[];
  materiaAlumno: MateriaAlumnos;
  plan: string;
  profesor: Profesor;
  academia: string;
};

const ChangeRequest: React.FC<Props> = ({
  alumnos,
  materiaAlumno,
  plan,
  profesor,
  academia,
}) => {
  // Initialize state for each student
  const [studentData, setStudentData] = useState<StudentData[]>(
    alumnos.map((alumno) => ({
      alumno,
      calificacionIncorrecta: '',
      calificacionCorrecta: '',
      motivo: '',
    }))
  );

  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  const validateCalificacionIncorrecta = (calificacion: string) => {
    if (!calificacion) {
      return 'Calificación es requerida.';
    }

    if (isNaN(parseInt(calificacion))) {
      return 'Calificación debe ser un número.';
    }

    if (parseInt(calificacion) < 0 || parseInt(calificacion) > 100) {
      return 'Calificación debe estar entre 0 y 100.';
    }

    return undefined;
  };

  const validateCalificacionCorrecta = (calificacion: string) => {
    if (!calificacion) {
      return 'Calificación es requerida.';
    }

    if (isNaN(parseFloat(calificacion))) {
      return 'Calificación debe ser un número.';
    }

    if (parseInt(calificacion) < 0 || parseInt(calificacion) > 100) {
      return 'Calificación debe estar entre 0 y 100.';
    }

    return undefined;
  };

  const handleConfirm = async () => {
    try {
      // Generate PDFs for each student
      for (const data of studentData) {
        const response = await createPdf(
          data.alumno,
          materiaAlumno,
          plan,
          profesor,
          data.calificacionIncorrecta,
          data.calificacionCorrecta,
          data.motivo,
          academia,
          getTitleAndNameByDepartment(academia)!
        );
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(pdfBlob, `solicitud_cambio_${data.alumno.Matricula}.pdf`);
      }
      setIsDialogVisible(false);
    } catch (error: any) {
      throw new Error('Error generating PDF: ' + error.message);
    }
  };

  return (
    <Stack styles={outerStackStyles}>
      <Stack styles={stackStyles} tokens={stackTokensVertical}>
        <Text
          style={{ fontWeight: 'bold', textAlign: 'center' }}
          variant="xLarge"
        >
          Solicitud de cambio
        </Text>
        {studentData.map((data, index) => (
          <Stack key={data.alumno.Matricula} tokens={stackTokensVertical}>
            <Stack tokens={stackTokensVertical}>
              <Stack horizontal tokens={stackTokensHorizontal}>
                <Text style={{ fontWeight: 'bold' }}>Alumno:</Text>
                <Text>
                  {data.alumno.Nombre} ({data.alumno.Matricula})
                </Text>
              </Stack>

              <Stack horizontal tokens={stackTokensHorizontal}>
                <Text style={{ fontWeight: 'bold' }}>Materia:</Text>
                <Text>
                  {materiaAlumno.NombreMateria} (Clave:{' '}
                  {materiaAlumno.ClaveMateria}, Grupo: {materiaAlumno.Grupo})
                </Text>
              </Stack>
              <Stack horizontal tokens={stackTokensHorizontal}>
                <Text style={{ fontWeight: 'bold' }}>Profesor:</Text>
                <Text>
                  {profesor.NombreMaestro} ({profesor.EmployeeId})
                </Text>
              </Stack>
              <Stack horizontal tokens={stackTokensHorizontal}>
                <Text style={{ fontWeight: 'bold' }}>
                  Coordinador Academia:
                </Text>
                <Text>{getTitleAndNameByDepartment(academia)}</Text>
              </Stack>
              <Stack horizontal tokens={stackTokensHorizontal}>
                <Text style={{ fontWeight: 'bold' }}>Oportunidad:</Text>
                <Text>{data.alumno.Oportunidad}</Text>
              </Stack>
            </Stack>
            <Stack horizontal tokens={stackTokensHorizontal}>
              <TextField
                label="Calificación Incorrecta"
                value={data.calificacionIncorrecta}
                onChange={(_, newValue) => {
                  const error = validateCalificacionIncorrecta(newValue || '');
                  const newStudentData = [...studentData];
                  newStudentData[index] = {
                    ...newStudentData[index],
                    calificacionIncorrecta: newValue || '',
                    errorCalificacionIncorrecta: error,
                  };
                  setStudentData(newStudentData);
                }}
                errorMessage={data.errorCalificacionIncorrecta}
              />
              <TextField
                label="Calificación Correcta"
                value={data.calificacionCorrecta}
                onChange={(_, newValue) => {
                  const error = validateCalificacionCorrecta(newValue || '');
                  const newStudentData = [...studentData];
                  newStudentData[index] = {
                    ...newStudentData[index],
                    calificacionCorrecta: newValue || '',
                    errorCalificacionCorrecta: error,
                  };
                  setStudentData(newStudentData);
                }}
                errorMessage={data.errorCalificacionCorrecta}
              />
            </Stack>
            <TextField
              label="Motivo"
              multiline
              rows={4}
              value={data.motivo}
              onChange={(_, newValue) => {
                const newStudentData = [...studentData];
                newStudentData[index].motivo = newValue || '';
                setStudentData(newStudentData);
              }}
            />
            <hr />
          </Stack>
        ))}
        <PrimaryButton
          onClick={() => {
            // Validate data for all students
            let hasError = false;
            const newStudentData = studentData.map((data) => {
              const errorCalificacionIncorrecta =
                validateCalificacionIncorrecta(data.calificacionIncorrecta);
              const errorCalificacionCorrecta = validateCalificacionCorrecta(
                data.calificacionCorrecta
              );
              if (
                errorCalificacionIncorrecta ||
                errorCalificacionCorrecta ||
                !data.motivo
              ) {
                hasError = true;
              }
              return {
                ...data,
                errorCalificacionIncorrecta,
                errorCalificacionCorrecta,
              };
            });
            setStudentData(newStudentData);

            if (hasError) {
              return;
            }

            setIsDialogVisible(true);
          }}
        >
          Enviar solicitud
        </PrimaryButton>
      </Stack>
      <Dialog
        hidden={!isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: '¿Está seguro de solicitar estos cambios?',
          closeButtonAriaLabel: 'Cerrar',
        }}
        modalProps={{
          isBlocking: true,
        }}
      >
        <Stack tokens={stackTokensVertical}>
          {studentData.map((data) => (
            <Stack key={data.alumno.Matricula} tokens={stackTokensVertical}>
              <Text>
                Alumno: {data.alumno.Nombre} ({data.alumno.Matricula})
              </Text>
              <Text>
                Calificación Incorrecta: {data.calificacionIncorrecta}
              </Text>
              <Text>Calificación Correcta: {data.calificacionCorrecta}</Text>
              <Text style={{ wordBreak: 'break-word' }}>
                Motivo: {data.motivo}
              </Text>
              <br />
            </Stack>
          ))}
          <DialogFooter>
            <DefaultButton
              onClick={() => setIsDialogVisible(false)}
              text="Cancelar"
            />
            <PrimaryButton onClick={handleConfirm} text="Confirmar" />
          </DialogFooter>
        </Stack>
      </Dialog>
    </Stack>
  );
};

export default ChangeRequest;
