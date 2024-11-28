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

    function placeOrder(data){
      console.log("Placing order: " + data)

      fetch("/api/placeOrder?pname="+data);
    }

    useEffect(() => {
        fetch('/api/getCart')

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
    if (!weather) return <p>No weather</p>

    const getImagePath = (name) => {
        const imageMap = {
          "chocolate doughnut": '/chocolateDonut.jpg',
          "jam doughnut": '/jamDonut.jpg',
        };
        return imageMap[name] || '/logo.png'; // Fallback to a default image
    };

    return (
            <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                onClick={() => window.location = "/dashboard"}
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
                            <Button onClick={() => window.location = "/checkout"} color="inherit">
                                Cart
                            </Button>
                        </Toolbar>
                    </AppBar>
                </Box>

                <Container component="main" maxWidth="xs">
                    <div style={{ fontSize: '40px' }}>Shopping Cart</div>
                    <div>
                        {data.map((item, i) => (
                            <Card sx={{ maxWidth: 345 }} key={i}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={getImagePath(item.pname)} // Dynamically set image
                                    alt={item.pname}
                                />
                                <CardContent>
                                    <p>Unique ID: {item._id}</p>
                                    <p>{item.pname} - {item.price}</p>
                                    <Button onClick={() => placeOrder(item.pname)} variant="outlined">
                                        Place Order
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </ThemeProvider>
    );
}