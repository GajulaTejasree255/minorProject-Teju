import CssBaseline from '@mui/joy/CssBaseline';
import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import StudentTable from './StudentTable';
import Button from '@mui/joy/Button';
import {useState } from 'react';


export default function StudentFilter (){

    //This hook is to moniter the changes the user makes in the text area
    const [filters , setFilters] = useState({
        RollNumber : '',
        FirstName : '',
        LastName : '',
        Department : '',
        Email : '',
        PhoneNumber : '',
        DateOfBirth : '',
        PlacementStatus : ''
    });

    const [results , setResults] = useState([]);

    const handleSubmit = async() => {
        try{
            const query = new URLSearchParams(filters).toString();
            console.log(query);
            const response = await fetch('/api/Student/GetStudents?' + query);
            console.log(response);
            //console.log(response.headers.get('content-type'));
            

            if(response.ok){
                const data = await response.json();
                //console.log(data);
                setResults(data);
            }

            else{
                console.log("Error fecthing he details");
                setResults([]);
            }
        }

        catch(error){
            console.error("Error : " ,error);
            setResults([]);
        }
    };

    //This is the function to change the user in
    const handleInputChange = (event) => {
        const {name , value} = event.target
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name] : value,
        }));
    };

    console.log(results);

    return(
        <div>
            <CssBaseline/>
            <Sheet
                sx={{
                width: 'auto',
                mx: 'auto', // margin left & right
                my: 15, // margin top & bottom
                py: 3, // padding top & bottom
                px: 2, // padding left & right
                display: 'flex',
                //flexDirection: 'column',
                flexDirection: 'row',
                flexWrap : 'wrap',
                gap: 2,
                borderRadius: 'sm',
                boxShadow: 'md',
                }}
                variant="outlined"
            >

            <FormControl sx={{ width: '100%', maxWidth: 300 }}>
                <FormLabel>RollNumber</FormLabel>
                    <Input
                        // html input attribute
                        name="RollNumber"
                        type="text"
                        placeholder="Ex : 21wh1aXXXX"
                        onChange={handleInputChange}
                    />
            </FormControl>

            <FormControl sx={{ width: '100%', maxWidth: 300 }}>
                <FormLabel>FirstName</FormLabel>
                    <Input
                        // html input attribute
                        name="FirstName"
                        type="text"
                        placeholder="Ex : Gajula"
                        onChange={handleInputChange}
                    />
            </FormControl>
            

            <FormControl sx={{ width: '100%', maxWidth: 300 }}>
                <FormLabel>LastName</FormLabel>
                    <Input
                        // html input attribute
                        name="LastName"
                        type="text"
                        placeholder="Ex : Tejasree"
                        onChange={handleInputChange}
                    />
            </FormControl>

            <FormControl sx={{ width: '100%', maxWidth: 300 }}>
                <FormLabel>Department</FormLabel>
                    <Input
                        // html input attribute
                        name="Department"
                        type="text"
                        placeholder="Ex : CSE"
                        onChange={handleInputChange}
                    />
            </FormControl>

            <FormControl sx={{ width: '100%', maxWidth: 300 }}>
                <FormLabel>Email</FormLabel>
                    <Input
                        // html input attribute
                        name="Email"
                        type="text"
                        placeholder="Ex : 21wh1a0572@bvrithyderabad.edu.in"
                        onChange={handleInputChange}
                    />
            </FormControl>

            <FormControl sx={{ width: '100%', maxWidth: 300 }}>
                <FormLabel>PlacementStatus</FormLabel>
                    <Input
                        // html input attribute
                        name="PlacementStatus"
                        type="text"
                        placeholder="Placed/Unplaced"
                        onChange={handleInputChange}
                    />
            </FormControl>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleSubmit} sx={{ marginTop: 2 }}>
            Submit
            </Button>
            </div>
            
            </Sheet>
            
            <StudentTable results = {results}/>
            
        </div>
    );
}