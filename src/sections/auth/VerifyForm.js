import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, FormProvider as RHFFormProvider } from "react-hook-form";
import * as Yup from "yup";
import { Button, Stack } from "@mui/material";
import RHFCode from "../../components/hook-form/RHFCode";

const VerifyForm = () => {
  // Define the Yup schema correctly
  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required("code is required"),
    code2: Yup.string().required("code is required"),
    code3: Yup.string().required("code is required"),
    code4: Yup.string().required("code is required"),
    code5: Yup.string().required("code is required"),
    code6: Yup.string().required("code is required"),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = async (data) => {
    try {
      // send API request
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {/* CUSTOM OTP INPUT */}
          <RHFCode
            keyName="code"
            inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
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
            Verify
          </Button>
        </Stack>
      </form>
    </RHFFormProvider>
  );
};

export default VerifyForm;
