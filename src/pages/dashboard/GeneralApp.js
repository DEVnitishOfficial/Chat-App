import React from "react";
import Chats from "./Chats";
import { Box, Stack, Typography } from "@mui/material";
import Conversation from "../../components/conversation";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";

import NoChatSVG from "../../assets/Illustration/NoChat";

function GeneralApp() {
  const theme = useTheme();
  const {sideBar, chat_type, room_id} = useSelector((store) => store.app)
  console.log('sidebar',sideBar) 
  console.log('chat-type',chat_type,) 
  console.log('room_id',room_id) 
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      {/* {chats} */}
      <Chats />

      <Box
        sx={{
          height: "100%",
          width: sideBar.open? "calc(100vw - 740px)" : "calc(100vw - 420px)",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.default,
        }}
      >
        {/* conversation */}
        {room_id !== null && chat_type === "individual" ? <Conversation /> :
        <Stack spacing={2} sx={{height:"100%",width:"100%"}} alignItems={"center"}>
          <NoChatSVG />
            <Typography variant="subtitle2">
              Select a conversation or start new one
            </Typography>
        </Stack> }
      </Box>

      {/* contact */}
      {sideBar.open && (() => {
        switch (sideBar.type) {
          case "CONTACT":
            return <Contact />

          case "STARRED":
            return <StarredMessages />
          
          case "SHARED":
            return <SharedMessages />
        
          default:
            break;
        }
      })()}

    </Stack>
  );
}

export default GeneralApp;
