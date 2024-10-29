import { useCallback } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import PatientActions from '@/features/patients/components/patient-actions';
import { PatientNotesList } from '@/features/patients/components/patient-notes-list';
import { useFetch } from '@/hooks/use-fetch';
import { getPatient } from '@/lib/api/patients';

export function PatientDetailsRoute() {
  const { patientId } = useParams();
  if (!patientId) {
    throw new Error('No patient id provided');
  }

  const { data: patient, loading } = useFetch(
    useCallback(() => getPatient(patientId), [patientId]),
  );
  const [setIsModalOpen, setIsDeletionModalOpen, setPatient] =
    useOutletContext<Array<React.Dispatch<React.SetStateAction<unknown>>>>();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div className="col-span-4 flex h-full flex-col gap-4 xl:col-span-3">
      <div className="flex justify-between rounded-md border bg-card p-2">
        <div>
          <h2 className="text-xl font-semibold">
            {patient.name} {patient.lastName}
          </h2>

          <p className="mt-2 text-sm">DNI: {patient.dni}</p>
          <p className="mt-2 text-sm">
            Fecha de nacimiento: {patient.birthDate}
          </p>
          <p className="mt-2 text-sm">Sexo: {patient.sex}</p>
          <p className="mt-2 text-sm">
            Obra social: {patient.insuranceCompany.name}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{patient.email}</p>
        </div>
        <PatientActions
          setIsModalOpen={setIsModalOpen}
          setIsDeletionModalOpen={setIsDeletionModalOpen}
          setPatient={() => setPatient(patient)}
        />
      </div>

      <PatientNotesList data={[]} />
    </div>
  );
}
