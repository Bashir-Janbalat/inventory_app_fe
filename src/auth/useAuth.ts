import { useState, useEffect } from 'react';
import { isLoggedIn } from './auth';

export const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(isLoggedIn());

    useEffect(() => {
        setAuthenticated(isLoggedIn());
    }, []);

    return { authenticated };
};
