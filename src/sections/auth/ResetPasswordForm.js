import React, { useState } from "react";
import * as Yup from "yup";
// import { object, string, number, date, InferType } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import {
  Stack,
  Alert,
  Button,
} from "@mui/material";
import { RHFTextField } from "../../components/hook-form";
import { useDispatch } from "react-redux";
import { ForgotPassword } from "../../redux/slices/auth";

const ResetPasswordForm = () => {
  const dispatch = useDispatch()

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Entre a valid email address"),
  });

  const defaultValues = {
    email: "demo@gmail.com",
  };
  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    // submit data to backend
    dispatch(ForgotPassword(data))
    try {
    } catch (error) {
      console.log("error from react from submitting>>", error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert>{errors.afterSubmit.message}</Alert>}
        <RHFTextField name="email" label="Email Address" />
        <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "#079bdb",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "gray.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "gray.800",
          },
        }}
      >
        Send Request
      </Button>
      </Stack>
      
    </FormProvider>
  );
};

export default ResetPasswordForm;
