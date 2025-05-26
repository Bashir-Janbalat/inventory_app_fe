import React, {useState} from 'react';
import {Box, Button, FormControl, FormLabel, Grid, MenuItem, TextField} from '@mui/material';

type FiltersProps = {
    onApply: (filters: FiltersState) => void;
};

export type FiltersState = {
    startDate?: string;
    endDate?: string;
    status?: number | '';
    errorType?: string;
    pathContains?: string;
    messageContains?: string;
    resolved?: boolean | null;
};

const statusOptions = [
    {label: 'All', value: ''},
    {label: '400', value: 400},
    {label: '401', value: 401},
    {label: '403', value: 403},
    {label: '404', value: 404},
    {label: '409', value: 409},
    {label: '500', value: 500},
];

const resolvedOptions = [
    {label: 'All', value: null},
    {label: 'Resolved', value: true},
    {label: 'Unresolved', value: false},
];

const ErrorLogFilters: React.FC<FiltersProps> = ({onApply}) => {
    const [filters, setFilters] = useState<FiltersState>({
        startDate: '',
        endDate: '',
        status: '',
        errorType: '',
        pathContains: '',
        messageContains: '',
        resolved: null,
    });

    const handleChange = (field: keyof FiltersState, value: any) => {
        setFilters(prev => ({...prev, [field]: value}));
    };

    const handleApply = () => {
        onApply(filters);
    };

    return (
        <Box mb={3}>
            <Grid container spacing={2}>
                <Grid size={{xs: 12, sm: 6, md: 6}}>
                    <FormControl fullWidth size="small">
                        <FormLabel>Start Date</FormLabel>
                        <TextField
                            type="date"
                            value={filters.startDate}
                            onChange={e => handleChange('startDate', e.target.value)}
                            size="small"
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 6}}>
                    <FormControl fullWidth size="small">
                        <FormLabel>End Date</FormLabel>
                        <TextField
                            type="date"
                            value={filters.endDate}
                            onChange={e => handleChange('endDate', e.target.value)}
                            size="small"
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 3}}>
                    <TextField
                        fullWidth
                        label="Status"
                        select
                        size="small"
                        value={filters.status}
                        onChange={e => handleChange('status', e.target.value === '' ? '' : Number(e.target.value))}
                    >
                        {statusOptions.map(opt => (
                            <MenuItem key={opt.value?.toString() ?? 'all'} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 3}}>
                    <TextField
                        fullWidth
                        label="Error Type"
                        size="small"
                        value={filters.errorType}
                        onChange={e => handleChange('errorType', e.target.value)}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 3}}>
                    <TextField
                        fullWidth
                        label="Path Contains"
                        size="small"
                        value={filters.pathContains}
                        onChange={e => handleChange('pathContains', e.target.value)}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 3}}>
                    <TextField
                        fullWidth
                        label="Message Contains"
                        size="small"
                        value={filters.messageContains}
                        onChange={e => handleChange('messageContains', e.target.value)}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 2}}>
                    <TextField
                        fullWidth
                        label="Resolved"
                        select
                        size="small"
                        value={filters.resolved === null ? '' : filters.resolved ? 'true' : 'false'}
                        onChange={e => {
                            const val = e.target.value;
                            handleChange('resolved', val === '' ? null : val === 'true');
                        }}
                    >
                        {resolvedOptions.map(opt => (
                            <MenuItem key={opt.value === null ? 'all' : opt.value.toString()}
                                      value={opt.value === null ? '' : opt.value.toString()}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 2}} display="flex" alignItems="center">
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleApply}
                    >
                        Apply
                    </Button>
                </Grid>
            </Grid>
        </Box>

    );
};

export default ErrorLogFilters;
