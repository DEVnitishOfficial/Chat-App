import React, { useState } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormProvider from '../../components/hook-form/FormProvider';
import { Alert, Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { RHFTextField } from '../../components/hook-form';
import { Eye, EyeSlash } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { RegisterUser } from '../../redux/slices/auth';

const RegisterForm = () => {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const registerSchema = Yup.object().shape({
    firstName : Yup.string().required("firstName is requried"),
    lastName : Yup.string().required("lastName is requried"),
    email : Yup.string().required("email is required").email("enter a valid email address"),
    password: Yup.string().required("password is required")
  });

  const defaultValues = {
    firstName:"nitish",
    lastName:"kumar",
    email:"nitish@gmail.com",
    password:"nitish@123" 
  }

  const methods = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues
  })
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    // send data to backend
    dispatch(RegisterUser(data))
    try {
    } catch (error) {
      console.log("error from react from submitting>>", error);
      reset();
      setError("afterSubmit", {
        ...errors,
        message: errors.message,
      });
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
      {!!errors.afterSubmit && <Alert>{errors.afterSubmit.message}</Alert>}
      <Stack direction={{xs:"column", sm:"row" }} spacing={2}>
        <RHFTextField name="firstName" label="First Name"/>
        <RHFTextField name="lastName" label="Last Name"/>
      </Stack>
      <RHFTextField name="email" label="Email Address" />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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
        Create Account
      </Button>
      </Stack>
    </FormProvider>
  )
}

export default RegisterForm