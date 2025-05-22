import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from "../hooks/useAuth.ts";
import {getRolesFromToken, getSubjectFromToken, saveToken} from "../utils/AuthUtils.ts";
import {FormField} from "../types/FormField.ts";
import CreateComponent from "../components/common/CreateComponent.tsx";
import {PageType} from "../types/PageType.ts";
import {login} from "../api/AuthApi.ts";
import {Alert} from "@mui/material";

const LoginPage = () => {
    const navigate = useNavigate();
    const {authenticated, setAuthenticated, setSubject,setRoles} = useAuth();
    const location = useLocation();
    const [stateSuccessMessage, setStateSuccessMessage] = useState(null);
    const [stateErrorMessage, setStateErrorMessage] = useState(null);

    const loginFields: FormField[] = [
        {name: 'username', label: 'Username', required: true},
        {name: 'password', label: 'password', type: 'password', required: true}];


    useEffect(() => {
        setStateSuccessMessage(location.state?.success);
        setStateErrorMessage(location.state?.error);
        if (authenticated) {
            navigate('/products');
        }
    }, [authenticated, navigate]);

    const handleSubmit = async (values: Record<string, string>) => {
        setStateSuccessMessage(null);
        setStateErrorMessage(null);
        const {username, password} = values;
        const response = await login(username, password);
        saveToken(response.accessToken);
        setAuthenticated(true);
        setSubject(getSubjectFromToken(response.accessToken));
        setRoles(getRolesFromToken(response.accessToken));
        navigate('/products');
    };

    return (
        <div>
            {stateErrorMessage && <Alert severity="error" sx={{mb: 2}}>{stateErrorMessage}</Alert>}
            {stateSuccessMessage && <Alert severity="success" sx={{mb: 2}}>{stateSuccessMessage}</Alert>}
            <CreateComponent page={PageType.login}
                             title="Login"
                             fields={loginFields}
                             submitButtonText={'Login'}
                             onSubmit={handleSubmit}/>
        </div>

    );
};

export default LoginPage;
