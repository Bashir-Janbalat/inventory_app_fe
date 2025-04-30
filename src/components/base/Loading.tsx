import React from 'react';
import {Box, CircularProgress, Typography} from '@mui/material';

type Loading = {
    fullScreen?: boolean;
    message?: string;
};

const Loading: React.FC<Loading> = ({fullScreen = false, message = 'Loading...'}) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height={fullScreen ? '100vh' : '100%'}
            width="100%"
            p={2}
        >
            <CircularProgress />
            <Typography variant="body1" mt={2} color="textSecondary">
                {message}
            </Typography>
        </Box>
    );
};

export default Loading;
