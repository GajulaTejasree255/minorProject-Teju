import * as React from 'react';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import Alert from '@mui/joy/Alert';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import QuizIcon from '@mui/icons-material/Quiz';
import BadgeIcon from '@mui/icons-material/Badge';
import BusinessIcon from '@mui/icons-material/Business';
import FilterListIcon from '@mui/icons-material/FilterList';

const DetailCard = ({ label, value, icon }) => (
  <Card
    variant="outlined"
    sx={{
      height: '100%',
      background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 'lg',
        background: 'linear-gradient(to right bottom, #f8f9fa, #ffffff)',
      },
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
      {icon}
      <Typography
        level="title-md"
        sx={{
          ml: 1,
          color: 'primary.600',
          fontWeight: 'bold',
        }}
      >
        {label}
      </Typography>
    </Box>
    <Typography
      level="body-lg"
      sx={{
        color: 'neutral.700',
        wordBreak: 'break-word',
      }}
    >
      {value}
    </Typography>
  </Card>
);

export default function StudentPlacementDetails() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const { rollnumber } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!rollnumber) return;

      try {
        const query = new URLSearchParams({ rollnumber }).toString();
        const response = await fetch('/api/Placement/StudentPlacementDetail?' + query);

        if (response.ok) {
          const data = await response.json();
          setResults(data);
          setError(null);
        } else {
          setError("Error fetching the details");
          setResults(null);
        }
      } catch (error) {
        setError(error.message);
        setResults(null);
      }
    };

    fetchDetails();
  }, [rollnumber]);

  if (error) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <Alert color="danger" variant="soft">
          {error}
        </Alert>
      </Box>
    );
  }

  if (results === null) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <CircularProgress size="lg" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 4,
        minHeight: '100vh',
        bgcolor: 'background.surface',
      }}
    >
      <Card
        variant="outlined"
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          mb: 4,
          p: 4,
          background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
          boxShadow: 'lg',
          borderRadius: 'xl',
        }}
      >
        <Typography
          level="h2"
          sx={{
            mb: 4,
            textAlign: 'center',
            color: 'primary.600',
            fontWeight: 'bold',
          }}
        >
          Placement Details
        </Typography>

        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={4}>
            <DetailCard
              label="Roll Number"
              value={results.rollNumber}
              icon={<BadgeIcon sx={{ color: 'primary.500' }} />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <DetailCard
              label="Full Name"
              value={results.fullName}
              icon={<PersonIcon sx={{ color: 'primary.500' }} />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <DetailCard
              label="Company"
              value={results.companyName}
              icon={<BusinessIcon sx={{ color: 'primary.500' }} />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <DetailCard
              label="Job Role"
              value={results.jobRole}
              icon={<WorkIcon sx={{ color: 'primary.500' }} />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <DetailCard
              label="CTC Offered"
              value={results.ctcOffered}
              icon={<AttachMoneyIcon sx={{ color: 'primary.500' }} />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <DetailCard
              label="Joining Date"
              value={results.joiningDate}
              icon={<CalendarTodayIcon sx={{ color: 'primary.500' }} />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <DetailCard
              label="Location"
              value={results.location}
              icon={<LocationOnIcon sx={{ color: 'primary.500' }} />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <DetailCard
              label="Selection Process"
              value={results.selectionProcess}
              icon={<FilterListIcon sx={{ color: 'primary.500' }} />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <DetailCard
              label="Questions Asked"
              value={results.questionsAsked}
              icon={<QuizIcon sx={{ color: 'primary.500' }} />}
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}