import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X } from "phosphor-react";
import { useDispatch } from "react-redux";
import { ToggleSideBar } from "../redux/slices/app";
import { faker } from "@faker-js/faker";
import AntSwitch from "./AntSwitch"

const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
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
            justifyContent={"space-between"}
            spacing={3}
          >
            <Typography variant="subtitle2">Contact Info</Typography>
            <IconButton
              onClick={() => {
                dispatch(ToggleSideBar());
              }}
            >
              <X />
            </IconButton>
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
          spacing={3}
        >
          <Stack alignItems={"center"} direction={"row"} spacing={2}>
            <Avatar
              src={faker.image.avatar()}
              alt={faker.name.firstName()}
              sx={{ height: 64, width: 64 }}
            />
            <Stack spacing={0.5}>
              <Typography variant="article" fontWeight={600}>
                {faker.name.fullName()}
              </Typography>
              <Typography variant="article" fontWeight={600}>
                {"+91 232 2352 2353 "}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Stack spacing={1} alignItems={"center"}>
              <IconButton>
                <VideoCamera />
              </IconButton>
              <Typography variant="overline">Video</Typography>
            </Stack>

            <Stack spacing={1} alignItems={"center"}>
              <IconButton>
                <Phone />
              </IconButton>
              <Typography variant="overline">Phone</Typography>
            </Stack>
          </Stack>
          <Divider />

          <Stack spacing={0.5}>
            <Typography variant="article">About</Typography>
            <Typography variant="body2">Imaginition is the limit</Typography>
          </Stack>
          <Divider />

          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Typography variant="subtitle2">Media, Links & Docs</Typography>
            <Button endIcon={<CaretRight />}>
              201
            </Button>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            {[1,2,3,].map((el) => (
              <Box>
                  <img src={faker.image.avatar()} alt={faker.name.fullName()} />
              </Box>
            ))}
          </Stack>
          <Divider />
          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Star size={21} />
                <Typography>
                  Starred Message
                </Typography>
          </Stack>
          <IconButton>
            <CaretRight />
          </IconButton>
          </Stack>
          <Divider />

          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Bell size={21} />
                <Typography>
                 Mute Notification
                </Typography>
          </Stack>
          <AntSwitch />
          </Stack>
          <Divider />

          <Typography>1 Goup in common</Typography>

          <Stack alignItems={"center"} direction={"row"} spacing={2}>
            <Avatar
              src={faker.image.animals()}
              alt={faker.name.firstName()}
              sx={{ height: 64, width: 64 }}
            />
            <Stack spacing={0.5}>
              <Typography variant="subtitle2" fontWeight={600}>
                Camel's Area
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                Owl, Parrot, Rabbit
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Button startIcon={<Prohibit />} fullWidth variant="outlined">Block</Button>
              <Button startIcon={<Trash />} fullWidth variant="outlined">Delete</Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Contact;
