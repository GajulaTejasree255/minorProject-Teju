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
        Department : ''
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
                gap: 2,
                borderRadius: 'sm',
                boxShadow: 'md',
                }}
                variant="outlined"
            >

            <FormControl>
                <FormLabel>RollNumber</FormLabel>
                    <Input
                        // html input attribute
                        name="RollNumber"
                        type="text"
                        placeholder="Ex : 21wh1aXXXX"
                        onChange={handleInputChange}
                    />
            </FormControl>

            <FormControl>
                <FormLabel>FirstName</FormLabel>
                    <Input
                        // html input attribute
                        name="FirstName"
                        type="text"
                        placeholder="Ex : Gajula"
                        onChange={handleInputChange}
                    />
            </FormControl>
            

            <FormControl>
                <FormLabel>LastName</FormLabel>
                    <Input
                        // html input attribute
                        name="LastName"
                        type="text"
                        placeholder="Ex : Tejasree"
                        onChange={handleInputChange}
                    />
            </FormControl>

            <FormControl>
                <FormLabel>Department</FormLabel>
                    <Input
                        // html input attribute
                        name="Department"
                        type="text"
                        placeholder="Ex : CSE"
                        onChange={handleInputChange}
                    />
            </FormControl>

            <Button onClick = {handleSubmit}>Submit</Button>
            
            </Sheet>
            
            <StudentTable results = {results}/>
            
        </div>
    );
}