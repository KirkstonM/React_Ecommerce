import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { StyledError } from './Login';
import { toast } from 'react-toastify';


function Register(props) {

    const { values, errors, handleBlur, handleSubmit, handleChange, touched } = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2, "name should contain more than 2 characters").required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().min(6, "password should contain more than 6 characters").required('Required')
        }),
        onSubmit: async (values, actions) => {
            try {
                const response = await fetch("http://localhost:3001/register", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values)
                });
                const data = await response.json();
                toast.success(data.message)
                actions.resetForm();
                props.account(true)
            } catch (error) {

            }
        }
    });

    return (
        <Box
            sx={{
                width: '400px',
                height: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '70px auto 0'
            }}
        >
            <form onSubmit={handleSubmit}>
                <TextField variant='standard'
                    error={errors.name && touched.name}
                    label='name'
                    id='name'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ width: '300px', margin: '15px 0' }}
                />

                {errors.name && touched.name ?
                    <StyledError> {errors.name} </StyledError> : ""}
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
                    <StyledError> {errors.email} </StyledError> : ""}

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
                    <StyledError> {errors.password} </StyledError> : ""}

                <Button type='submit'
                    variant='contained'
                    color='success'
                    sx={{ marginTop: '50px', display: 'block' }}>
                    Register
                </Button>

                <Box
                    sx={{
                        textAlign: 'center',
                        marginTop: '70px',
                        color: 'blue',
                        cursor: 'pointer'
                    }}
                >
                    <Typography variant='p' color='black'>
                        Already Have An Account ?
                        <Typography variant='span' onClick={() => props.account(true)} color='primary'> Login </Typography>
                    </Typography>
                </Box>
            </form>
        </Box>
    )
}

export default Register