import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editUserStart, loadUsersStart } from '../redux/actions';

export default function EditUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.data);
  const { id } = useParams();

  const [user, setUser] = useState({
    name: '',
    email: '',
    gender: 'female',
    status: 'active',
  });

  const handleEdit = () => {
    if (!user.name || !user.email) return;
    dispatch(editUserStart({ id, user }));
    setTimeout(() => navigate('/'), 1000);
    toast.success('Edit User Successfully');
  };

  useEffect(() => {
    if (users) {
      const detailUser = users.find((item) => item.id === +id);
      setUser({ ...detailUser });
    }
  }, [id, users]);

  useEffect(() => {
    dispatch(loadUsersStart({ page: 1, perPage: 50 }));
  }, [dispatch]);

  return (
    <Container
      sx={{
        marginTop: '60px',
        padding: '50px 50px 100px',
        backgroundColor: '#e3f2fd',
        borderRadius: '20px',
      }}
    >
      <Typography variant="h4" align="center" mb={4} fontWeight="500" color="primary">
        Edit User
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 2, width: '60ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Name"
            type="text"
            value={user.name || ''}
            onChange={(event) => setUser({ ...user, name: event.target.value })}
            placeholder="Name"
          />
          <br />
          <TextField
            label="Email"
            type="email"
            value={user.email || ''}
            onChange={(event) => setUser({ ...user, email: event.target.value })}
            placeholder="Email"
          />
          <br />

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={user.gender || ''}
              onChange={(event) => setUser({ ...user, gender: event.target.value })}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>

            <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={user.status || ''}
              onChange={(event) => setUser({ ...user, status: event.target.value })}
            >
              <FormControlLabel value="active" control={<Radio />} label="Active" />
              <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
            </RadioGroup>
          </FormControl>
          <br />

          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '150px' }}
              onClick={() => handleEdit()}
            >
              Edit User
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ width: '150px' }}
              onClick={() => navigate('/')}
            >
              Go Back
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
