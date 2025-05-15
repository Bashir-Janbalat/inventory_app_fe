import React, {useCallback, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Pagination,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import {useFetcher} from "../../hooks/useFetcher.ts";
import {getStockMovements} from "../../api/StockMovementsApi.ts";
import {StockMovementsDTO} from "../../types/StockMovementsDTO.ts";
import Loading from "../base/Loading.tsx";
import {ErrorMessage} from "../common/ErrorMessage.tsx";

const StockMovements: React.FC = () => {
    const [stockMovements, setStockMovements] = useState<StockMovementsDTO[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [movementType, setMovementType] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const size = 9;
    const TABLE_HEADER_CELL_STYLE = {fontWeight: "bold", borderBottom: "2px solid #ccc"};

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));


    const fetchStockMovements = useCallback(async () => {
        const pagedResponse =
            await getStockMovements(page - 1, size, "createdAt", "asc", searchDate, movementType);
        setStockMovements(pagedResponse.content);
        setTotalPages(pagedResponse.totalPages);
        return pagedResponse.content;
    }, [page, searchDate, movementType]);

    const {fetchData, loading, error} = useFetcher<StockMovementsDTO[]>(fetchStockMovements);

    useEffect(() => {
        fetchData().catch(console.error);
    }, [fetchData]);

    if (loading) {
        return <Loading fullScreen message="Loading Stock Movements..."/>;
    }
    if (error) {
        return <ErrorMessage message={error} onRetry={() => {
            void fetchData();
        }}/>;
    }

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Stock Movements
            </Typography>

            <Box display="flex" gap={2} mb={3} flexWrap="wrap" alignItems="flex-end">
                {/* Movement Type Filter */}
                <FormControl sx={{minWidth: 150}} size="small">
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={movementType}
                        label="Type"
                        onChange={(e) => {
                            setMovementType(e.target.value);
                            setPage(1);
                        }}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="IN">IN</MenuItem>
                        <MenuItem value="OUT">OUT</MenuItem>
                        <MenuItem value="RETURN">RETURN</MenuItem>
                        <MenuItem value="TRANSFER">TRANSFER</MenuItem>
                        <MenuItem value="DAMAGED">DAMAGED</MenuItem>
                    </Select>
                </FormControl>

                {!isSmallScreen && (
                    <FormControl sx={{minWidth: 180}} size="small">
                        <InputLabel shrink htmlFor="date-input">Date</InputLabel>
                        <OutlinedInput
                            id="date-input"
                            type="date"
                            value={searchDate}
                            onChange={(e) => {
                                setSearchDate(e.target.value);
                                setPage(1);
                            }}
                            notched
                        />
                    </FormControl>
                )}

                <Button variant="outlined" onClick={() => {
                    setMovementType("");
                    setSearchDate("");
                    setPage(1);

                }}>
                    Clear Filters
                </Button>
            </Box>

            {/* Table */}
            <TableContainer component={Paper} sx={{overflowX: "auto"}}>
                <Table sx={{minWidth: 800}}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={TABLE_HEADER_CELL_STYLE}>Date</TableCell>
                            <TableCell sx={TABLE_HEADER_CELL_STYLE}>Warehouse</TableCell>
                            <TableCell sx={TABLE_HEADER_CELL_STYLE}>Type</TableCell>
                            <TableCell sx={TABLE_HEADER_CELL_STYLE}>Reason</TableCell>
                            <TableCell sx={TABLE_HEADER_CELL_STYLE}>Product</TableCell>
                            <TableCell sx={TABLE_HEADER_CELL_STYLE}>Quantity</TableCell>
                            <TableCell sx={TABLE_HEADER_CELL_STYLE}>Username</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stockMovements.map((row) => (
                            <TableRow key={row.id} style={{
                                textDecoration: row.productDeleted ? 'line-through' : 'none',
                                color: row.productDeleted ? '#a00' : 'inherit',
                                fontWeight: row.productDeleted ? 'bold' : 'normal',
                            }}>
                                <TableCell>{row.createdAt}</TableCell>
                                <TableCell>{row.warehouseName}</TableCell>
                                <TableCell>{row.movementType}</TableCell>
                                <TableCell>{row.reason}</TableCell>
                                <TableCell>{row.productDeleted ? row.productNameSnapshot : row.productName}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{row.username}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <Stack direction="row" justifyContent="center" alignItems="center" marginTop={4}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_event, value) => setPage(value)}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </Stack>
        </Container>
    );
}

export default StockMovements;
