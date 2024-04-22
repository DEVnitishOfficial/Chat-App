import React from "react";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { faker } from "@faker-js/faker";
import StyledBadge from "./StyledBadge";
import { ArrowDownLeft, ArrowUpRight, Phone } from "phosphor-react";


const CallLogElement = ({ online, incoming, missed }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderRadius: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "#fff"
              : theme.palette.background.default,
        }}
        p={2}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction={"row"} spacing={2}>
            {online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  src={faker.image.avatar()}
                  alt={faker.name.fullName()}
                />
              </StyledBadge>
            ) : (
              <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
            )}

            <Stack>
              <Typography variant="subtitle2">
                {faker.name.fullName()}
              </Typography>
              <Stack direction={'row'} spacing={2} justifyItems={'center'} alignItems={'center'}>
                {incoming ? (
                  <ArrowDownLeft  color={missed ? "red" : "gray"} />
                ) : (
                  <ArrowUpRight color={'green'} />
                )}
                <Typography variant="caption">
                    Yesterday 21:24
                </Typography>
              </Stack>
              {/* <Typography variant="caption">{msg}</Typography> */}
            </Stack>
          </Stack>
          
          <IconButton>
          <Phone color="green"/>
          </IconButton>
        </Stack>
      </Box>
    </>
  );
};

const CallElement = () => {
  return <div>callElement</div>;
};

export { CallLogElement, CallElement };
