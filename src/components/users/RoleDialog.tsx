import React, {useState} from "react";
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {addRole} from "../../api/userApi.ts";

interface RoleDialogProps {
    open: boolean;
    onClose: () => void;
    refresh: () => void;
}

const RoleDialog: React.FC<RoleDialogProps> = ({open, onClose, refresh}) => {
    const [roleName, setRoleName] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleAdd = async () => {
        try {
            if (!roleName.trim()) {
                setError("Role name cannot be empty");
                return;
            }
            await addRole(roleName.trim());
            setRoleName("");
            setError(null);
            onClose();
            refresh();
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Error adding role");
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Role</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}
                <TextField
                    label="Role Name"
                    fullWidth
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    autoFocus
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleAdd}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default RoleDialog;
