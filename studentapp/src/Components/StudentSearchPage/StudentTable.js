import React from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import IconButton from '@mui/joy/IconButton';
import { Link } from 'react-router-dom';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Typography from '@mui/joy/Typography';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Card from '@mui/joy/Card';

export default function StudentTable({ results }) {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangeRowsPerPage = (event, newValue) => {
    setRowsPerPage(parseInt(newValue, 10));
    setPage(0);
  };

  const paginatedResults = results.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  function labelDisplayedRows({ from, to, count }) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  }

  const getLabelDisplayedRowsTo = () => {
    if (results.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? results.length
      : Math.min(results.length, (page + 1) * rowsPerPage);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        boxShadow: 'lg',
        borderRadius: 'xl',
        background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
      }}
    >
      <Typography
        level="h4"
        sx={{
          mb: 2,
          color: 'primary.600',
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        Student Records
      </Typography>
      
      <Sheet
        sx={{
          borderRadius: 'md',
          overflow: 'auto',
          maxHeight: '70vh',
          width: '100%',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'neutral.400',
            borderRadius: '4px',
          },
        }}
      >
        <Table 
          stripe="odd" 
          variant="outlined" 
          sx={{
            tableLayout: 'auto',
            '& th': {
              backgroundColor: 'primary.100',
              color: 'primary.700',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: 'sm',
              padding: 1.5,
              borderBottom: '2px solid',
              borderBottomColor: 'primary.200',
            },
            '& td': {
              padding: 1.5,
              transition: 'background-color 0.2s',
            },
            '& tr:hover td': {
              backgroundColor: 'primary.50',
            },
            '& tbody tr': {
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 'sm',
              },
            },
          }}
        >
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
              <th>Placement Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedResults.map((result, index) => (
              <tr key={index}>
                <td>
                  {result.placementStatus === 'Placed' ? (
                    <Link 
                      to={`/StudentDetail/${result.rollNumber}`}
                      style={{
                        color: 'primary.600',
                        textDecoration: 'none',
                        fontWeight: 'medium',
                          '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                  {result.rollNumber}
                  </Link>) : (
                    <Link 
                    to={`/NotPlacedPage`}
                    style={{
                      color: 'primary.600',
                      textDecoration: 'none',
                      fontWeight: 'medium',
                        '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                {result.rollNumber}
                </Link>
                  )}
                </td>
                <td>{result.firstName}</td>
                <td>{result.lastName}</td>
                <td>{result.department}</td>
                <td>{result.email}</td>
                <td>{result.phoneNumber}</td>
                <td>{result.dateOfBirth}</td>
                <td>
                  <Typography
                    sx={{
                      color: result.placementStatus === 'Placed' ? 'success.600' : 'warning.600',
                      fontWeight: 'medium',
                    }}
                  >
                    {result.placementStatus}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={8}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    justifyContent: 'flex-end',
                    p: 1,
                    borderTop: '1px solid',
                    borderTopColor: 'divider',
                  }}
                >
                  <FormControl orientation="horizontal" size="sm">
                    <FormLabel sx={{ color: 'neutral.600' }}>Rows per page:</FormLabel>
                    <Select 
                      onChange={handleChangeRowsPerPage} 
                      value={rowsPerPage}
                      sx={{
                        minWidth: '70px',
                        '&:hover': {
                          bgcolor: 'primary.50',
                        },
                      }}
                    >
                      <Option value={5}>5</Option>
                      <Option value={10}>10</Option>
                      <Option value={25}>25</Option>
                    </Select>
                  </FormControl>

                  <Typography 
                    sx={{ 
                      textAlign: 'center', 
                      minWidth: 80,
                      color: 'neutral.600',
                    }}
                  >
                    {labelDisplayedRows({
                      from: results.length === 0 ? 0 : page * rowsPerPage + 1,
                      to: getLabelDisplayedRowsTo(),
                      count: results.length === -1 ? -1 : results.length,
                    })}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="sm"
                      color="primary"
                      variant="outlined"
                      disabled={page === 0}
                      onClick={() => handleChangePage(page - 1)}
                      sx={{
                        transition: 'transform 0.2s',
                        '&:not(:disabled):hover': {
                          transform: 'translateX(-2px)',
                        },
                      }}
                    >
                      <KeyboardArrowLeftIcon />
                    </IconButton>
                    <IconButton
                      size="sm"
                      color="primary"
                      variant="outlined"
                      disabled={
                        results.length !== -1
                          ? page >= Math.ceil(results.length / rowsPerPage) - 1
                          : false
                      }
                      onClick={() => handleChangePage(page + 1)}
                      sx={{
                        transition: 'transform 0.2s',
                        '&:not(:disabled):hover': {
                          transform: 'translateX(2px)',
                        },
                      }}
                    >
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </Box>
                </Box>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Sheet>
    </Card>
  );
}