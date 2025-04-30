import { Box, Typography, Button, Alert } from '@mui/material';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="50vh"
            sx={{ px: 2 }}
        >
            <Alert
                severity="error"
                sx={{
                    width: '100%',
                    maxWidth: { xs: 300, sm: 400, md: 500, lg: 600, xl: 700 },
                    mb: 2,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    Error !!
                </Typography>
                <Typography variant="body2">
                    {message}
                </Typography>
            </Alert>

            {onRetry && (
                <Button
                    variant="contained"
                    color="error"
                    onClick={onRetry}
                    sx={{
                        mt: 2,
                        width: { xs: '100%', sm: 'auto' }
                    }}
                >
                    Try again
                </Button>
            )}
        </Box>
    );
};
