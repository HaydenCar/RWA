'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


export default function Home() {
  const handleSubmit = (event) => {
  console.log("handling submit");
  event.preventDefault();
  const data = new FormData(event.currentTarget);

   let email = data.get('email')
   let pass = data.get('pass')

   console.log("Sent email:" + email)
   console.log("Sent pass:" + pass)

   runDBCallAsync(`/api/login?email=${email}&pass=${pass}`)
 }; // end handle submit


async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    if (data.data === true) {
      console.log("Login is valid!");
      console.log(data);

      if (data.acc_type === 'customer') {
        window.location = "/dashboard";
      }
      // Check if account type is 'manager'
      else if (data.acc_type === 'manager') {
        window.location = "/manager";
      }
      else {
        console.log("Not a customer or manager account.");
      }

    } else {
      console.log("Login not valid.");
    }
}





  return (
    <Container maxWidth="sm">
    <img src="/logo.png" alt="Krispy Kreme" width="500" height="400"></img>
    <Box sx={{ height: '100vh' }} >
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
    <TextField
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
    />

    <TextField
      margin="normal"
      required
      fullWidth
      name="pass"
      label="Pass"
      type="pass"
      id="pass"
      autoComplete="current-password"
    />

    <FormControlLabel
      control={<Checkbox value="remember" color="primary" />}
      label="Remember me"
    />

    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Sign In
    </Button>

    <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Link href="/register" variant="body2">
          Need an account? Sign Up
        </Link>
    </Box>
    </Box>
    </Box>
    </Container>
  ); // end return
}

