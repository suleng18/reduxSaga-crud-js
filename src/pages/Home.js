import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserStart, loadUsersStart } from '../redux/actions';
import { Stack } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    dispatch(loadUsersStart({ page: 1, perPage: 5 }));
  }, []);

  const handleDeleteUser = (id) => {
    if (window.confirm('Do you want to delete this user?')) {
      dispatch(deleteUserStart(id));
      toast.success('Delete User Successfully');
    }
  };

  const handleEditUser = (id) => {
    navigate(`/editUser/${id}`);
  };

  const handleDetailsUser = (id) => {
    navigate(`/userInfo/${id}`);
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '50px',
        }}
      >
        <Button
          variant="contained"
          sx={{ marginTop: '35px', textTransform: 'capitalize', bgcolor: '#452c7e' }}
          // onClick={() => navigate('/addUser')}
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
                  <StyledTableCell align="left">{user.gender}</StyledTableCell>
                  <StyledTableCell align="left">{user.status}</StyledTableCell>

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
    </Container>
  );
};

export default Home;
