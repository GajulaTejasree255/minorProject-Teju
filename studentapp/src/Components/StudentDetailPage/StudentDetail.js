import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import { useParams } from 'react-router-dom';

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor: 'lightblue',
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 5,
}));

export default function FullWidthGrid() {
    const {rollnumber} = useParams();
     
  return (
    <Grid container spacing={2} sx={{
        justifyContent: "space-around",
        alignItems: "center",
      }}>
      <Grid size="auto">
        <Item>RollNumber</Item>
      </Grid>
      <Grid size="auto">
        <Item>Full Name</Item>
      </Grid>
      <Grid size="auto">
        <Item>Company name</Item>
      </Grid>
      <Grid size="auto">
        <Item>Job role</Item>
      </Grid>
      <Grid size="auto">
        <Item>CTC offered</Item>        
      </Grid>
      <Grid size="auto">
        <Item>Joining Date</Item>        
      </Grid>

      <Grid size="auto">
        <Item>Location</Item>        
      </Grid>
      <Grid size="auto">
        <Item>Selection process</Item>        
      </Grid>

      <Grid size="auto">
        <Item>Questions asked</Item>        
      </Grid>
    </Grid>
  );
}
