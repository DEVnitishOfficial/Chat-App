import React, { useCallback, useState } from "react";
import * as Yup from "yup";
// import { object, string, number, date, InferType } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { Stack, Alert, Button } from "@mui/material";
import { RHFTextField } from "../../components/hook-form";

const ProfileForm = () => {
  const ProfileFromSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    avatarUrl: Yup.string().required("avatar"),
  });

  const defaultValues = {
    name: "",
    about: "",
  };
  const methods = useForm({
    resolver: yupResolver(ProfileFromSchema),
    defaultValues,
  });
  const {
    reset,
    watch,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const values = watch();
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatarUrl",newFile,{shouldValidate:true});
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    try {
      console.log("Data", data);
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
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert>{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="name" label="Name" helperText={"This name will be visible to your contact"} />
        
        <RHFTextField multiline rows={4} maxRows={5} name="about" label="about" />
      </Stack> 
      <Stack direction={'row'} justifyContent={'end'}>
        <Button  color="primary" size='large' type='submit' variant="outlined" >Save</Button>
      </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
