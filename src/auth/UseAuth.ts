import { useState, useEffect } from 'react';
import {isLoggedIn} from "./Auth.ts";

export const UseAuth = () => {
    const [authenticated, setAuthenticated] = useState<boolean>(isLoggedIn());

    useEffect(() => {
        // Event listener لتحديث حالة التوكن إذا تغير في `localStorage`
        const tokenChangeHandler = () => {
            setAuthenticated(isLoggedIn());
        };

        // مراقبة التغييرات في localStorage
        window.addEventListener('storage', tokenChangeHandler);

        // التأكد من إلغاء الاشتراك عند الـ unmount
        return () => {
            window.removeEventListener('storage', tokenChangeHandler);
        };
    }, []); // فقط عند أول تحميل

    return { authenticated };
};

