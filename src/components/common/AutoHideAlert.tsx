import React, { useEffect, useRef, useState } from "react";
import { Alert } from "@mui/material";
import {MessageType} from "../../types/MessageType.ts";

interface Props {
    message: string;
    timeoutDuration?: number;
    type?: MessageType;
}

const AutoHideAlert: React.FC<Props> = ({ message, timeoutDuration = 3000, type = MessageType.info }) => {
    const [visible, setVisible] = useState(true);
    const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setVisible(true);
        timeoutId.current = setTimeout(() => {
            setVisible(false);
        }, timeoutDuration);

        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, [message, timeoutDuration, type]);

    if (!visible) {
        return null;
    }

    return (
        <Alert severity={type} sx={{ mb: 2 }}>
            {message}
        </Alert>
    );
};

export default AutoHideAlert;
