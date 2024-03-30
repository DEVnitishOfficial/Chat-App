import { Divider, Grid, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { Box, Stack, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSideBar } from "../redux/slices/app";
import { CaretLeft } from "phosphor-react";
import { faker } from "@faker-js/faker";
import { SHARED_DOCS, SHARED_LINKS } from "../data";
import { DocumentMessage, LinkMessage } from "./conversation/MsgType";

const SharedMessages = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            <Typography variant="subtitle2">Shared Messages</Typography>
          </Stack>
          <Divider />
        </Box>

        {/* Body */}
        <Tabs sx={{px:2, pt:2}} value={value} onChange={handleChange} centered>
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
          spacing={value === 1 ? 1 : 3}
        >
            {(() => {
                switch (value) {
                case 0:
                    // media
                    return (<Grid container spacing={2}>
                        {[0,1,2,3,4,5,6].map((el) => {
                           return <Grid item xs={4}>
                                <img src={faker.image.avatar()} alt={faker.name.fullName()} />
                            </Grid>
                        })}
                    </Grid>)
                case 1:
                    // links
                   return SHARED_LINKS.map((el) => <LinkMessage el={el}/>)
                case 2:
                    //docs
                 return SHARED_DOCS.map((el) => <DocumentMessage el={el}/>)
                
                    default:
                        break;
                }
            })()}
        </Stack>
      </Stack>
    </Box>
  );
};

export default SharedMessages;
