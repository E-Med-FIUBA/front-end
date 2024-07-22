import { Insurance } from './insurance.enum';
import { Sex } from './sex.enum';

export type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  dni: number;
  dateOfBirth: string;
  insurance: Insurance;
  afiliateNumber: number;
  email: string;
  sex: Sex;
};

export type Prescription = {
  id: number;
  patientId: number;
  medication: string;
  dosage: string;
};
