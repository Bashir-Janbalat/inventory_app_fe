import React, {useCallback, useContext} from 'react';
import {UpdateForm} from "../common/UpdateForm.tsx";
import AuthContext from "../../auth/AuthContext.tsx";

const MyProfile: React.FC = () => {
    const {subject, roles} = useContext(AuthContext);


    const fetcher = useCallback(async () => {
        return {
            username: subject,
            authority: roles,
        };
    }, [subject, roles]);


    const updater = useCallback(async () => {
        alert("Not implemented yet!");
    }, []);


    return (
        <UpdateForm
            fetcher={fetcher}
            updater={updater}
            redirectPath="/products"
        />
    );
};

export default MyProfile;
