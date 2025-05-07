import { Stack, Button, useMediaQuery, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";

interface ActionButtonsProps {
    id: number;
    onDelete: (id: number) => void;
    navigateTo: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ id, onDelete, navigateTo }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const handleUpdate = () => {
        navigate(navigateTo);
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
                id="update-button"
                name="update-button"
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
                id="delete-button"
                name="delete-button"
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
