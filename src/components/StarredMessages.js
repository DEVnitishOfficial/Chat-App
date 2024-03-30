import { Divider, Grid, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { Box, Stack, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSideBar } from "../redux/slices/app";
import { CaretLeft } from "phosphor-react";
import { Message } from "./conversation/Message";

const StarredMessages = () => {

  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            height: "12%",
            boxShadow: "0px,0px,2px rgba(0,0,0,0.25)",
            width: "100%",
            background:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack
            sx={{ height: "100%" }}
            direction="row"
            alignItems={"center"}
            spacing={3}
          >
            <IconButton
              onClick={() => {
                dispatch(updateSideBar("CONTACT"));
              }}
            >
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">Starred Messages</Typography>
          </Stack>
          <Divider />
        </Box>

        {/* Body */}
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
          spacing={ 3}
        >
          <Message />  
        </Stack>
      </Stack>
    </Box>
  );
};

export default StarredMessages;
