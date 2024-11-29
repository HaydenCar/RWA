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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
export default function Page() {
    const [data, setData] = useState(null)
    const [weather, setWeatherData] = useState(0)

    function putInCart(pname){
      console.log("putting in cart: " + pname)

      fetch("/api/putInCart?pname="+pname);
    }

    useEffect(() => {
        fetch('/api/getProducts')

        .then((res) => res.json())

        .then((data) => {

          setData(data)

        })

        fetch('/api/getWeather')

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

    // Map product names to images
      const getImagePath = (name) => {
        const imageMap = {
          "chocolate doughnut": '/chocolateDonut.jpg',
          "jam doughnut": '/jamDonut.jpg',
        };
        return imageMap[name] || '/logo.png'; // Fallback to a default image
      };

    if (!weather) return <p>No weather</p>
    return (
        <ThemeProvider theme={theme}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: "green" }}>
              <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                  <img src="/logo.png" alt="Krispy Kreme" width="75" height="75"></img>
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                </Typography>
                <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
                  Today's temperature: {weather.temp}°C
                </Typography>
                <Button onClick={() => window.location = "/view_cart"} color="inherit">
                  Cart
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
          <Container component="main" maxWidth="lg">
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
              <u>Our Menu</u>
            </Typography>
            <Grid container spacing={3}>
              {data.map((item, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={getImagePath(item.pname)} // Dynamically set image
                      alt={item.pname}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {item.pname}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        €{item.price}
                      </Typography>
                      <Button onClick={() => putInCart(item.pname)} variant="outlined" sx={{ mt: 2 }}>
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </ThemeProvider>
      );
}