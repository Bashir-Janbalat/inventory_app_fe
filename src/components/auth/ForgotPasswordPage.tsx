
import {useNavigate} from "react-router-dom";
import CreateComponent from "../common/CreateComponent.tsx";
import {PageType} from "../../types/PageType.ts";
import {sendResetLink} from "../../api/AuthApi.ts";
import {FormField} from "../../types/FormField.ts";

const ForgotPasswordPage: React.FC = () => {
    const fields: FormField[] = [{name: 'email', label: 'email', type: 'email', required: true}];
    const navigate = useNavigate();

    const handleSubmit = async (values: Record<string, string>) => {
        await sendResetLink(values.email);
        navigate('/login');
    };

    return (<CreateComponent page={PageType.forgotPassword}
                             title="Forgot Password"
                             fields={fields}
                             submitButtonText={'Send reset link'}
                             onSubmit={handleSubmit}/>
    );
}

export default ForgotPasswordPage;