import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import FormControl from '../../components/FormControl/FormControl'
import Input from '../../components/Input/Input'
import { registerSchema } from "../../schemas/registerSchema"
import { registerService } from "../../services/AuthService"
import googleIcon from '../../assets/google-icon.png';

const initialValues = {
    name: '',
    username: '',
    email: '',
    password: '',
}

export default function Register() {
    const navigate = useNavigate();

    const {
        values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit, setSubmitting, setFieldError
    } = useFormik({
        initialValues: initialValues, 
        validateOnBlur: true, 
        validateOnChange: false, 
        validationSchema: registerSchema,
        onSubmit: (values) => {
            registerService(values)
            .then(res => {
                navigate('/login', { state: { emailFromRegister: res.email } })
            })
            .catch( err => {
                if (err?.response?.data?.message) {
                    let message = err.response.data.message;

                    if(message.includes('email')) {
                        setFieldError('email', message)
                    } else {
                        setFieldError('username', message)
                    }
                } else {
                    setFieldError('email', err.message)
                }                
                setSubmitting(false)
            })
        }
    });

    const handleOnClick = () => {
        window.location.assign(`${VITE_SERVER_URL}/auth/google`);
      }

    return(
        <div className="Register">
            <h1>Create your account</h1>
            <form onSubmit={handleSubmit}>
                <FormControl text='Name' error={touched.name && errors.name} htmlFor='name'>
                    <Input
                        id='name'
                        name='name'
                        onChange = { handleChange }
                        onBlur = { handleBlur }
                        value = { values.name }
                        error = { touched.name && errors.name }
                        placeholder = 'Enter your name...'
                    />
                </FormControl>
                <FormControl text='Username' error={touched.username && errors.username} htmlFor='username'>
                    <Input
                        id='username'
                        name='username'
                        onChange = { handleChange }
                        onBlur = { handleBlur }
                        value = { values.username }
                        error = { touched.username && errors.username }
                        placeholder = 'Enter your username...'
                    />
                </FormControl>
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
            </form>
            <div className="google-button" onClick={handleOnClick}>
                    <img className='google-icon' src={googleIcon} alt="google icon" />
                    <p>Register with Google</p>
            </div>
        </div>
    )
}