import * as yup from 'yup';

export const loginRule = yup.object({
  email: yup.string().trim().email('Invalid email format').required('Email is required'),
  password: yup.string().trim().required('Password is required'),
});

export type LoginPayload = yup.InferType<typeof loginRule>;
