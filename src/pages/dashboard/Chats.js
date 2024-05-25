import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ArchiveBox, CircleDashed, MagnifyingGlass, User } from "phosphor-react";
import { useTheme, } from "@mui/material/styles";
import React, { useState } from "react";
import { ChatList } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { Search, SearchIconWrapper, StyledInputBase } from "../../components/Search";
import ChatElement from "../../components/ChatElement";
import Friend from "../../sections/main/Friend";

const Chats = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const theme = useTheme()

    const handleOpenDialog = () => {
      setOpenDialog(true)
    }
    const handleCloseDialog = () => {
      setOpenDialog(false)
    }

  return (
    <>
    <Box
      sx={{
        position: "relative",
        width: 320,
        backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      }}
    >
      <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h5">Chats</Typography>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <IconButton onClick={() => {
            handleOpenDialog()
          }}>
            <User />
          </IconButton>
          <IconButton>
            <CircleDashed />
          </IconButton>
          </Stack>
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#7096CE" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Stack>
        <Stack spacing={1}>
          <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
            <ArchiveBox size={24} />
            <Button> Archive </Button>
          </Stack>
          <Divider />
        </Stack>

        <Stack
          spacing={2}
          direction={"column"}
          sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
        >
          <SimpleBarStyle timeout={500} clickOnTrack={false}>
            <Stack spacing={2.4}>
              <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                Pinned
              </Typography>
              {ChatList.filter((chatInfo) => chatInfo.pinned).map(
                (chatInfo) => {
                  return <ChatElement {...chatInfo} />;
                }
              )}
            </Stack>
            <Stack spacing={2.4}>
              <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                All Chat
              </Typography>
              {ChatList.filter((chatInfo) => !chatInfo.pinned).map(
                (chatInfo) => {
                  return <ChatElement {...chatInfo} />;
                }
              )}
            </Stack>
          </SimpleBarStyle>
        </Stack>
      </Stack>
    </Box>
    {openDialog && <Friend open={openDialog} handleClose={handleCloseDialog} />}
    </>
    
  );
};

export default Chats;
