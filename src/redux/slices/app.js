import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  sideBar: {
    open: false,
    type: "CONTACT", // also can be STARRED, SHARED
  },
  snackbar: {
    open: null,
    message: null,
    severity: null,
  },
  users:[],
  friends:[],
  friendRequests:[]
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Toggle side bar
    toggleSideBar(state, action) {
      state.sideBar.open = !state.sideBar.open;
    },

    updateSideBarType(state, action) {
      state.sideBar.type = action.payload.type;
    },
    openSnackBar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackBar(state, action) {
      state.snackbar.open = false;
      state.snackbar.severity = null;
      state.snackbar.message = null;
    },
    updateUsers(state,action){
      state.users = action.payload.users
    },
    updateFriends(state,action){
      state.friends = action.payload.friends
    },
    updateFriendRequests(state,action){
      state.friendRequests = action.payload.request
    }
  },
});

// reducer
export default slice.reducer;

export function ToggleSideBar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSideBar());
  };
}

export function updateSideBar(type) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateSideBarType({
        type,
      })
    );
  };
}

export const closeSnackBar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackBar());
};
export function showSnackbar({ severity, message }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.openSnackBar({ message, severity }));

    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar());
    }, 4000);
  };
}

export const fetchUser = () => {
    return async(dispatch,getState) => {
      await axios.get("/user/get-users",{
        headers:{
          "Content-Type":"application/json",
          Authorization : `Bearer ${getState().auth.token}`
        }
      }).then((response) => {
        console.log('response',response)
        dispatch(slice.actions.updateUsers({users:response.data.data}))
      }).catch((error) => {
        console.log('error',error)
      })
    }
}
export const fetchFriends = () => {
    return async(dispatch,getState) => {
      await axios.get("/user/get-friends",{
        headers:{
          "Content-Type":"application/json",
          Authorization : `Bearer ${getState().auth.token}`
        }
      }).then((response) => {
        console.log('response',response)
        dispatch(slice.actions.updateFriends({friends:response.data.data}))
      }).catch((error) => {
        console.log('error',error)
      })
    }
}
export const fetchFriendsRequest = () => {
    return async(dispatch,getState) => {
      await axios.get("/user/get-friends-request",{
        headers:{
          "Content-Type":"application/json",
          Authorization : `Bearer ${getState().auth.token}`
        }
      }).then((response) => {
        console.log('response',response)
        dispatch(slice.actions.updateFriendRequests({request:response.data.data}))
      }).catch((error) => {
        console.log('error',error)
      })
    }
}