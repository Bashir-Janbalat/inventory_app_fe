import {Alert, Box, Button, CircularProgress, Grid, Link, Paper, Stack, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {TextField as FormikTextField} from "formik-mui";
import * as Yup from "yup";
import {GenericFormProps} from "../../types/GenericFormProps.ts";
import {PageType} from "../../types/PageType.ts";
import {Link as RouterLink} from "react-router";
import {useNavigate} from "react-router-dom";

const GenericForm: React.FC<GenericFormProps> = ({page, title, fields, submitButtonText, onSubmit, backTo}) => {
    const [apiError, setApiError] = useState<string | null>(null);
    const [apiSuccess, setApiSuccess] = useState<string | null>(null);
    const [pageType, setPageType] = useState<PageType>(PageType.signup);
    const navigate = useNavigate();

    useEffect(() => {
        setPageType(page)
    }, [page]);


    const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
    }, {} as Record<string, string>);

    const validationSchema = Yup.object(
        fields.reduce((schema, field) => {
            let validator = Yup.string();
            if (field.type === "email") {
                validator = validator.email("Invalid email format");
            }
            if (field.type === "password") {
                validator = validator
                    .min(8, "Password must be at least 8 characters long")
                    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
                    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
                    .matches(/\d/, "Password must contain at least one number")
                    .matches(/[@#$%^&+=]/, "Password must contain at least one special character")
                    .required("Password is required")
            }
            if (field.required) {
                validator = validator.required("This field is required");
            }
            schema[field.name] = validator;
            return schema;
        }, {} as Record<string, Yup.AnySchema>)
    );
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
                        setApiError(null);
                        setApiSuccess(null);

                        try {
                            await onSubmit(values);
                            setApiSuccess("Successfully submitted!");
                            resetForm();
                        } catch (error: unknown) {
                            if (error instanceof Error) {
                                setApiError(error.message);
                            } else {
                                setApiError("Something went wrong. Please try again.");
                            }
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({isSubmitting}) => (
                        <Form noValidate>
                            <Stack spacing={2}>
                                {fields.map((field) => (
                                    <Field
                                        key={field.name}
                                        component={FormikTextField}
                                        name={field.name}
                                        type={field.type || "text"}
                                        label={field.label}
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
                                    />
                                ))}

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
                                {apiError && (
                                    <Alert severity="error" sx={{mt: 2, align: "center"}}>
                                        {apiError}
                                    </Alert>
                                )}

                                {apiSuccess && (
                                    <Alert severity="success" sx={{mt: 2, align: "center"}}>
                                        {apiSuccess}
                                    </Alert>
                                )}
                                {pageType === PageType.signup && (
                                    <Grid container justifyContent="center" sx={{marginTop: 2}}>
                                        <Link component={RouterLink} to="/login" variant="body2">
                                            Already have an account? Log in here
                                        </Link>
                                    </Grid>
                                )}
                                {pageType === PageType.login && (
                                    <Grid container justifyContent="center" sx={{marginTop: 2}}>
                                        <Link component={RouterLink} to="/signup" variant="body2">
                                            Don't have an account? Sign Up here
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
