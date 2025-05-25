import {useContext, useEffect, useState} from "react";
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select} from "@mui/material";
import {UserDTO} from "../../types/UserDTO.ts";
import {RoleDTO} from "../../types/RoleDTO.ts";
import {assignRole, getRoles} from "../../api/userApi.ts";
import {DetailedApiError} from "../../errors/DetailedApiError.ts";
import AuthContext from "../../auth/AuthContext.tsx";


interface AssignRoleDialogProps {
    open: boolean;
    onClose: () => void;
    user: UserDTO | null;
    refresh: () => void;
}

export default function AssignRoleDialog({open, onClose, user, refresh}: AssignRoleDialogProps) {
    const [roles, setRoles] = useState<RoleDTO[]>([]);
    const [selectedRole, setSelectedRole] = useState<RoleDTO | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const {subject, roles: authRoles, setRoles: setAuthRoles} = useContext(AuthContext);


    useEffect(() => {
        if (open) {
            getRoles().then(setRoles).catch(error => {
                setError(error.message);
            });
            setSelectedRole(undefined);
            setError(null);
        }
    }, [open]);

    const handleAssign = async () => {
        if (!user) return;
        try {
            if (!selectedRole) {
                setError("Please select a role");
                return;
            }
            await assignRole(user.id, selectedRole);
            if (user.username === subject) {
                if (!authRoles) {
                    setAuthRoles([selectedRole.name]);
                } else if (!authRoles.includes(selectedRole.name)) {
                    setAuthRoles([...authRoles, selectedRole.name]);
                }
            }
            onClose();
            refresh();
        } catch (error: unknown) {
            if (error instanceof DetailedApiError) {
                setError(error.message);
            } else {
                setError("Failed to assign role");
            }
        }
    };
    const handleChangeRole = (roleName: string) => {
        const role = roles.find(r => r.name === roleName);
        setSelectedRole(role);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Assign Role to {user?.username}</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}
                <Select
                    fullWidth
                    value={selectedRole == null ? '' : selectedRole.name}
                    onChange={(e) => handleChangeRole(e.target.value)}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Select a role</MenuItem>
                    {roles.map(role => (
                        <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleAssign}>Assign</Button>
            </DialogActions>
        </Dialog>
    );
}
