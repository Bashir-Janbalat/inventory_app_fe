import React, {useEffect, useState} from "react";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import {deleteRole, getRoles} from "../../api/userApi.ts";
import {RoleDTO} from "../../types/RoleDTO.ts";
import {DetailedApiError} from "../../errors/DetailedApiError.ts";

interface DeleteRoleDialogProps {
    open: boolean;
    onClose: () => void;
    refresh: () => void;
}

const DeleteRoleDialog: React.FC<DeleteRoleDialogProps> = ({open, onClose, refresh}) => {
    const [roles, setRoles] = useState<RoleDTO[]>([]);
    const [selectedRoleId, setSelectedRoleId] = useState<number | "">("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            getRoles().then(setRoles).catch(() => setError("Failed to load roles"));
        }
    }, [open]);

    const handleDelete = async () => {
        if (selectedRoleId === "") {
            setError("Please select a role to delete.");
            return;
        }

        try {
            await deleteRole(selectedRoleId);
            setSelectedRoleId("");
            setError(null);
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

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}
                <FormControl fullWidth>
                    <InputLabel>Select Role</InputLabel>
                    <Select
                        value={selectedRoleId}
                        onChange={(e) => setSelectedRoleId(e.target.value as number)}
                        label="Select Role"
                    >
                        {roles.map(role => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteRoleDialog;
