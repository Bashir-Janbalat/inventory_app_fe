import {Button, Stack, useMediaQuery, useTheme} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type ActionButtonsProps = {
    id: number;
    onDelete: (id: number) => void;
    navigateTo?: string;

};

const ActionButtons: React.FC<ActionButtonsProps> = ({id, onDelete, navigateTo}) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    const handleUpdate = () => {
        navigate(`${navigateTo}`);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            onDelete(id);
        }
    };

    return (
        <Stack
            direction={{xs: 'column', sm: 'row'}}
            spacing={2}
            alignItems="center"
        >
            <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon/>}
                onClick={handleUpdate}
                fullWidth={isMobile}
            >
                Update
            </Button>
            <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon/>}
                onClick={handleDelete}
                fullWidth={isMobile}
            >
                Delete
            </Button>
        </Stack>
    );
};

export default ActionButtons;
