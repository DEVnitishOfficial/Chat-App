import React from "react";
import { Box, Divider, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import {Message} from "./Message";

function Conversation() {
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* header part */}
       <Header />

      {/* message area */}
      <Box width={"100%"} sx={{ flexGrow: 1, height:"100%",overflowY:"scroll"}}>
     <Message/>
      </Box>

      {/* chat footer */}
      <Footer />
    </Stack>
  );
}

export default Conversation;
