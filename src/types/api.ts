export type Patient = {
  id: number;
  firstName: string;
  lastName: string;
};

export type Prescription = {
  id: number;
  patientId: number;
  medication: string;
  dosage: string;
};