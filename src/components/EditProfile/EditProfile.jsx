import { useFormik } from "formik";
import FormControl from '../../components/FormControl/FormControl'
import Input from '../../components/Input/Input'
import { registerSchema } from "../../schemas/registerSchema";
import AuthContext from "../../contexts/AuthContext";

const initialValues = {
    name: '',
    password: '',
    bio: ''
}

export default function EditProfile() {

    const {
        values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit, setSubmitting, setFieldError
    } = useFormik({
        initialValues: initialValues, 
        validateOnBlur: true, 
        validateOnChange: false, 
        validationSchema: registerSchema,
        })
    return(
        <div className="EditProfile">
            <div className="title-profile">
                <h3>Edit My Personal Information</h3>
                <p><strong>Be carefull, you'll replace your current information</strong></p>
            </div>
            <div className="content-form-profile">
                <form>
                    <FormControl text='Name' error={touched.name && errors.name} htmlFor='name'>
                        <Input
                            id='name'
                            name='name'
                            onChange = { handleChange }
                            onBlur = { handleBlur }
                            value = { values.name }
                            error = { touched.name && errors.name }
                            placeholder = 'Choose your name...'
                        />
                    </FormControl>
                    <FormControl text='Password' error={touched.password && errors.password} htmlFor='password'>
                        <Input
                            id='password'
                            password='password'
                            onChange = { handleChange }
                            onBlur = { handleBlur }
                            value = { values.password }
                            error = { touched.password && errors.password }
                            placeholder = 'Choose your password...'
                        />
                    </FormControl>
                    <FormControl text='Bio' error={touched.bio && errors.bio} htmlFor='bio'>
                        <Input
                            id='bio'
                            bio='bio'
                            onChange = { handleChange }
                            onBlur = { handleBlur }
                            value = { values.bio }
                            error = { touched.bio && errors.bio }
                            placeholder = 'Choose your bio...'
                        />
                    </FormControl>
                    
                </form>
            </div>

        </div>
    )
}