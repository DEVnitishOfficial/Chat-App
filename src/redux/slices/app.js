import { createSlice } from "@reduxjs/toolkit";

import { dispatch } from "../store";

const initialState = {
  sideBar: {
    open: false,
    type: "CONTACT", // also can be STARRED, SHARED
  },
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
  },
});

// reducer
export default slice.reducer;

export function ToggleSideBar(){
    return async () => {
        dispatch(slice.actions.toggleSideBar());
    }
}

export function updateSideBar(type){
    return async () => {
        dispatch(slice.actions.updateSideBarType({
                type,
        }))
    }
}
