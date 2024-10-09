import { Sex } from './sex.enum';

export type Patient = {
  id: number;
  name: string;
  lastName: string;
  birthDate: string;
  afiliateNumber: number;
  email: string;
  dni: number;
  insurance: InsurancePlan;
  sex: Sex;
  doctorId: number;
};

export type InsurancePlan = {
  id: number;
  name: string;
  company: InsuranceCompany;
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
