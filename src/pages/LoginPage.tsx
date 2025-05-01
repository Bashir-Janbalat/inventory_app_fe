import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from "../hooks/useAuth.ts";
import {getSubjectFromToken, removeToken, saveToken} from "../auth/AuthUtils.ts";
import {FormField} from "../types/FormField.ts";
import CreateComponent from "../components/common/CreateComponent.tsx";
import {PageType} from "../types/PageType.ts";
import {login} from "../api/AuthApi.tsx";
import AutoHideAlert from "../components/common/AutoHideAlert.tsx";
import {MessageType} from "../types/MessageType.ts";

const LoginPage = () => {
    const navigate = useNavigate();
    const {authenticated, setAuthenticated, setSubject} = useAuth();
    const location = useLocation();

    const {error: stateErrorMessage, success: stateSuccessMessage} = location.state || {};
    const loginFields: FormField[] = [
        {name: 'username', label: 'Username', required: true},
        {name: 'password', label: 'password', type: 'password', required: true}];


    useEffect(() => {
            removeToken();

        }, [authenticated, navigate]
    );

    const handleSubmit = async (values: Record<string, string>) => {
        const {username, password} = values;
        const response = await login(username, password);

        if (!response.accessToken) {
            throw new Error('Login failed: No access token received.');
        }

        saveToken(response.accessToken);
        setAuthenticated(true);
        setSubject(getSubjectFromToken(response.accessToken));
        navigate('/products');
    };

    return (
        <div>
            {stateErrorMessage &&
                <AutoHideAlert message={stateErrorMessage} type={MessageType.error} timeoutDuration={3000}/>}
            {stateSuccessMessage &&
                <AutoHideAlert message={stateSuccessMessage} type={MessageType.success} timeoutDuration={3000}/>}
            <CreateComponent page={PageType.login}
                             title="Login"
                             fields={loginFields}
                             submitButtonText={'Login'}
                             onSubmit={handleSubmit}/>
        </div>

    );
};

export default LoginPage;
