import CreateComponent from "../components/common/CreateComponent.tsx";
import {PageType} from "../types/PageType.ts";
import {FormField} from "../types/FormField.ts";
import {resetPassword} from "../api/AuthApi.ts";
import {useNavigate} from "react-router-dom";

const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const fields: FormField[] = [
        {name: 'password', label: 'new Password', type: 'password', required: true},
        {name: 'confirmPassword', label: 'confirm Password', type: 'password', required: true}];
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    const handleSubmit = async (values: Record<string, string>) => {
        const newPassword = values.password;
        if (token) {
            await resetPassword({token, newPassword});
            navigate('/login');
        }
    };

    return (<CreateComponent page={PageType.resetPassword}
                             title="Reset Password"
                             fields={fields}
                             submitButtonText={'Reset Password'}
                             onSubmit={handleSubmit}/>
    );
}
export default ResetPasswordPage;