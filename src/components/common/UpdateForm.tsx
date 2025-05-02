import React, {useEffect, useState} from 'react';
import {useFetcher} from '../../hooks/useFetcher';
import {useNavigate} from 'react-router-dom';
import {Alert, Button, CircularProgress, Container, Stack, TextField, Typography} from '@mui/material';

interface UpdateFormProps<T extends object> {
    id: number;
    fetcher: () => Promise<T>;
    updater: (data: T) => Promise<void>;
    redirectPath: string;
}

export function UpdateForm<T extends object>({
                                                 fetcher,
                                                 updater,
                                                 redirectPath,
                                             }: UpdateFormProps<T>) {
    const {data, loading, error, fetchData} = useFetcher(fetcher);
    const [formValues, setFormValues] = useState<Partial<T>>({});
    const navigate = useNavigate();
    const [updateError, setUpdateError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (data) setFormValues(data);
    }, [data]);

    const handleChange = (key: keyof T, value: string) => {
        setFormValues((prev) => ({...prev, [key]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formValues) return;
        try {
            await updater(formValues as T);
            navigate(redirectPath);
        } catch (err) {
            if (err instanceof Error) {
                setUpdateError(err.message);
            } else {
                setUpdateError("An unexpected error occurred.");
            }
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <Stack alignItems="center" justifyContent="center" minHeight="50vh">
                <CircularProgress/>
            </Stack>
        );
    }

    if (error) {
        return (
            <Stack spacing={2} alignItems="center" justifyContent="center" minHeight="50vh">
                <Alert severity="error">{error}</Alert>
            </Stack>
        );
    }

    if (!data) {
        return (
            <Stack spacing={2} alignItems="center" justifyContent="center" minHeight="50vh">
                <Typography variant="h6">No data found</Typography>
            </Stack>
        );
    }

    return (
        <Container maxWidth="sm" sx={{mt: 4}}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    {updateError && (
                        <Alert severity="error">{updateError}</Alert>
                    )}
                    {Object.entries(formValues).map(([key, value]) => (
                        <TextField
                            key={key}
                            label={key}
                            value={value as string}
                            onChange={(e) => handleChange(key as keyof T, e.target.value)}
                            fullWidth
                        />
                    ))}
                    <Stack direction="row" spacing={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Update
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleBack}>
                            Back
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Container>
    );
}
