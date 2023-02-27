import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editUserStart } from '../redux/actions';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function EditUser(props) {
  const { openDialog, handleClose, idSelected } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.data);

  const [user, setUser] = React.useState({
    name: '',
    email: '',
    gender: 'female',
    status: 'active',
  });

  const handleEdit = () => {
    if (!user.name || !user.email) return;
    dispatch(editUserStart({ idSelected, user }));
    setTimeout(() => navigate('/'), 1000);
    toast.success('Edit User Successfully');
    handleClose();
  };

  React.useEffect(() => {
    if (users) {
      const detailUser = users.find((item) => item.id === +idSelected);
      setUser(detailUser);
    }
  }, [idSelected, users]);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openDialog}
    >
      <DialogContent dividers>
        <Container
          sx={{
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
              </Box>
            </Box>
          </Box>
        </Container>
      </DialogContent>
    </BootstrapDialog>
  );
}
