import Typography from '@mui/joy/Typography';
import React from 'react';

export default function NotPlacedPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // Horizontally center the content
        alignItems: 'center', // Vertically center the content
        height: '100vh', // Use full viewport height
        backgroundColor: '#f5f5f5', // Light background color
      }}
    >
      <Typography
        level="h1"
        sx={{
          fontSize: '4rem', // Large font size
          fontWeight: 'bold', // Bold text
          color: 'primary.600', // You can choose any color
          textAlign: 'center', // Center align the text
        }}
      >
        Not yet placed
      </Typography>
    </div>
  );
}

