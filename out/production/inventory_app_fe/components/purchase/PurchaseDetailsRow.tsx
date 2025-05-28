import React from "react";
import {Box, Collapse, Table as MuiTable, TableBody, TableCell, TableHead, TableRow,} from "@mui/material";
import {PurchaseItemDTO} from "../../types/PurchaseDTO.ts";

type Props = {
    open: boolean;
    items: PurchaseItemDTO[];
};

export const PurchaseDetailsRow: React.FC<Props> = ({open, items}) => {
    return (
        <TableRow sx={{
            "& td": {
                borderBottom: "none",
            },
        }}>
            <TableCell
                colSpan={7}
                sx={{paddingBottom: 0, paddingTop: 0, textAlign: "center"}}
            >
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <MuiTable size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Product</strong></TableCell>
                                    <TableCell><strong>Sku</strong></TableCell>
                                    <TableCell><strong>Warehouse</strong></TableCell>
                                    <TableCell><strong>Quantity</strong></TableCell>
                                    <TableCell><strong>Unit Price</strong></TableCell>
                                    <TableCell><strong>Total</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.productName}</TableCell>
                                        <TableCell>{item.sku}</TableCell>
                                        <TableCell>{item.warehouseName}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                                        <TableCell>
                                            ${(item.quantity * item.unitPrice).toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </MuiTable>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};
