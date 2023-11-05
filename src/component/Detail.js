import { Card, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Detail() {
    const staffId = useParams();
    // console.log(staffId);
    const [APIData, setAPIData] = useState([]);
    const URL = `https://654660b7fe036a2fa95595d6.mockapi.io/student/${staffId.id}`

    useEffect(() => {
        fetch(URL, { method: "GET" })
        .then(
            response => {
                if(!response.ok) {
                    throw new Error(`HTTP status: ${response.status}`);
                }
                return response.json();
            }
        )
        .then(data => setAPIData(data))
        .catch(error => console.log(error.message))
    }, [])

    // console.log(APIData.avatar);
  return (
    <div>
        {/* <h1 style={{ fontSize: '50px' }}>Detail</h1> */}
        <Card style={{ marginLeft: '460px', width: '545px', marginTop: '100px' }}>
            <CardMedia sx={{ height: 400, maxWidth: 545 }} image={APIData.image} />
            
            <Typography style={{ marginLeft: '20px', marginTop: '10px' }} gutterBottom variant="h6" component="div"><b><i>ID: </i></b>{APIData.id}</Typography>
            <Typography style={{ marginLeft: '20px' }} gutterBottom variant="h6" component="div"><b><i>Name: </i></b>{APIData.name}</Typography>
            <Typography style={{ marginLeft: '20px' }} gutterBottom variant="h6" component="div"><b><i>Date of birth: </i></b>{APIData.dateofbirth}</Typography>
            <Typography style={{ marginLeft: '20px' }} gutterBottom variant="h6" component="div"><b><i>Gender: </i></b>{APIData.gender}</Typography>
            <Typography style={{ marginLeft: '20px' }} gutterBottom variant="h6" component="div"><b><i>Class: </i></b>{APIData.class}</Typography>
            <Typography style={{ marginLeft: '20px' }} gutterBottom variant="h6" component="div"><b><i>Feedback: </i></b>{APIData.feedback}</Typography>
        </Card>
    </div>
  )
}
