import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <div>
        <AppBar style={{ backgroundColor: 'pink', color: 'black' }}>
            <Toolbar>
                <Typography variant='h4'>
                    PE
                </Typography>
                <Button style={{ fontSize: '18px', marginLeft: '50px', fontWeight: 'bold' }} color='inherit' component={Link} to='/' >Home</Button>
                <Button style={{ fontSize: '18px', marginLeft: '50px', fontWeight: 'bold' }} color='inherit' component={Link} to='/dashboard'>Dashboard</Button>
                <Button style={{ fontSize: '18px', marginLeft: '50px', fontWeight: 'bold' }} color='inherit' component={Link} to='/contact'>Contact</Button>
            </Toolbar>
        </AppBar>
    </div>
  )
}
