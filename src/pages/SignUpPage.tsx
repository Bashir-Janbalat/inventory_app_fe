import React from "react";
import CreateComponent from "../components/common/CreateComponent.tsx";
import {FormField} from "../types/FormField.ts";
import {signup} from "../api/AuthApi.ts";
import {useNavigate} from "react-router-dom";
import {UserDTO} from "../types/UserDTO.ts";
import {PageType} from "../types/PageType.ts";

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();

    const signUpFields: FormField[] = [
        {name: 'name', label: 'Name', required: true},
        {name: 'username', label: 'Username', required: true},
        {name: 'email', label: 'Email', type: 'email', required: true},
        {name: 'password', label: 'password', type: 'password', required: true}];

    const handleSubmit = async (values: Record<string, string>) => {
        const userDTO: UserDTO = {
            name: values.name,
            username: values.username,
            email: values.email,
            password: values.password,
        };

        const status = await signup(userDTO);

        if (status !== 201) {
            throw new Error("Registration failed.");
        }

        navigate("/login");
    };

    return (
        <div>
            <CreateComponent page={PageType.signup}
                             title="Create a new account"
                             fields={signUpFields}
                             submitButtonText={'Sign Up'}
                             onSubmit={handleSubmit}
            />
        </div>
    );
};

export default SignUpPage;
