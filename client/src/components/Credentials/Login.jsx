import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { red } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export const StyledError = styled('p')({
    color: red[900],
    fontWeight: 'light',
    display: 'block'
});

function Register(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { values, errors, handleBlur, handleSubmit, handleChange, touched } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().min(6, "password should contain more than 6 characters").required('Required')
        }),
        onSubmit: async (values, actions) => {
            try {
                const response = await fetch('http://localhost:3001/login', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                });
                const data = await response.json();
                actions.resetForm();
                if (response.ok) {
                    dispatch(setLogin({
                        user: data.user,
                        token: data.token
                    })
                    );
                    toast.success("Welcome");
                    navigate('/home')
                } else {

                    toast.error(data.message)
                }
            } catch (error) {
                toast.error({ message: error.message })
            }
        }
    });

    return (
        <Box sx={{
            width: '400px',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '70px auto 0'

        }}>
            <form onSubmit={handleSubmit}>
                <TextField variant='standard'
                    error={errors.email && touched.email}
                    label='email'
                    id='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ width: '300px', margin: '15px 0' }}

                />
                {errors.email && touched.email ?
                    <StyledError>{errors.email} </StyledError> : ""}

                <TextField variant='standard'
                    type='password'
                    error={errors.password && touched.password}
                    label='password'
                    id='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ width: '300px', margin: '15px 0' }}
                />
                {errors.password && touched.password ?
                    <StyledError >{errors.password} </StyledError> : ""}

                <Button type='submit'
                    variant='contained'
                    color='success'
                    sx={{ marginTop: '50px', display: 'block' }}>
                    Login
                </Button>

                <Box sx={{
                    textAlign: 'center',
                    marginTop: '70px',
                    color: 'blue',
                    cursor: 'pointer'
                }}>
                    <Typography variant='p' color='black'>
                        Don't Have An Account ?
                        <Typography variant='span' onClick={() => props.account(false)} color='primary'> Register </Typography>
                    </Typography>
                </Box>
            </form>
        </Box>
    )
}

export default Register