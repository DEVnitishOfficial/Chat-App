import { Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFriends,
  fetchFriendsRequest,
  fetchUser,
} from "../../redux/slices/app";
import { FriendComponent, FriendRequestComponent, UserComponent } from "../../components/Friend";

const UserList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const { users } = useSelector((state) => state.app);

  return (
    <>
      {users.map((el, idx) => {
        // Todo : Render user componenet here
        return <UserComponent key={el._id} {...el} />;
      })}
    </>
  );
};

const FriendList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriends());
  }, []);

  const { users } = useSelector((state) => state.app);

  return (
    <>
      {users.map((el, idx) => {
        //Render friend componenet here
        return <FriendComponent key={el._id} {...el} />;
      })}
    </>
  );
};

const FriendRequestList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriendsRequest());
  }, []);

  const { friendRequests } = useSelector((state) => state.app);

  return (
    <>
      {friendRequests.map((el, idx) => {
        // el => {_id, sender:{_id, firstName, lastName, img, online}}
        //Render friend request componenet here
        return (
          <FriendRequestComponent key={el._id} {...el.sender} id={el._id} />
        );
      })}
    </>
  );
};
const Friend = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      keepMounted
      onClose={handleClose}
      sx={{ p: 4 }}
    >
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Request" />
        </Tabs>
      </Stack>
      {/* Add dialog content */}
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.5}>
            {(() => {
              switch (value) {
                case 0: // display all users
                  return <UserList />;

                case 1: // display all friends
                  return <FriendList />;

                case 2: // display all friend request
                  return <FriendRequestList />;

                default:
                  break;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Friend;
