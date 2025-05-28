import {IconButton, Stack, Tooltip, useMediaQuery, useTheme} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../auth/AuthContext.tsx";


interface ActionButtonsProps {
    id: number;
    onDelete: (id: number) => void;
    navigateTo: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({id, onDelete, navigateTo}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const {roles} = useContext(AuthContext);
    const isAdmin = roles?.includes('ROLE_ADMIN');

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
            justifyContent="center"
            sx={{mt: 2}}
        >
            <Tooltip title="Update">
                <IconButton
                    id="update-button"
                    name="update-button"
                    color="primary"
                    onClick={handleUpdate}
                    size="medium"
                    aria-label="Update item"
                    sx={{
                        border: '1px solid',
                        borderColor: 'primary.main',
                        borderRadius: 1,
                        '&:hover': {
                            backgroundColor: 'primary.light',
                            borderColor: 'primary.dark',
                        },
                    }}
                >
                    <EditIcon/>
                </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
                <span>
                <IconButton
                    id="delete-button"
                    name="delete-button"
                    color="error"
                    onClick={handleDelete}
                    size="medium"
                    disabled={!isAdmin}
                    aria-label="Delete item"
                    sx={{
                        border: '1px solid',
                        borderColor: 'error.main',
                        borderRadius: 1,
                        '&:hover': {
                            backgroundColor: 'error.light',
                            borderColor: 'error.dark',
                        },
                    }}
                >
                    <DeleteIcon/>
                </IconButton>
                </span>
            </Tooltip>
        </Stack>
    );
};

export default ActionButtons;
