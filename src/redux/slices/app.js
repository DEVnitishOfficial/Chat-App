import { createSlice } from "@reduxjs/toolkit";

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
