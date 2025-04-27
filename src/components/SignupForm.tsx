import React, {useState} from "react";
import {UserDTO} from "../types/UserDTO";
import {Button, Container, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {signup} from "../auth/AuthApi.tsx";

const initialUser: UserDTO = {
    name: "",
    username: "",
    email: "",
    password: "",
};

const SignUpForm: React.FC = () => {
    const [user, setUser] = useState<UserDTO>(initialUser);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const validateForm = (values: UserDTO) => {
        const errors: { [key: string]: string } = {};
        if (!values.name) errors.name = "Name is required";
        if (!values.username) errors.username = "Username is required";
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Invalid email format";
        }
        if (!values.password) errors.password = "Password is required";
        else if (values.password.length < 8) errors.password = "Password must be at least 8 characters long";
        else if (!/[A-Z]/.test(values.password)) errors.password = "Password must contain at least one uppercase letter";
        else if (!/[a-z]/.test(values.password)) errors.password = "Password must contain at least one lowercase letter";
        else if (!/\d/.test(values.password)) errors.password = "Password must contain at least one number";
        else if (!/[@#$%^&+=]/.test(values.password)) errors.password = "Password must contain at least one special character";

        return errors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser((prevState) => ({...prevState, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm(user);
        if (Object.keys(validationErrors).length === 0) {
            setErrors(validationErrors);
            setLoading(true);
            setMessage("");
            try {
                const response = await signup(user);

                if (response.statusCode === 201) {
                    setMessage("Account created successfully! Redirecting to login...");
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                } else {
                    setMessage(response.message);
                }
            } catch (error) {
                setMessage("Registration failed." + error);
            } finally {
                setLoading(false);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={3} sx={{padding: 3}}>
                <Typography variant="h5" align="center" gutterBottom> Create a new account </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} direction="column">
                        <TextField
                            name="name"
                            label="Name"
                            value={user.name}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                        />
                        <TextField
                            name="username"
                            label="Username"
                            value={user.username}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={Boolean(errors.username)}
                            helperText={errors.username}
                        />
                        <TextField
                            name="email"
                            label="Email"
                            value={user.email}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />
                        <TextField
                            name="password"
                            label="Password"
                            value={user.password}
                            onChange={handleChange}
                            type="password"
                            fullWidth
                            variant="outlined"
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
                            {loading ? "Signing Up..." : "Sign Up"}
                        </Button>
                    </Grid>
                </form>

                {message && (
                    <Typography variant="body2" color={message.includes("failed") ? "error" : "success"} align="center"
                                sx={{marginTop: 2}}>
                        {message}
                    </Typography>
                )}

                <Grid container justifyContent="center" sx={{marginTop: 2}}>
                    <Link component={RouterLink} to="/login" variant="body2">
                        Already have an account? Log in here
                    </Link>
                </Grid>
            </Paper>
        </Container>
    );
};

export default SignUpForm;
