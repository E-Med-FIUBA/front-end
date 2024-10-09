import { Sex } from './sex.enum';

export type Patient = {
  id: number;
  name: string;
  lastName: string;
  birthDate: string;
  affiliateNumber: number;
  email: string;
  dni: number;
  insurancePlan: InsurancePlan;
  sex: Sex;
  doctorId: number;
};

export type InsurancePlan = {
  id: number;
  name: string;
  insuranceCompany: InsuranceCompany;
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
};

export type Prescription = {
  id: string;
  duration: number;
  frequency: number;
  drug: Drug;
  doctorId: number;
  patientId: number;
  indication: string;
  patient: Patient;
  quantity: number;
  startDate: string;
  endDate: string;
};
