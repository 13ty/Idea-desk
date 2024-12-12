import React from 'react'
import { Container, Typography, Button, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" gutterBottom>
        AI App Idea Generator
      </Typography>
      <Typography variant="body1" paragraph>
        Transform your app concept into a fully realized project with AI-powered insights and suggestions.
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/generate"
          >
            Start Generating
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="outlined" 
            color="secondary" 
            component={Link} 
            to="/customize"
          >
            Customize Project
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
