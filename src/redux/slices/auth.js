import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../utils/axios";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

export default slice.reducer;

console.log("log the form vlaue");
export function LoginUser(formValues) {
  console.log("formValues", formValues);
  // formValues => {email,password}
  return async (dispatch, getState) => {
    await axiosInstance
      .post("/auth/login", formValues, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
