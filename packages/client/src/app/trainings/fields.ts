import { SelectField, TextField } from '../page-layouts/entityCreateEditPage';

export type CreateTrainingDto = {
  visitor_id: number;
  staff_id: number;
  date_of_begin: string;
  date_of_end: string;
};

export type EditTrainingDto = {
  visitor_id: number;
  staff_id: number;
  date_of_begin: string;
  date_of_end: string;
};

export const trainingTextFields: TextField[] = [
  {
    key: 'date_of_begin',
    label: 'Date of Begin',
    placeholder: 'Enter date of begin',
    type: 'datetime-local',
    required: true,
    validation: {
      required: 'Date of begin is required',
    },
  },
  {
    key: 'date_of_end',
    label: 'Date of End',
    placeholder: 'Enter date of end',
    type: 'datetime-local',
    required: true,
    validation: {
      required: 'Date of end is required',
    },
  },
];

export const trainingSelectFields: SelectField[] = [
  {
    key: 'visitor_id',
    label: 'Visitor',
    options: Array.from({ length: 100 }, (_, i) => ({
      label: (i + 1).toString(),
      value: (i + 1).toString(),
    })),
    required: true,
  },
  {
    key: 'staff_id',
    label: 'Staff',
    options: Array.from({ length: 100 }, (_, i) => ({
      label: (i + 1).toString(),
      value: (i + 1).toString(),
    })),
    required: true,
  },
];
