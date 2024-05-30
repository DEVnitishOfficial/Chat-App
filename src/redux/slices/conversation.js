import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";

const user_id = window.localStorage.getItem("user_id");

const initialState = {
  individual_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  group_chat: {},
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchIndividualConversation(state, action) {
      const list = action.payload.conversations.map((el) => {
        const current_user = el.participants.find(
          (elm) => elm._id.toString() !== user_id
        );
        return {
          id: el._id,
          user_id: current_user._id,
          name: `${current_user.firstName} ${current_user.lastName}`,
          online: current_user.status === "Online",
          img: faker.image.avatar(),
          msg: faker.music.songName(),
          time: "10:39",
          unread: 0,
          pinned: false,
        };
      });
      state.individual_chat.conversations = list;
    },
  },
});

export default slice.reducer;

export const FetchIndividualConversation = ({ conversations }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchIndividualConversation({ conversations }));
  };
};
