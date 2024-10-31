import { useCallback, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { Loader } from '@/components/ui/loader';
import { getPatientNotes } from '@/features/patients/api';
import AddNoteModal from '@/features/patients/components/add-note-modal';
import PatientActions from '@/features/patients/components/patient-actions';
import { PatientNotesList } from '@/features/patients/components/patient-notes-list';
import { useFetch } from '@/hooks/use-fetch';
import { deletePatientNote } from '@/lib/api/patient-notes';
import { getPatient } from '@/lib/api/patients';
import { PatientNote } from '@/types/api';

export function PatientDetailsRoute() {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isNoteDeleteModalOpen, setIsNoteDeleteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<PatientNote | null>(null);
  const { patientId } = useParams();
  if (!patientId) {
    throw new Error('No patient id provided');
  }

  const { data: patient, loading } = useFetch(
    useCallback(() => getPatient(patientId), [patientId]),
  );
  const {
    data: notes,
    loading: loadingNotes,
    refresh: refreshNotes,
  } = useFetch<PatientNote[] | null>(
    useCallback(() => {
      if (!patientId) return Promise.resolve(null);
      return getPatientNotes(patientId);
    }, [patientId]),
  );
  const [setIsModalOpen, setIsDeletionModalOpen, setPatient] =
    useOutletContext<Array<React.Dispatch<React.SetStateAction<unknown>>>>();

  if (loading || loadingNotes) {
    return (
      <div className="col-span-4 flex size-full items-center justify-center xl:col-span-3">
        <Loader size={60} />
      </div>
    );
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
          setIsNoteModalOpen={setIsNoteModalOpen}
          setPatient={() => setPatient(patient)}
        />
      </div>

      <PatientNotesList
        data={notes ?? []}
        openEditModal={(note) => {
          setPatient(patient);
          setSelectedNote(note);
          setIsNoteModalOpen(true);
        }}
        openDeleteModal={(note) => {
          setPatient(patient);
          setSelectedNote(note);
          setIsNoteDeleteModalOpen(true);
        }}
      />

      <AddNoteModal
        open={isNoteModalOpen}
        setOpen={setIsNoteModalOpen}
        patient={patient}
        setPatient={setPatient}
        refreshNotes={refreshNotes}
        note={selectedNote}
        setNote={setSelectedNote}
      />
      <ConfirmationDialog
        title="¿Estás seguro que deseas eliminar esta nota?"
        confirmText="Eliminar"
        confirmVariant={'destructive'}
        description="Esta acción no se puede deshacer. Todos los datos relacionados con esta nota se eliminarán."
        open={isNoteDeleteModalOpen}
        setOpen={setIsNoteDeleteModalOpen}
        onConfirm={async () => {
          if (!selectedNote) return;
          try {
            await deletePatientNote(selectedNote.id);
            await refreshNotes();
            setIsNoteDeleteModalOpen(false);
          } catch (error) {
            toast.error('Error al eliminar la nota');
          }
          setSelectedNote(null);
          setPatient(null);
        }}
        onCancel={() => setPatient(null)}
      />
    </div>
  );
}
