import { Sex } from '@/types/sex.enum';

const SEX_MAP = {
  [Sex.MALE]: 'Masculino',
  [Sex.FEMALE]: 'Femenino',
  [Sex.OTHER]: 'Otro',
};

export const parseSex = (sex: Sex) => {
  const sexString = SEX_MAP[sex];

  return sexString ?? 'Desconocido';
};
