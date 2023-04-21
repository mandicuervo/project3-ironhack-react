import './Login.css'
import { useFormik } from 'formik';
import { useContext, useEffect } from 'react';
import FormControl from '../../components/FormControl/FormControl';
import Input from '../../components/Input/Input';
import AuthContext from '../../contexts/AuthContext';
import { login as loginService } from '../../services/AuthService'
import { loginSchema } from '../../schemas/loginSchema';
import { useLocation, useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/google-icon.png';

const initialValues = {
    email: '',
    password:'',
}

export default function Login() {
    const { login } = useContext(AuthContext);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser) {
            navigate('/')
        }
    }, [currentUser])

    const {
        values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit, setSubmitting, setFieldError
    } = useFormik({
        initialValues: initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            loginService({ email: values.email, password: values.password }) 
                .then(response => {
                    login(response.accessToken);
                })
                .catch(err => {
                    if (err?.response?.data?.message) {
                      setFieldError('email', err?.response?.data?.message)
                    } else {
                      setFieldError('email', err.message)
                    }
                    setSubmitting(false)
                  })
            //Peticion al back para que devuelva el jwt
        }
    });
    
    const handleOnClick = () => {
        window.location.assign(`${import.meta.env.VITE_SERVER_URL}/auth/google`);
    };

    //useLocation tras el email de register
    const { state } = useLocation();
    if(state) {
        const { emailFromRegister } = state;
        values.email = emailFromRegister;
    } 

    return(
        <div className="Login">
            <form className='form-login' onSubmit={handleSubmit}>
                <FormControl text="Email" error={touched.email && errors.email} htmlFor="email">
                    <Input 
                        id="email"
                        name="email"
                        onChange = { handleChange }
                        onBlur = { handleBlur }
                        value = { values.email }
                        error = { touched.email && errors.email }
                        placeholder = 'Enter your email...'
                        />
                </FormControl>
                <FormControl text="Password" error={ touched.password && errors.password } htmlFor="password">
                    <Input 
                        id="password"
                        name="password"
                        onChange = { handleChange }
                        onBlur = { handleBlur }
                        value = { values.password }
                        error = { touched.password && errors.password }
                        placeholder = 'Enter your password...'
                        type = 'password'
                        />
                </FormControl>

                <button className="btn btn-dark" type="submit" disabled={isSubmitting}>
                    {
                     isSubmitting
                     ? 'Submitting...'
                     : 'Submit'
                    }
                </button>
                <div className="google-button-login" onClick={handleOnClick}>
                    <img className="google-icon-login" src={googleIcon} alt="google icon" />
                    <p>Login</p>
                </div>
            </form>
        </div>
    )
}