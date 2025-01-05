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


export default function StudentTable({ results }) {
  console.log(results);
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
    <div>
      <Sheet>
        <Table stripe = "odd" variant="outlined" sx={{tableLayout: 'auto'}}>
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>PhoneNumber</th>
              <th>DateOfBirth</th>
              <th>PlacementStatus</th>
            </tr>
          </thead>

          <tbody>
                {paginatedResults.map((result,index) => (
                <tr key = {index}>
                  <td><Link to = {`/StudentDetail/${result.rollNumber}`}>{result.rollNumber}</Link></td>
                  <td>{result.firstName}</td>
                  <td>{result.lastName}</td>
                  <td>{result.department}</td>
                  <td>{result.email}</td>
                  <td>{result.phoneNumber}</td>
                  <td>{result.dateOfBirth}</td>
                  <td>{result.placementStatus}</td>
                </tr>))}
          </tbody>

          <tfoot>
          <tr>
            <td colSpan={6}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  justifyContent: 'flex-end',
                }}
              >
                <FormControl orientation="horizontal" size="sm">
                  <FormLabel>Rows per page:</FormLabel>
                  <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                    <Option value={5}>5</Option>
                    <Option value={10}>10</Option>
                    <Option value={25}>25</Option>
                  </Select>
                </FormControl>

                <Typography sx={{ textAlign: 'center', minWidth: 80 }}>
                  {labelDisplayedRows({
                    from: results.length === 0 ? 0 : page * rowsPerPage + 1,
                    to: getLabelDisplayedRowsTo(),
                    count: results.length === -1 ? -1 : results.length,
                  })}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={page === 0}
                    onClick={() => handleChangePage(page - 1)}
                    sx={{ bgcolor: 'background.surface' }}
                  >
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={
                      results.length !== -1
                        ? page >= Math.ceil(results.length / rowsPerPage) - 1
                        : false
                    }
                    onClick={() => handleChangePage(page + 1)}
                    sx={{ bgcolor: 'background.surface' }}
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
    </div>
  );
}
