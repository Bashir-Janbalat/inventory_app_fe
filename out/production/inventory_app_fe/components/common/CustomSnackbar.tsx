import React from 'react';
import {Alert, AlertColor, Snackbar} from '@mui/material';

interface CustomSnackbarProps {
    open: boolean;
    message: string;
    severity: AlertColor;
    onClose: () => void;
    autoHideDuration?: number;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
                                                           open,
                                                           message,
                                                           severity,
                                                           onClose,
                                                           autoHideDuration = 4000
                                                       }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{
                width: '100%',
                maxWidth: 600,
                minWidth: 250,
                boxShadow: 3,
                '@media (max-width:600px)': {
                    width: '100%',
                    minWidth: '100%',
                },
            }}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                variant="filled"
                sx={{
                    width: '100%',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: '#fff',
                    backgroundColor: (theme) =>
                        severity === 'success' ? theme.palette.success.main :
                            severity === 'error' ? theme.palette.error.main :
                                severity === 'warning' ? theme.palette.warning.main :
                                    theme.palette.info.main,
                    '@media (max-width:600px)': {
                        fontSize: '0.875rem',
                    },
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;
