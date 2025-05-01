import React from 'react';
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import {GenericFormProps} from "../../types/GenericFormProps.ts";
import GenericForm from "./GenericForm.tsx";


const CreateComponent: React.FC<GenericFormProps> = ({page, title, fields, submitButtonText, onSubmit }) => {
    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 700, mx: 'auto' }}>
            <Card elevation={4} sx={{ borderRadius: 4 }}>
                <CardHeader
                    title='Inventory Management System'
                    slotProps={{
                        title: {
                            typography: 'h5',
                            sx: { textAlign: 'center' }
                        }
                    }}
                    sx={{ pb: 0 }}
                />
                <CardContent>
                    <GenericForm page={page} title={title} fields={fields} submitButtonText={submitButtonText} onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </Box>
    );
};

export default CreateComponent;
