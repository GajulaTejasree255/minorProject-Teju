import CssBaseline from '@mui/joy/CssBaseline';
import * as React from 'react';

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import StudentTable from './StudentTable';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { useState } from 'react';
import Box from '@mui/joy/Box';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function StudentFilter() {
    const [filters, setFilters] = useState({
        RollNumber: '',
        FirstName: '',
        LastName: '',
        Department: '',
        Email: '',
        PhoneNumber: '',
        DateOfBirth: '',
        PlacementStatus: ''
    });

    const [results, setResults] = useState([]);

    const handleSubmit = async () => {
        try {
            const query = new URLSearchParams(filters).toString();
            console.log(query);
            const response = await fetch('/api/Student/GetStudents?' + query);
            console.log(response);

            if (response.ok) {
                const data = await response.json();
                setResults(data);
            } else {
                console.log("Error fetching the details");
                setResults([]);
            }
        } catch (error) {
            console.error("Error: ", error);
            setResults([]);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Common styles for form controls
    const formControlStyles = {
        width: '100%',
        maxWidth: 300,
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'translateY(-2px)',
        }
    };

    const inputStyles = {
        '--Input-focusedThickness': '2px',
        '&:focus': {
            boxShadow: 'md',
        }
    };

    return (
        <Box sx={{ 
            maxWidth: 1200, 
            margin: 'auto',
            padding: 3,
            minHeight: '100vh',
            backgroundColor: 'background.surface'
        }}>
            <CssBaseline />
            
            <Typography
                level="h2"
                sx={{
                    mb: 4,
                    textAlign: 'center',
                    color: 'primary.600',
                    fontWeight: 'bold'
                }}
            >
                Student Search
            </Typography>

            <Card
                variant="outlined"
                sx={{
                    p: 4,
                    mb: 4,
                    background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
                    boxShadow: 'lg',
                    borderRadius: 'xl'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 3,
                        justifyContent: 'center'
                    }}
                >
                    <FormControl sx={formControlStyles}>
                        <FormLabel>Roll Number</FormLabel>
                        <Input
                            name="RollNumber"
                            placeholder="Ex: 21wh1aXXXX"
                            onChange={handleInputChange}
                            startDecorator={<SearchRoundedIcon />}
                            sx={inputStyles}
                        />
                    </FormControl>

                    <FormControl sx={formControlStyles}>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            name="FirstName"
                            placeholder="Ex: Gajula"
                            onChange={handleInputChange}
                            sx={inputStyles}
                        />
                    </FormControl>

                    <FormControl sx={formControlStyles}>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            name="LastName"
                            placeholder="Ex: Tejasree"
                            onChange={handleInputChange}
                            sx={inputStyles}
                        />
                    </FormControl>

                    <FormControl sx={formControlStyles}>
                        <FormLabel>Department</FormLabel>
                        <Input
                            name="Department"
                            placeholder="Ex: CSE"
                            onChange={handleInputChange}
                            sx={inputStyles}
                        />
                    </FormControl>

                    <FormControl sx={formControlStyles}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            name="Email"
                            placeholder="Ex: 21wh1a0572@bvrithyderabad.edu.in"
                            onChange={handleInputChange}
                            sx={inputStyles}
                        />
                    </FormControl>

                    <FormControl sx={formControlStyles}>
                        <FormLabel>Placement Status</FormLabel>
                        <Input
                            name="PlacementStatus"
                            placeholder="Placed/Unplaced"
                            onChange={handleInputChange}
                            sx={inputStyles}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    mt: 4 
                }}>
                    <Button
                        onClick={handleSubmit}
                        size="lg"
                        variant="solid"
                        sx={{
                            px: 4,
                            py: 1,
                            borderRadius: 'xl',
                            boxShadow: 'md',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg',
                            }
                        }}
                    >
                        Search Students
                    </Button>
                </Box>
            </Card>

            <Box sx={{ mt: 4 }}>
                <StudentTable results={results} />
            </Box>
        </Box>
    );
}