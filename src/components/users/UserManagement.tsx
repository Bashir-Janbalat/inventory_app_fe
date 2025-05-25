import {useCallback, useContext, useEffect, useState} from "react";
import {Button, Card, CardContent, Chip, Container, Grid, Pagination, Stack, Typography} from "@mui/material";
import AssignRoleDialog from "./AssignRoleDialog";
import RoleDialog from "./RoleDialog";
import {UserDTO} from "../../types/UserDTO.ts";
import {getUsers, removeRoleFromUser} from "../../api/userApi.ts";
import {useFetcher} from "../../hooks/useFetcher.ts";
import Loading from "../base/Loading.tsx";
import {ErrorMessage} from "../common/ErrorMessage.tsx";
import AuthContext from "../../auth/AuthContext.tsx";
import CustomSnackbar from "../common/CustomSnackbar.tsx";
import {DetailedApiError} from "../../errors/DetailedApiError.ts";
import DeleteRoleDialog from "./DeleteRoleDialog.tsx";

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [openAssignDialog, setOpenAssignDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null);
    const [openRoleDialog, setOpenRoleDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const size = 4;
    const {roles} = useContext(AuthContext);
    const isUserManager = roles?.includes('ROLE_USER_MANAGEMENT');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const {subject, roles: authRoles, setRoles: setAuthRoles} = useContext(AuthContext);

    const fetchUsers = useCallback(async () => {
        const pagedResponse = await getUsers(page - 1, size);
        setUsers(pagedResponse.content);
        setTotalPages(pagedResponse.totalPages);
        return pagedResponse.content;
    }, [page]);

    const {fetchData: loadUsers, loading: isUsersLoading, error: userLoadingError} = useFetcher<UserDTO[]>(fetchUsers);
    useEffect(() => {
        loadUsers().catch(console.error);
    }, [loadUsers]);


    const handleAssignRole = (user: UserDTO) => {
        setSelectedUser(user);
        setOpenAssignDialog(true);
    };
    const handleRemoveRoleFromUser = async (userId: number, roleId: number, username: string, roleName: string) => {
        try {
            await removeRoleFromUser(userId, roleId);
            if (username === subject && authRoles) {
                const updatedRoles = authRoles.filter(role => role !== roleName);
                setAuthRoles(updatedRoles);
            }
            setSnackbarMessage('Deleted successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            loadUsers();
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
    if (isUsersLoading) {
        return <Loading fullScreen message="Loading Users..."/>;
    }
    if (userLoadingError) {
        return <ErrorMessage message={userLoadingError} onRetry={() => {
            loadUsers().catch(console.error);
        }}/>;
    }
    const handleCloseAssignDialog = () => {
        // Entferne aktiven Fokus direkt
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
        setOpenAssignDialog(false);
    };
    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        User Management
                    </Typography>

                    {isUserManager && (
                        <>
                            <Button variant="contained" sx={{mb: 2}} onClick={() => setOpenRoleDialog(true)}>
                                Add New Role
                            </Button>
                            <Button variant="outlined" sx={{mb: 2, ml: 2}} color="error"
                                    onClick={() => setOpenDeleteDialog(true)}>
                                Delete Role
                            </Button>
                        </>
                    )}

                    <Grid container spacing={2}>
                        {users.map(user => (
                            <Grid size={{xs: 12, md: 6}} key={user.id}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6">{user.name} ({user.username})</Typography>
                                        <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                                        <Grid container spacing={1} sx={{mt: 1}}>
                                            {user.rolesDTO.map(role => (
                                                <Grid key={role.id}>
                                                    <Chip
                                                        label={role.name}
                                                        color="primary"
                                                        onDelete={isUserManager ? () =>
                                                            handleRemoveRoleFromUser(user.id, role.id, user.username, role.name) : undefined}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                        {isUserManager && (
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                sx={{mt: 1}}
                                                onClick={() => handleAssignRole(user)}
                                            >
                                                Assign Role
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>

                <AssignRoleDialog
                    open={openAssignDialog}
                    onClose={handleCloseAssignDialog}
                    user={selectedUser}
                    refresh={fetchUsers}
                    disableRestoreFocus={true}
                />

                <RoleDialog
                    open={openRoleDialog}
                    onClose={() => setOpenRoleDialog(false)}
                    refresh={fetchUsers}
                    disableRestoreFocus={true}
                />
                <DeleteRoleDialog
                    open={openDeleteDialog}
                    onClose={() => setOpenDeleteDialog(false)}
                    refresh={fetchUsers}
                    disableRestoreFocus={true}
                />
            </Card>
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
export default UserManagement;