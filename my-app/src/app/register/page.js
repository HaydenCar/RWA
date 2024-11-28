'use client';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function Register() {
  const handleSubmit = (event) => {
    console.log("Handling registration submit");
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let email = data.get('email');
    let pass = data.get('pass');

    console.log("Registering email:", email);
    console.log("Registering pass:", pass);

    runDBCallAsync(`http://localhost:3000/api/newregister?email=${email}&pass=${pass}`);
  };

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();
    if (data.success === "true") {
      console.log("Registration successful!");
      window.location = "/dashboard"; // Redirect to dashboard
    } else {
      console.log("Registration failed:", data.error);
    }
  }

  return (
    <Container maxWidth="sm">
    <img src="/logo.png" alt="Krispy Kreme" width="500" height="400"></img>
      <Box sx={{ height: '100vh' }}>
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
            label="Password"
            type="password"
            id="pass"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
