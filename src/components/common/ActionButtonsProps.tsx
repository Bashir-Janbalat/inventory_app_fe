import { Stack, Button, useMediaQuery, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ActionButtonsProps {
    id: number;
    onDelete: (id: number) => void;
    navigateTo: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ id, onDelete, navigateTo }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleUpdate = () => {
        window.location.href = navigateTo; // oder besser navigate(navigateTo) falls du react-router benutzt
    };

    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={1}
            alignItems="center"
            sx={{ mt: 2 }}
        >
            <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleUpdate}
                fullWidth={isMobile}
                sx={{ minWidth: 120 }}
            >
                Update
            </Button>
            <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
                fullWidth={isMobile}
                sx={{ minWidth: 120 }}
            >
                Delete
            </Button>
        </Stack>
    );
};

export default ActionButtons;
