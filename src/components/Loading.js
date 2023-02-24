import { Box } from '@mui/system';
import React from 'react';

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      <Box
        sx={{
          display: 'inline-block',
          width: '50px',
          height: '50px',
          borderRadius: '100px',
          border: '6px solid #1976d2',
          borderTopColor: 'transparent',
          animation: 'App-logo-spin 1.2s infinite',
        }}
      ></Box>
    </Box>
  );
};

export default Loading;
