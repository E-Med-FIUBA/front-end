import { Sex } from './sex.enum';

export type Patient = {
  id: number;
  name: string;
  lastName: string;
  birthDate: string;
  affiliateNumber: number;
  email: string;
  dni: number;
  insuranceCompany: InsuranceCompany;
  sex: Sex;
  doctorId: number;
};

export type InsuranceCompany = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  uid: string;
  name: string;
  lastName: string;
  email: string;
  dni: number;
  doctor?: Doctor;
};

export type Doctor = {
  id: number;
  specialtyId: number;
  specialty: Specialty;
  license: number;
  user: User;
};

export type Specialty = {
  id: number;
  name: string;
};

export type Drug = {
  id: number;
  name: string;
  description: string;
  presentations?: Presentation[];
  atc: string;
};

export type Presentation = {
  id: number;
  name: string;
  drugId: number;
  drug?: Drug;
  form: string;
  administration: string;
};

export type Prescription = {
  id: string;
  presentation: Presentation;
  doctorId: number;
  patientId: number;
  indication: string;
  patient: Patient;
  quantity: number;
  emitedAt: string;
  used: boolean;
};

export type PatientNote = {
  id: number;
  note: string;
  patientId: number;
  patient: Patient;
  createdAt: string;
  updatedAt: string;
};
