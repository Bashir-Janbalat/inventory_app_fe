import React, {useCallback, useEffect, useState} from "react";
import {
    Box,
    Button,
    Chip,
    FormControl,
    IconButton,
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
    useTheme
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useNavigate} from "react-router-dom";
import {PurchaseDTO, PurchaseItemDTO, PurchaseStatus} from "../../types/PurchaseDTO.ts";
import {useFetcher} from "../../hooks/useFetcher.ts";
import Loading from "../base/Loading.tsx";
import {ErrorMessage} from "../common/ErrorMessage.tsx";
import {getPurchases, updatePurchaseStatus} from "../../api/PurchaseApi.ts";
import {PurchaseDetailsRow} from "./PurchaseDetailsRow";


const Purchases: React.FC = () => {
    const [purchases, setPurchases] = useState<PurchaseDTO[]>([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const size = 6;
    const [openRows, setOpenRows] = useState<Record<number, boolean>>({});
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [searchDate, setSearchDate] = useState("");

    const fetchPurchases = useCallback(async () => {
        const pagedResponse = await getPurchases({page: page - 1, size, date: searchDate});
        setPurchases(pagedResponse.content);
        setTotalPages(pagedResponse.totalPages);
        return pagedResponse.content;
    }, [page, size, searchDate]);

    const {fetchData, loading, error} = useFetcher<PurchaseDTO[]>(fetchPurchases);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const calculateTotalAmount = (items: PurchaseItemDTO[]): number =>
        items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

    const calculateTotalQuantity = (items: PurchaseItemDTO[]): number =>
        items.reduce((sum, item) => sum + item.quantity, 0);

    const getStatusColor = (status?: PurchaseStatus) => {
        switch (status) {
            case PurchaseStatus.COMPLETED:
                return "success";
            case PurchaseStatus.CANCELLED :
                return "error";
            case PurchaseStatus.PENDING :
                return "warning";
            default:
                console.error("Not Supported: " + status);
        }
    };


    if (loading) {
        return <Loading fullScreen message="Loading Purchases..."/>;
    }
    if (error) {
        return <ErrorMessage message={error} onRetry={() => {
            void fetchData();
        }}/>;
    }
    const toggleRow = (id: number) => {
        setOpenRows((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleStatusChange = async (id: number | undefined, newStatus: PurchaseStatus) => {
        if (!id) return;

        try {
            await updatePurchaseStatus(id, newStatus);
            setPurchases((prev) =>
                prev.map((p) =>
                    p.id === id ? {...p, status: newStatus} : p
                )
            );
        } catch (error) {
            console.error("Status update failed", error);
        }
    };

    return (
        <Paper elevation={3} sx={{p: 3, maxWidth: {xs: "100%", md: 1100}, mx: "auto", mt: 4}}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 4}}>
                <Typography variant="h5" fontWeight="bold">Purchases</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleIcon/>}
                    onClick={() => navigate("/createPurchase")}
                >
                    Create Purchase
                </Button>
            </Stack>
            <Box display="flex" gap={2} mb={3} flexWrap="wrap" alignItems="flex-start">
                {/*Date Filter */}
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
                    setSearchDate("");
                    setPage(1);

                }}>
                    Clear Filters
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell><strong>Purchase Date</strong></TableCell>
                            <TableCell><strong>Supplier</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Total Products</strong></TableCell>
                            <TableCell><strong>Total Quantity</strong></TableCell>
                            <TableCell><strong>Total Amount</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {purchases.map((purchase) => (
                            <React.Fragment key={purchase.id}>
                                <TableRow>
                                    <TableCell>
                                        <IconButton size="small" onClick={() => toggleRow(purchase.id!)}>
                                            {openRows[purchase.id!] ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        {purchase.createdAt
                                            ? new Date(purchase.createdAt).toLocaleString("de-DE", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                            : "-"}
                                    </TableCell>
                                    <TableCell>{purchase.supplierName}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={purchase.status}
                                            color={getStatusColor(purchase.status as PurchaseStatus)}
                                            size="medium"
                                        />
                                    </TableCell>
                                    <TableCell>{purchase.items.length}</TableCell>
                                    <TableCell>{calculateTotalQuantity(purchase.items)}</TableCell>
                                    <TableCell>
                                        ${calculateTotalAmount(purchase.items).toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                    })}
                                    </TableCell>
                                    <TableCell>
                                        {purchase.status === PurchaseStatus.PENDING ? (
                                            <Select
                                                size="small"
                                                value={purchase.status === PurchaseStatus.PENDING ? "" : purchase.status}
                                                displayEmpty
                                                onChange={(e) =>
                                                    handleStatusChange(purchase.id, e.target.value as unknown as PurchaseStatus)
                                                }
                                                sx={{minWidth: 150}}
                                            >
                                                <MenuItem value="" disabled> Set Status...</MenuItem>
                                                <MenuItem value={PurchaseStatus.COMPLETED}>Completed</MenuItem>
                                                <MenuItem value={PurchaseStatus.CANCELLED}>Cancelled</MenuItem>
                                            </Select>
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>
                                </TableRow>
                                <PurchaseDetailsRow open={openRows[purchase.id!]} items={purchase.items}/>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
        </Paper>
    );
};

export default Purchases;
