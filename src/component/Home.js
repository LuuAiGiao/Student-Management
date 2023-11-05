import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login';
// import { GoogleLogin } from '@react-oauth/google';

import { Link } from 'react-router-dom';

export default function Home() {
  const [APIData, setAPIData] = useState([]);
  // const [flag, setFlag] = useState(false);
  // const [name, setName] = useState();
  const URL = 'https://654660b7fe036a2fa95595d6.mockapi.io/student';
  // const clientId = '157579947849-5ceeklaqkbotjq49a2kahttnrfqjcl63.apps.googleusercontent.com'


  // const onSuccess = (res) => {
  //   setName(res.profileObj["name"]);
  //   console.log("Success", res.profileObj);
  //   setFlag(true);
  // }

  // const onFailure = (res) => {
  //   console.log("Failed", res);
  // }

  useEffect(() => {
    axios.get(URL).then(
      response => {
        return response.data;
      }
    )
      // .then(data => setAPIData(data))
      .then(data => { setAPIData(data.sort(data.name)) })
      .catch(error => console.log(error.message));
  }, [])

  // console.log(APIData);

  return (

    <div>
      <h1 style={{ fontSize: '50px' }}>Home</h1>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ paddingLeft: '100px' }}>
        {
          APIData.map((staff) => (
            <Grid item xs={4} >
              <Card sx={{ maxWidth: 345 }} >
                <CardMedia sx={{ height: 240 }} image={staff.image} />
                <CardContent>
                  <Link to={`/detail/${staff.id}`} style={{ textDecoration: 'none' }}>
                    <Typography gutterBottom variant="h5" component="div">ID: {staff.id}</Typography>
                  </Link>
                  <Typography gutterBottom variant="h5" component="div">Name: {staff.name}</Typography>
                  <Typography gutterBottom variant="h5" component="div">Date of birth: {staff.dateofbirth}</Typography>

                  <Typography gutterBottom variant="h5" component="div">Gender: {staff.gender ? "male" : 'female'}</Typography>
                  {/* <Typography gutterBottom variant="h5" component="div">Gender: {staff.gender}</Typography> */}
                  <Typography gutterBottom variant="h5" component="div">Class: {staff.class}</Typography>
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Link to={`/detail/${staff.id}`}>
                    <Button style={{ backgroundColor: '#e91e63', color: 'white', fontWeight: 'bold' }} variant='contained'>Detail</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))
        }

      </Grid>

    </div>
  )
}
