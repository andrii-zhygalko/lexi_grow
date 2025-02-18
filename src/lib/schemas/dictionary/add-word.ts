import * as yup from 'yup';
import { WordCategory } from '@/lib/types/dictionary';

export const addWordSchema = yup.object().shape({
  en: yup
    .string()
    .required('Word is required')
    .min(2, 'Word must be at least 2 characters')
    .max(50, 'Word must be at most 50 characters')
    .matches(
      /^(?!.*--)(?!^-)(?!.*-$)[\p{L}\p{M}\s\-]+$/u,
      'Please enter a valid word'
    ),
  ua: yup
    .string()
    .required('Translation is required')
    .min(2, 'Translation must be at least 2 characters')
    .max(50, 'Translation must be at most 50 characters')
    .matches(
      /^(?!.*--)(?!^-)(?!.*-$)[\p{L}\p{M}\s\-]+$/u,
      'Please enter a valid translation'
    ),
  category: yup
    .string()
    .nullable()
    .required('Category is required') as yup.Schema<WordCategory | null>,
  isIrregular: yup.boolean().when('category', {
    is: 'verb',
    then: (schema) =>
      schema.required('Please select verb type').transform((value) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
      }),
    otherwise: (schema) => schema.optional(),
  }),
});

export type AddWordFormData = yup.InferType<typeof addWordSchema>;
