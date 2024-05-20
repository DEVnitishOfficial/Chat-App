import { Stack, Typography } from "@mui/material";
import React from "react";
import VerifyForm from "../../sections/auth/VerifyForm";
import RHFCode from "../../components/hook-form/RHFCode";

const Verify = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4"> Please verify your OTP</Typography>
        <Stack>
          <Typography variant="body2">
            Sent to email (nitishOfficial@gmail.com)
          </Typography>
        </Stack>
      </Stack>
      {/* verify form */}
      <VerifyForm />
    </>
  );
};

export default Verify;
