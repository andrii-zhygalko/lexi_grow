import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
      'Password: min 6 letters, 1 number, 7 chars max'
    ),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
