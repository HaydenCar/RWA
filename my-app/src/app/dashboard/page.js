'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
export default function Page() {
    const [data, setData] = useState(null)
    const [weather, setWeatherData] = useState(0)

    function putInCart(pname){
      console.log("putting in cart: " + pname)

      fetch("http://localhost:3000/api/putInCart?pname="+pname);
    }

    useEffect(() => {
        fetch('http://localhost:3000/api/getProducts')

        .then((res) => res.json())

        .then((data) => {

          setData(data)

        })

        fetch('http://localhost:3000/api/getWeather')

        .then((res) => res.json())

        .then((weather) => {

          setWeatherData(weather)

        })
    }, [])
    if (!data) return <p>Loading</p>
    const theme = createTheme({
    palette: {
    secondary: {
    main: green[500],
    },
    },
    });
    if (!weather) return <p>No weather</p>
    return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Krispy Kreme
              </Typography>
              <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
                              Today's temperature: {JSON.stringify(weather.temp)}
              </Typography>
              <Button onClick={() => window.location="/view_cart"} color="inherit">Cart</Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Container component="main" maxWidth="xs">
        <div style={{fontSize: '40px'}} > Dashboard</div>
        <div>
        {
        data.map((item, i) => (
        <div style={{padding: '20px'}} key={i} >
        Unique ID: {item._id}
        <br></br>
        {item.pname}
        -
        {item.price}
        <br></br>
        <Button onClick={() => putInCart(item.pname)} variant="outlined"> Add to cart </Button>
        </div>
        ))
        }
        </div>
        </Container>
</ThemeProvider>
);
}