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

export default function Register() {
  const handleSubmit = (event) => {
    console.log("Handling register submit");
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let email = data.get('email');
    let pass = data.get('pass');
    let accountType = data.get('accountType');

    console.log("Sent email:", email);
    console.log("Sent pass:", pass);
    console.log("Sent account type:", accountType);

    runDBCallAsync(`http://localhost:3000/api/register`, { email, pass, accountType });
  };

  async function runDBCallAsync(url, payload) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.status === 201) {
      console.log("Registration successful!");
      window.location = "/dashboard";
    } else {
      console.log("Registration failed:", data.error);
    }
  }

  return (
    <Container maxWidth="sm">
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
            autoComplete="new-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="accountType"
            label="Account Type"
            name="accountType"
            autoComplete="accountType"
          />
          <FormControlLabel
            control={<Checkbox value="terms" color="primary" />}
            label="I agree to the terms and conditions"
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
