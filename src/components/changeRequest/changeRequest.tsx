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
  const [motivo, setMotivo] = useState<string>('');
  const [calificacionesIncorrectas, setCalificacionesIncorrectas] = useState<
    Record<string, string>
  >({});
  const [calificacionesCorrectas, setCalificacionesCorrectas] = useState<
    Record<string, string>
  >({});
  const [errorCalificacionIncorrecta, setErrorCalificacionIncorrecta] =
    useState<string | undefined>(undefined);
  const [errorCalificacionCorrecta, setErrorCalificacionCorrecta] = useState<
    string | undefined
  >(undefined);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  const validateCalificacion = (calificacion: string) => {
    if (!calificacion) {
      return 'Calificación es requerida.';
    }

    if (materiaAlumno.NombreMateria === 'Servicio social') {
      return calificacion !== 'CU' && calificacion !== 'NC'
        ? 'Calificación debe ser "CU" o "NC".'
        : undefined;
    } else {
      if (isNaN(parseInt(calificacion)) && calificacion !== 'NP') {
        return 'Calificación debe ser NP o un número.';
      }

      if (parseInt(calificacion) < 0 || parseInt(calificacion) > 100) {
        return 'Calificación debe estar entre 0 y 100.';
      }
    }

    return undefined;
  };

  const handleConfirm = async () => {
    try {
      const response = await createPdf(
        alumnos,
        materiaAlumno,
        plan,
        profesor,
        calificacionesIncorrectas,
        calificacionesCorrectas,
        motivo,
        academia,
        getTitleAndNameByDepartment(academia)!
      );
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(pdfBlob, 'solicitud_cambio.pdf');
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
        <Stack tokens={stackTokensVertical}>
          <Stack horizontal tokens={stackTokensHorizontal}>
            <Text style={{ fontWeight: 'bold' }}>Materia:</Text>
            <Text>
              {materiaAlumno.NombreMateria} (Clave: {materiaAlumno.ClaveMateria}
              , Grupo: {materiaAlumno.Grupo})
            </Text>
          </Stack>
          <Stack horizontal tokens={stackTokensHorizontal}>
            <Text style={{ fontWeight: 'bold' }}>Profesor:</Text>
            <Text>
              {profesor.NombreMaestro} ({profesor.EmployeeId})
            </Text>
          </Stack>
          <Stack horizontal tokens={stackTokensHorizontal}>
            <Text style={{ fontWeight: 'bold' }}>Coordinador Academia:</Text>
            <Text>{getTitleAndNameByDepartment(academia)}</Text>
          </Stack>
          <Stack horizontal tokens={stackTokensHorizontal}>
            <Text style={{ fontWeight: 'bold' }}>Oportunidad:</Text>
            <Text>{alumnos[0].Oportunidad}</Text>
          </Stack>
        </Stack>
        {alumnos.map((alumno) => (
          <Stack key={alumno.Matricula} tokens={stackTokensVertical}>
            <Stack horizontal tokens={stackTokensHorizontal}>
              <Text style={{ fontWeight: 'bold' }}>Alumno:</Text>
              <Text>
                {alumno.Nombre} ({alumno.Matricula})
              </Text>
            </Stack>
            <Stack horizontal tokens={stackTokensHorizontal}>
              <TextField
                label="Calificación Incorrecta"
                onChange={(_, newValue) => {
                  setErrorCalificacionIncorrecta(
                    validateCalificacion(newValue || '')
                  );
                  setCalificacionesIncorrectas((prev) => ({
                    ...prev,
                    [alumno.Matricula]: newValue || '',
                  }));
                }}
                errorMessage={errorCalificacionIncorrecta}
                value={calificacionesIncorrectas[alumno.Matricula] || ''}
              />
              <TextField
                label="Calificación Correcta"
                onChange={(_, newValue) => {
                  setErrorCalificacionCorrecta(
                    validateCalificacion(newValue || '')
                  );
                  setCalificacionesCorrectas((prev) => ({
                    ...prev,
                    [alumno.Matricula]: newValue || '',
                  }));
                }}
                errorMessage={errorCalificacionCorrecta}
                value={calificacionesCorrectas[alumno.Matricula] || ''}
              />
            </Stack>
          </Stack>
        ))}
        <TextField
          label="Motivo"
          multiline
          rows={4}
          onChange={(_, newValue) => {
            setMotivo(newValue || '');
          }}
        />
        <PrimaryButton
          onClick={() => {
            if (
              !calificacionesCorrectas ||
              !calificacionesIncorrectas ||
              !motivo ||
              errorCalificacionCorrecta ||
              errorCalificacionIncorrecta
            ) {
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
          styles: {
            main: {
              width: '500px',
              maxWidth: '80vw',
              maxHeight: '80vh',
            },
          },
        }}
      >
        <Stack tokens={stackTokensVertical}>
          {alumnos.map((alumno) => (
            <Stack key={alumno.Matricula} tokens={stackTokensVertical}>
              <Text>
                Alumno: {alumno.Nombre} ({alumno.Matricula})
              </Text>
              <Stack horizontal tokens={stackTokensHorizontal}>
                <Text>
                  Calificación Incorrecta:{' '}
                  {calificacionesIncorrectas[alumno.Matricula]}
                </Text>
                <Text>
                  Calificación Correcta:{' '}
                  {calificacionesCorrectas[alumno.Matricula]}
                </Text>
              </Stack>
            </Stack>
          ))}
          <Text style={{ wordBreak: 'break-word' }}>Motivo: {motivo}</Text>
        </Stack>
        <DialogFooter>
          <DefaultButton
            onClick={() => setIsDialogVisible(false)}
            text="Cancelar"
          />
          <PrimaryButton onClick={handleConfirm} text="Confirmar" />
        </DialogFooter>
      </Dialog>
    </Stack>
  );
};

export default ChangeRequest;
