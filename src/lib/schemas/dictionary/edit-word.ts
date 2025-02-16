import * as yup from 'yup';

export const editWordSchema = yup.object().shape({
  en: yup
    .string()
    .required('English word is required')
    .matches(
      /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/,
      'Please enter a valid English word'
    ),
  ua: yup
    .string()
    .required('Ukrainian word is required')
    .matches(
      /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
      'Please enter a valid Ukrainian word'
    ),
});
