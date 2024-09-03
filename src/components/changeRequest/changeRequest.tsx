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
import { createPdf } from 'src/hooks/createPdf';
import { saveAs } from 'file-saver';

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
  alumno: Alumno;
  materiaAlumno: MateriaAlumnos;
  profesor: Profesor;
};

const ChangeRequest: React.FC<Props> = ({
  alumno,
  materiaAlumno,
  profesor,
}) => {
  const [calificacionIncorrecta, setCalificacionIncorrecta] =
    useState<string>('');
  const [calificacionCorrecta, setCalificacionCorrecta] = useState<string>('');
  const [motivo, setMotivo] = useState<string>('');
  const [errorCalificacionIncorrecta, setErrorCalificacionIncorrecta] =
    useState<string | undefined>(undefined);
  const [errorCalificacionCorrecta, setErrorCalificacionCorrecta] = useState<
    string | undefined
  >(undefined);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  const validateCalificacion = (calificacion: string) => {
    if (!calificacion) {
      return 'Calificación es requerida';
    }

    if (isNaN(parseFloat(calificacion))) {
      return 'Calificación debe ser un número';
    }

    if (parseFloat(calificacion) < 0 || parseFloat(calificacion) > 100) {
      return 'Calificación debe estar entre 0 y 100';
    }

    return undefined;
  };

  const handleConfirm = async () => {
    try {
      const response = await createPdf(
        alumno,
        materiaAlumno,
        profesor,
        calificacionIncorrecta,
        calificacionCorrecta,
        motivo
      );
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(pdfBlob, 'solicitud_cambio.pdf');
      setIsDialogVisible(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
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
            <Text style={{ fontWeight: 'bold' }}>Alumno:</Text>
            <Text>
              {alumno.Nombre} ({alumno.Matricula})
            </Text>
          </Stack>

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
            <Text style={{ fontWeight: 'bold' }}>Oportunidad:</Text>
            <Text>{alumno.Oportunidad}</Text>
          </Stack>
        </Stack>
        <Stack horizontal tokens={stackTokensHorizontal}>
          <TextField
            label="Calificación Incorrecta"
            onChange={(_, newValue) => {
              setErrorCalificacionIncorrecta(
                validateCalificacion(newValue || '')
              );
              setCalificacionIncorrecta(newValue || '');
            }}
            errorMessage={errorCalificacionIncorrecta}
          />
          <TextField
            label="Calificación Correcta"
            onChange={(_, newValue) => {
              setErrorCalificacionCorrecta(
                validateCalificacion(newValue || '')
              );
              setCalificacionCorrecta(newValue || '');
            }}
            errorMessage={errorCalificacionCorrecta}
          />
        </Stack>
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
              !calificacionCorrecta ||
              !calificacionIncorrecta ||
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
        }}
      >
        <Stack tokens={stackTokensVertical}>
          <Text>Calificación Incorrecta: {calificacionIncorrecta}</Text>
          <Text>Calificación Correcta: {calificacionCorrecta}</Text>
          <Text style={{ wordBreak: 'break-word' }}>Motivo: {motivo}</Text>
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
