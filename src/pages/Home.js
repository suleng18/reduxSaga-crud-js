import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Container, Pagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteUserStart, loadUsersStart } from '../redux/actions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsersStart({ page: 1, perPage: 6 }));
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    if (window.confirm('Do you want to delete this user?')) {
      dispatch(deleteUserStart(userId));
      toast.success('Delete User Successfully');
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/editUser/${userId}`);
  };

  const handleDetailsUser = (userId) => {
    navigate(`/userInfo/${userId}`);
  };

  const handlePagination = (even, value) => {
    dispatch(loadUsersStart({ page: value, perPage: 6 }));
  };

  return (
    <Container
      sx={{
        marginTop: '20px',
        backgroundColor: '#e3f2fd',
        borderRadius: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '50px',
        }}
      >
        <Button
          variant="contained"
          sx={{
            marginTop: '35px',
            bgcolor: 'primary',
            padding: '10px 40px',
          }}
          onClick={() => navigate('/addUser')}
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ID</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Gender</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users &&
              users.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {user.id}
                  </StyledTableCell>
                  <StyledTableCell align="left">{user.name}</StyledTableCell>
                  <StyledTableCell align="left">{user.email}</StyledTableCell>
                  <StyledTableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {user.gender}
                  </StyledTableCell>
                  <StyledTableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {user.status}
                  </StyledTableCell>

                  <StyledTableCell>
                    <Stack
                      sx={{ display: 'flex', justifyContent: 'center' }}
                      direction="row"
                      spacing={2}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleEditUser(user.id)}
                      >
                        <EditIcon></EditIcon>
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <DeleteIcon></DeleteIcon>
                      </Button>
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => handleDetailsUser(user.id)}
                      >
                        <PersonIcon></PersonIcon>
                      </Button>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={4} sx={{ alignItems: 'center', padding: '30px 0' }}>
        <Pagination count={6} onChange={handlePagination} color="primary" />
      </Stack>
    </Container>
  );
};

export default Home;
