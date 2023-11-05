import { Alert, AlertTitle, Button, Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';

export default function Dashboard() {

    const URL = 'https://654660b7fe036a2fa95595d6.mockapi.io/student';
    const [APIData, setAPIData] = useState([]);
    const [deleteId, setDeleteId] = useState(-1);
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    // useEffect(() => {
    //     fetch(URL, { method: "GET" })
    //         .then(
    //             response => {
    //                 if (!response.ok) {
    //                     throw new Error(`HTTP status: ${response.status}`);
    //                 }
    //                 return response.json();
    //             }
    //         )
    //         .then(data => setAPIData(data))
    //         .catch(error => console.log(error.message));
    // }, [])

    useEffect(() => {
        loadStaffs();
    }, [])

    console.log(APIData);

    const showConfirmDel = (staffId) => {
        setDeleteId(staffId);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const deleteStaff = () => {
        setOpen(false);
        axios.delete(URL + `/${deleteId}`)
        .then(
            response => {
                return response.data;
            }
        )
        .then(setOpenSuccess(true))
        .catch(error => console.log(error.message))
    }

    const handleOk = () => {
        setOpenSuccess(false);
        loadStaffs();
    }

    const loadStaffs = () => {
        axios.get(URL)
        .then(
            response => {
                return response.data;
            }
        )
        // .then(data => { setAPIData(data.sort((a, b) => { return b.age - a.age })) })
        .then(data => setAPIData(data))
        .catch(error => console.log(error.message))
    }

    return (
        <div>
            <h1 style={{ fontSize: '80px', display:'flex', justifyContent: 'center' }}>Dashboard</h1>
            <Link to={`/addNewStudent`} style={{ display:'flex', justifyContent: 'center', textDecoration: 'none', marginBottom: '50px' }}>
                
                <Button variant='contained'>
                    <AddBoxIcon/>
                    Add a student
                    </Button>
            </Link>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Date of birth</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Gender</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Class</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Image</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Feedback</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            APIData.map((staff) => (
                            <TableRow>
                                <TableCell>{staff.id}</TableCell>
                                <TableCell>{staff.name}</TableCell>
                                <TableCell>{staff.dateofbirth}</TableCell>
                                <TableCell>
                                {staff.gender ? "male" : 'female'}
                                </TableCell>
                                <TableCell>{staff.class}</TableCell>
                                <TableCell>{staff.image}</TableCell>
                                <TableCell>{staff.feedback}</TableCell>
                                
                                <TableCell style={{ fontWeight: 'bold' }}>
                                <Link to={`/update/${staff.id}`}>
                                    <Button variant='contained'>Edit</Button>
                                </Link>
                                    <Button onClick={() => showConfirmDel(staff.id)} variant='contained' style={{ backgroundColor: 'red', marginLeft: '20px' }}>Delete</Button>
                            </TableCell>
                            </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open}>
                <Alert>
                    <AlertTitle>Are you sure to delete this student?</AlertTitle>
                </Alert>
                <Button onClick={() => deleteStaff()}>Yes</Button>
                <Button onClick={() => handleClose()}>No</Button>
            </Dialog>
            <Dialog open={openSuccess}>
                <Alert>
                    <AlertTitle>Delete Successfully.</AlertTitle>
                </Alert>
                <Button onClick={() => handleOk()}>OK</Button>
            </Dialog>
        </div>
    )
}
