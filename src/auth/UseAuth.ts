import { useState, useEffect } from 'react';
import { isLoggedIn } from './Auth.ts';

export const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(isLoggedIn());

    useEffect(() => {
        setAuthenticated(isLoggedIn());
    }, []);

    return { authenticated };
};
