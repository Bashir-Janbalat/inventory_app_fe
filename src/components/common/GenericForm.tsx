import {Box, Button, CircularProgress, Grid, Link, Paper, Stack, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {TextField as FormikTextField} from "formik-mui";
import * as Yup from "yup";
import {GenericFormProps} from "../../types/GenericFormProps.ts";
import {PageType} from "../../types/PageType.ts";
import {Link as RouterLink} from "react-router";
import {useNavigate} from "react-router-dom";
import CustomSnackbar from "./CustomSnackbar.tsx";

const GenericForm: React.FC<GenericFormProps> = ({page, title, fields, submitButtonText, onSubmit, backTo}) => {
    const [pageType, setPageType] = useState<PageType>(PageType.signup);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        setPageType(page)
    }, [page]);


    const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
    }, {} as Record<string, string>);

    const schemaFields = fields.reduce((schema, field) => {
        let validator = Yup.string();

        if (field.type === "email") {
            validator = validator.email("Invalid email format");
        }

        if (field.type === "password") {
            validator = validator
                .min(8, "Password must be at least 8 characters long")
                .matches(/[A-Z]/, "Must contain an uppercase letter")
                .matches(/[a-z]/, "Must contain a lowercase letter")
                .matches(/\d/, "Must contain a number")
                .matches(/[@#$%^&+=]/, "Must contain a special character")
                .required("Password is required");
        }

        if (field.required) {
            validator = validator.required("This field is required");
        }

        schema[field.name] = validator;
        return schema;
    }, {} as Record<string, Yup.AnySchema>);

    if (pageType === PageType.resetPassword || pageType === PageType.signup) {
        schemaFields["confirmPassword"] = Yup.string()
            .required("Please confirm your password")
            .oneOf([Yup.ref("password")], "Passwords must match");
    }

    const validationSchema = Yup.object(schemaFields);


    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            minHeight="100vh"
            bgcolor="background.default"
            p={2}
        >
            <Paper elevation={3} sx={{p: {xs: 3, sm: 5}, width: "100%", maxWidth: 'sm'}}>
                <Typography variant="h5" component="h1" fontWeight="bold" textAlign="center" gutterBottom>
                    {title}
                </Typography>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, {setSubmitting, resetForm}) => {
                        try {
                            await onSubmit(values);
                            let successMessage = "Successfully submitted!";
                            switch (pageType) {
                                case PageType.signup:
                                    successMessage = "Account created successfully!";
                                    break;
                                case PageType.login:
                                    successMessage = "Welcome back!";
                                    break;
                                case PageType.resetPassword:
                                    successMessage = "Password has been reset successfully!";
                                    break;
                                case PageType.forgotPassword:
                                    successMessage = "Reset link sent to your email.";
                                    break;
                            }
                            setSnackbarMessage(successMessage);
                            setSnackbarSeverity("success");
                            setSnackbarOpen(true);
                            resetForm();
                        } catch (error: unknown) {
                            if (error instanceof Error) {
                                setSnackbarMessage(error.message);
                                setSnackbarSeverity("error");
                                setSnackbarOpen(true);
                            } else {
                                setSnackbarMessage("Something went wrong. Please try again.");
                                setSnackbarSeverity("error");
                                setSnackbarOpen(true);
                            }
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({isSubmitting}) => (
                        <Form noValidate>
                            <Stack spacing={2}>
                                {fields.map((field) => {
                                    const isPassword = field.type === "password";
                                    return (
                                        <Field
                                            disabled={isSubmitting}
                                            key={field.name}
                                            component={FormikTextField}
                                            name={field.name}
                                            label={field.label}
                                            type={isPassword && field.type === "password" && showPassword ? "text" : field.type}
                                            variant="outlined"
                                            fullWidth
                                            required={field.required}
                                            autoComplete={
                                                field.type === "password"
                                                    ? (pageType === PageType.login ? "current-password" : "new-password")
                                                    : field.type === "email"
                                                        ? "email"
                                                        : "on"
                                            }
                                            InputProps={
                                                isPassword && field.name === "password"
                                                    ? {
                                                        endAdornment: (
                                                            <Button
                                                                onClick={() => setShowPassword((prev) => !prev)}
                                                                size="small"
                                                            >
                                                                {showPassword ? "Hide" : "Show"}
                                                            </Button>
                                                        )
                                                    }
                                                    : undefined
                                            }
                                        />
                                    );
                                })}

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    disabled={isSubmitting}
                                    fullWidth
                                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit"/> : null}
                                    sx={{
                                        transition: "all 0.3s ease",
                                        transform: isSubmitting ? "scale(0.98)" : "scale(1)",
                                        opacity: isSubmitting ? 0.7 : 1,
                                    }}
                                >
                                    {isSubmitting ? "Loading..." : submitButtonText}
                                </Button>
                                {backTo && (
                                    <Button variant="outlined" color="secondary" onClick={handleBack}>
                                        Back
                                    </Button>
                                )}
                                <CustomSnackbar
                                    open={snackbarOpen}
                                    message={snackbarMessage}
                                    severity={snackbarSeverity}
                                    onClose={() => setSnackbarOpen(false)}
                                />
                                {pageType === PageType.signup && (
                                    <Grid container justifyContent="center" sx={{marginTop: 2}}>
                                        <Link component={RouterLink} to="/login" variant="body2">
                                            Already have an account? Log in here
                                        </Link>
                                    </Grid>
                                )}
                                {pageType === PageType.login && (
                                    <Grid container justifyContent="center"
                                          sx={{marginTop: 2, flexDirection: 'column', alignItems: 'center'}}>
                                        <Link component={RouterLink} to="/signup" variant="body2"
                                              sx={{marginBottom: 1}}>
                                            Don't have an account? Sign Up here
                                        </Link>

                                        <Link component={RouterLink} to="/forgot-password" variant="body2">
                                            Forgot Password?
                                        </Link>
                                    </Grid>
                                )}
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    );
};

export default GenericForm;
