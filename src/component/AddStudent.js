import { Alert, AlertTitle, Button, Dialog, DialogTitle, Stack, TextField } from '@mui/material'
import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';

export default function AddStaff() {

    const [open, setOpen] = useState(false);
     const handleClose = () => {
        setOpen(false);
     }

    const URL = 'https://654660b7fe036a2fa95595d6.mockapi.io/student';

    const formik = useFormik({
        initialValues: {
            name: "",
            image: "",
            gender: "",
            dateofbirth: "",
            feedback: ""
        },

        onSubmit: (values) => {
            values.createdAt = new Date(values.createdAt);
            axios.post(URL, values)
                .then(
                    response => {
                        return response.data;
                    }
                )
                .then(data=> setOpen(true))
                .catch(error => console.log(error.message));
        },

        validationSchema: Yup.object({
            name: Yup.string().required("Required").min(3, "Must be more 2 characters"),
            // age: Yup.number().required("Required").typeError("Please enter a valid number"),
            // address: Yup.string().required("required").typeError("Please enter a address"),
            image: Yup.string().url().required("Required").typeError("Please enter a valid url"),
            gender: Yup.boolean().required("Required").typeError("Please enter a true(male), false(female)"),
            dateofbirth: Yup.string().required("Required").typeError("Please enter a valid date"),
            feedback: Yup.string()
            // createdAt: Yup.date().required("Required").typeError("Please enter date")
        })
    });

    return (
        <div style={{ border: '1px solid', marginTop: '100px', display: 'inline-block', marginLeft: '450px', borderRadius: '30px' }}>
            <h1 style={{ fontSize: '50px', display: 'flex', justifyContent: 'center' }}>Add new student</h1>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={3} style={{ margin: '0 30px' }} >
                    <TextField
                        style={{ width: '600px' }}
                        label="Name"
                        name='name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name} />
                    <TextField
                        style={{ width: '600px' }}
                        label="Gender"
                        name='gender'
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                        helperText={formik.touched.gender && formik.errors.gender} />
                    <TextField
                        style={{ width: '600px' }}
                        label="Image"
                        name='image'
                        value={formik.values.image}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.image && Boolean(formik.errors.image)}
                        helperText={formik.touched.image && formik.errors.image} />
                        <TextField
                        style={{ width: '600px' }}
                        label="Date of birth"
                        name='dateofbirth'
                        value={formik.values.dateofbirth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.dateofbirth && Boolean(formik.errors.dateofbirth)}
                        helperText={formik.touched.dateofbirth && formik.errors.dateofbirth} />
                    <TextField
                        style={{ width: '600px' }}
                        label="Feedback"
                        name='feedback'
                        value={formik.values.feedback}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.feedback && Boolean(formik.errors.feedback)}
                        helperText={formik.touched.feedback && formik.errors.feedback} />
                    <Button style={{ width: '150px', marginBottom: '50px', marginLeft: '230px' }} variant='contained' type='submit'>Create</Button>
                </Stack>

            </form>

            <Dialog open={open} onClose={handleClose}>
                <Alert severity='success'>
                    <AlertTitle>Adding Successfully</AlertTitle>
                </Alert>
                <Button onClick={handleClose}>Close</Button>
            </Dialog>
        </div>
    )
}
