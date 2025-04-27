import React, {useState} from "react";
import {UserDTO} from "../types/UserDTO";
import {Button, Container, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {signup} from "../auth/AuthApi.tsx";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[@#$%^&+=]/, "Password must contain at least one special character")
        .required("Password is required"),
});

const initialUser: UserDTO = {
    name: "",
    username: "",
    email: "",
    password: "",
};

const SignUpForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (values: UserDTO) => {
        setLoading(true);
        setMessage("");
        try {
            const response = await signup(values);

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
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={3} sx={{padding: 3}}>
                <Typography variant="h5" align="center" gutterBottom>
                    Create a new account
                </Typography>
                <Formik
                    initialValues={initialUser}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting, isValid, dirty, touched, errors}) => (
                        <Form>
                            <Grid container spacing={2} direction="column">
                                <Field
                                    name="name"
                                    label="Name"
                                    as={TextField}
                                    fullWidth
                                    variant="outlined"
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                    InputProps={{
                                        style: {
                                            borderColor: touched.name && !errors.name ? 'green' : '',
                                        }
                                    }}
                                />
                                <Field
                                    name="username"
                                    label="Username"
                                    as={TextField}
                                    fullWidth
                                    variant="outlined"
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={touched.username && errors.username}
                                    InputProps={{
                                        style: {
                                            borderColor: touched.username && !errors.username ? 'green' : '',
                                        }
                                    }}
                                />
                                <Field
                                    name="email"
                                    label="Email"
                                    as={TextField}
                                    fullWidth
                                    variant="outlined"
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    InputProps={{
                                        style: {
                                            borderColor: touched.email && !errors.email ? 'green' : '',
                                        }
                                    }}
                                />
                                <Field
                                    name="password"
                                    label="Password"
                                    as={TextField}
                                    type="password"
                                    fullWidth
                                    variant="outlined"
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    InputProps={{
                                        style: {
                                            borderColor: touched.password && !errors.password ? 'green' : '',
                                        }
                                    }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting || loading || !(isValid && dirty)}
                                >
                                    {loading ? "Signing Up..." : "Sign Up"}
                                </Button>
                            </Grid>
                        </Form>
                    )}
                </Formik>

                {message && (
                    <Typography
                        variant="body2"
                        color={message.includes("failed") ? "error" : "success"}
                        align="center"
                        sx={{marginTop: 2}}
                    >
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
