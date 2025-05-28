import React from 'react';
import {TableCell, Tooltip} from '@mui/material';

export const renderCenteredCells = (
    values: React.ReactNode[],
    options?: {
        align?: 'center' | 'left' | 'right';
        fontSize?: string;
    }
): React.ReactNode[] => {
    const align = options?.align || 'center';
    const fontSize = options?.fontSize || '1rem';
    const MAX_COLUMN_LENGTH = 50;

    const truncateText = (text: unknown, maxLength: number = MAX_COLUMN_LENGTH): { display: string, full: string } => {
        const str = String(text ?? '');
        const isTruncated = str.length > maxLength;
        return {
            display: isTruncated ? str.substring(0, maxLength) + '...' : str,
            full: str
        };
    };

    return values.map((value, index) => {
        const {display, full} = truncateText(value);

        return (
            <TableCell key={index} sx={{textAlign: align, fontSize}}>
                {display !== full ? (
                    <Tooltip title={full}>
                        <span>{display}</span>
                    </Tooltip>
                ) : (
                    display
                )}
            </TableCell>
        );
    });
};
