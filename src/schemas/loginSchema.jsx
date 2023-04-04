import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup
        .string('Email should be a string')
        .email('Invalid email')
        .required('Email is required'),
    password: Yup
        .string('Email should be a string')
        .min(8, 'Password should have at least 8 characters')
        .required('Password is required')
})