import React from 'react';
import {TableCell} from '@mui/material';

export const renderCenteredCells =
    (values: React.ReactNode[], options?: {
        align?: 'center' | 'left' | 'right';
        fontSize?: string
    }): React.ReactNode[] => {
        const align = options?.align || 'center';
        const fontSize = options?.fontSize || '1rem';

        return values.map((value, index) => (
            <TableCell key={index} sx={{textAlign: align, fontSize}}>
                {value}
            </TableCell>
        ));
    };