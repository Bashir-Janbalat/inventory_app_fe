import { useEffect, useRef, useState } from "react";
import { Alert } from "@mui/material";

interface Props {
    message: string;
    timeoutDuration?: number;
}

const SuccessMessage: React.FC<Props> = ({ message, timeoutDuration = 3000 }) => {
    const [visible, setVisible] = useState(true);
    const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        timeoutId.current = setTimeout(() => {
            setVisible(false);
        }, timeoutDuration);

        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, [timeoutDuration]);

    if (!visible) {
        return null;
    }

    return (
        <Alert severity="success" sx={{ mb: 2 }}>
            {message}
        </Alert>
    );
};

export default SuccessMessage;
