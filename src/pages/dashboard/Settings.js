import React from "react";
import { Avatar, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Bell,
  CaretLeft,
  Divide,
  Image,
  Info,
  Key,
  Keyboard,
  Lock,
  Note,
  PencilCircle,
} from "phosphor-react";
import { faker } from "@faker-js/faker";
const list = [
  {
    key: 0,
    icon: <Bell size={20} />,
    title: "Notifications",
    onclick: () => {},
  },
  {
    key: 1,
    icon: <Lock size={20} />,
    title: "Privacy",
    onclick: () => {},
  },
  {
    key: 2,
    icon: <Key size={20} />,
    title: "Security",
    onclick: () => {},
  },
  {
    key: 3,
    icon: <PencilCircle size={20} />,
    title: "Theme",
    // onclick: handleOpenTheme,
    onclick: () => {},
  },
  {
    key: 4,
    icon: <Image size={20} />,
    title: "Chat Wallpaper",
    onclick: () => {},
  },
  {
    key: 5,
    icon: <Note size={20} />,
    title: "Request Account Info",
    onclick: () => {},
  },
  {
    key: 6,
    icon: <Keyboard size={20} />,
    title: "Keyboard Shortcuts",
    // onclick: handleOpenShortcuts,
    onclick: () => {},
  },
  {
    key: 7,
    icon: <Info size={20} />,
    title: "Help",
    onclick: () => {},
  },
];
const Settings = () => {
  const theme = useTheme();
 
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      {/* left panel */}
      <Box
        sx={{
          overflowY: "scroll",
          height: "100vh",
          width: 320,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background,
          boxShadow: "0px, 0px, 2px rgba(0,0,0,0.25)",
        }}
      >
        <Stack p={4} spacing={5}>
          {/* Header */}
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <IconButton>
              <CaretLeft size={24} color="#4B4B4B" />
            </IconButton>
            <Typography variant="h4">Settings</Typography>
          </Stack>

          {/* Profile */}
          <Stack direction={"row"} spacing={3}>
            <Avatar
              sx={{ height: 56, width: 56 }}
              src={faker.image.avatar()}
              alt={faker.name.fullName()}
            />
            <Stack direction={"column"}>
              <Typography variant="article">{faker.random.words()}</Typography>
              <Typography variant="body2">{faker.random.word()}</Typography>
            </Stack>
          </Stack>

          {/* List of Options */}
          <Stack spacing={4}>
            {list.map((el) => (
              <>
                <Stack spacing={2} sx={{ cursor: "pointer" }} onclick={onclick}>
                  <Stack  direction={"row"} spacing={2} alignItems={"center"}>
                   {el.icon}
                   <Typography>{el.title}</Typography>
                  </Stack>
                  { el.key !== 7 &&  <Divider />}
                </Stack>
              </>
            ))}
          </Stack>
        </Stack>
      </Box>
      {/* right panel */}
    </Stack>
  );
};

export default Settings;
