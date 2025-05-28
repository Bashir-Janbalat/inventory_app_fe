import React, {useCallback, useEffect, useState} from 'react';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
    Typography
} from '@mui/material';
import ErrorLogFilters, {FiltersState} from "../components/filters/ErrorLogFilters.tsx";
import {ErrorLogDTO} from "../types/ErrorLogDTO.ts";
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";
import {fetchLogs, markAsResolved} from "../api/ErrorLogApi.ts";
import GenericTable from "../components/common/GenericTable.tsx";
import {renderCenteredCells} from "../utils/StyleUtils.tsx";
import {useFetcher} from "../hooks/useFetcher.ts";
import Loading from "../components/base/Loading.tsx";
import {ErrorMessage} from "../components/common/ErrorMessage.tsx";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";


const ErrorLogPage: React.FC = () => {
    const [filters, setFilters] = useState<FiltersState>({});
    const [logs, setLogs] = useState<ErrorLogDTO[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 4;
    const [selectedLog, setSelectedLog] = useState<ErrorLogDTO | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);


    const fetchErrorLogs = useCallback(async () => {
        const response: PagedResponseDTO<ErrorLogDTO> = await fetchLogs({
            page: page - 1,
            size: pageSize,
            startDate: filters.startDate,
            endDate: filters.endDate,
            status: filters.status ? filters.status : undefined,
            errorType: filters.errorType,
            pathContains: filters.pathContains,
            messageContains: filters.messageContains,
            resolved: filters.resolved ?? undefined,
        });
        setLogs(response.content);
        setTotalPages(response.totalPages);
        return response.content;
    }, [page, filters]);

    const {fetchData, loading, error} = useFetcher<ErrorLogDTO[]>(fetchErrorLogs);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleFilterApply = (newFilters: FiltersState) => {
        setFilters(newFilters);
        setPage(1);
    };


    const handleMarkResolved = async (id: number) => {
        try {
            await markAsResolved(id);
            fetchData();
        } catch (error) {
            console.error('Failed to mark as resolved', error);
        }
    };
    const handleSeeDetails = (log: ErrorLogDTO) => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
        setSelectedLog(log);
        setDetailsOpen(true);
    };

    const handleCloseDetails = () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
        setDetailsOpen(false);
        setSelectedLog(null);
    };

    const columnTitles = [
        'Timestamp',
        'Status',
        'Error',
        'Message',
        'Path',
        'Resolved',
        'Resolved At'
    ];
    if (loading) {
        return <Loading fullScreen message="Loading ..."/>;
    }
    if (error) {
        return <ErrorMessage message={error} onRetry={() => {
            void fetchData();
        }}/>;
    }
    return (
        <Container>
            <Typography variant="h4" fontWeight="bold" mb={3}>
                Server Error Logs
            </Typography>

            <ErrorLogFilters onApply={handleFilterApply}/>

            <GenericTable<ErrorLogDTO>
                title="Error Logs"
                items={logs}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                createPath=""
                updatePath={() => `#`}
                deleteItem={async () => {
                    return 204
                }}
                columnTitles={columnTitles}
                renderColumns={(log) => (renderCenteredCells([
                        log.timestamp,
                        log.status,
                        log.error,
                        log.message,
                        log.path,
                        log.resolved ? 'Yes' : 'No',
                        log.resolvedAt ?? '-',
                    ])
                )}
                renderActions={(item) => {
                    return (
                        <>
                            <Tooltip title="See Details">
                                <IconButton color="info" onClick={() => handleSeeDetails(item)}>
                                    <VisibilityIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Mark as Resolved">
                                <IconButton color="success" onClick={() => handleMarkResolved(item.id)}>
                                    <CheckCircleIcon/>
                                </IconButton>
                            </Tooltip>
                        </>
                    )
                }}
            />
            <Dialog open={detailsOpen} onClose={handleCloseDetails} fullWidth maxWidth="md" disableRestoreFocus={true}>
                <DialogTitle>Error Details</DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle2" gutterBottom>
                        Stack Trace:
                    </Typography>
                    <pre style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>
                        {selectedLog?.stackTrace || 'No stack trace available.'}
                    </pre>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetails}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ErrorLogPage;
