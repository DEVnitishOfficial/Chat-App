import { Box, Stack } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data";
import {
  DocumentMessage,
  LinkMessage,
  MediaMessage,
  ReplyMessage,
  TextMessage,
  TimeLine,
} from "./MsgType";

function Message({menu}) {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((el) => {
          console.log("elementtype>>>>", el);
          switch (el.type) {
            case "divider":
              //timeline
              return <TimeLine el={el} />;
            case "msg":
              switch (el.subtype) {
                case "img":
                  return <MediaMessage el={el} menu={menu} />;
                case "doc":
                  return <DocumentMessage el={el} menu={menu}/>
                case "link":
                  return <LinkMessage el={el} menu={menu} />;
                case "reply":
                  return <ReplyMessage el={el} menu={menu}  />;

                default:
                  return <TextMessage el={el} menu={menu}  />;
              }
            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
}

export { Message };
