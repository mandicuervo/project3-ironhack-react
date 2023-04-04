import * as Yup from 'yup';

export const registerSchema = Yup.object({
    name: Yup
        .string('Name should be a string')
        .required('Name is required'),
    username: Yup
        .string('Username should be a string')
        .required('Username is required'),
    email: Yup
        .string('Email should be a string')
        .email('Invalid email')
        .required('Email is required'),
    password: Yup
        .string('Password should be a string')
        .min(8, 'Password should have at least 8 characters')
        .required('Password is required')
})