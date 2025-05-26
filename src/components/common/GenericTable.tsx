import React, {useState} from 'react';
import {
    Button,
    Container,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from 'react-router-dom';
import ActionButtons from '../common/ActionButtonsProps';
import CustomSnackbar from '../common/CustomSnackbar';
import {DetailedApiError} from '../../errors/DetailedApiError';
import {CustomGridProps} from '../../types/CustomGridProps';

type GenericTableGridProps<T> = CustomGridProps<T> & {
    title: string;
    showCreateButton?: boolean;
    createPath: string;
    updatePath: (id: number) => string;
    deleteItem: (id: number) => Promise<number>;
    columnTitles: string[];
    renderColumns: (item: T) => React.ReactNode[];
    renderActions?: (item: T) => React.ReactNode;
};

function GenericTable<T extends { id: number }>({
                                                    title,
                                                    items,
                                                    totalPages,
                                                    page,
                                                    setPage,
                                                    showCreateButton,
                                                    createPath,
                                                    updatePath,
                                                    deleteItem,
                                                    columnTitles,
                                                    renderColumns,
                                                    renderActions
                                                }: GenericTableGridProps<T>) {
    const navigate = useNavigate();
    const [data, setData] = useState<T[]>(items);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const handleCreate = () => navigate(createPath);

    const handleDelete = async (id: number) => {
        try {
            const status = await deleteItem(id);
            if (status === 204) {
                setData(prev => prev.filter(item => item.id !== id));
                setSnackbarMessage('Deleted successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            }
        } catch (error) {
            if (error instanceof DetailedApiError) {
                setSnackbarMessage(error.message);
            } else {
                setSnackbarMessage('Unexpected error occurred.');
            }
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    return (
        <Container>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 4}}>
                <Typography variant="h4" fontWeight="bold">{title}</Typography>
                {showCreateButton && (
                    <Button variant="contained" startIcon={<AddIcon/>} onClick={handleCreate}>
                        Create
                    </Button>
                )}
            </Stack>

            <TableContainer component={Paper} sx={{overflowX: 'auto', border: '1px solid #ccc', borderRadius: 1}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columnTitles.map((title, index) => (
                                <TableCell key={index} sx={{fontWeight: 'bold', textAlign: 'center', fontSize: '1rem'}}>
                                    {title}
                                </TableCell>
                            ))}
                            <TableCell
                                sx={{fontWeight: 'bold', textAlign: 'center', fontSize: '1rem'}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(item => (
                            <TableRow key={item.id} sx={{textAlign: 'center'}}>
                                {renderColumns(item)}
                                <TableCell sx={{textAlign: 'center'}}>
                                    {renderActions ? renderActions(item) : (
                                        <ActionButtons
                                            id={item.id}
                                            onDelete={handleDelete}
                                            navigateTo={updatePath(item.id)}
                                        />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack direction="row" justifyContent="center" alignItems="center" mt={4}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </Stack>

            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />
        </Container>
    );
}

export default GenericTable;
