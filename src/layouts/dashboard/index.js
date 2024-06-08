import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { selectConversationMethod, showSnackbar } from "../../redux/slices/app";
import {
  AddIndividualConversation,
  UpdateIndividualConversation,
} from "../../redux/slices/conversation";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { conversations } = useSelector(
    (state) => state.conversation.individual_chats
  );

  const userId = window.localStorage.getItem("user_id");

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };
      window.onload();
      if (!socket) {
        connectSocket(userId);
      }

      // new friend request
      socket.on("new_friend_request", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });

      socket.on("request_sent", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });

      socket.on("request_accepted", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });

      socket.on("start_chat", (data) => {
        // data
        console.log("data>>>", data);
        const existing_conversation = conversations.find(
          (el) => el._id === data._id
        );
        if (existing_conversation) {
          //
          dispatch(UpdateIndividualConversation({ conversation: data }));
        } else {
          dispatch(AddIndividualConversation({ conversation: data }));
        }
        dispatch(selectConversationMethod({ room_id: data._id }));
      });
    }

    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_sent");
      socket?.off("request_accepted");
      socket?.off("start_chat");
    };
  }, [isLoggedIn, socket]);

  // const isLoggedIn = false
  console.log("isLoggedIn>>>", isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }
  return (
    <Stack direction="row">
      {/* side bar */}
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
