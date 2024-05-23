import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import { showSnackbar } from "./app";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  email: "",
  error: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.token = "";
    },
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

export default slice.reducer;

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

export function LogoutUser() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.logOut());
  };
}

export function ForgotPassword(formValues) {
  return async (dispatch, getState) => {
    await axiosInstance
      .post("/auth/forgot-password", formValues, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function NewPassword(formValues) {
  return async (dispatch, getState) => {
    await axiosInstance
      .post("/auth/reset-password", formValues, {
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

export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    await axiosInstance
      .post(
        "/auth/register",
        { ...formValues },
        {
          headers: {
            "content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("response", response);
        dispatch(
          slice.actions.updateRegisterEmail({ email: formValues.email })
        );
        dispatch(
          slice.actions.updateIsLoading({ error: false, isLoading: false })
        );
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(
          slice.actions.updateIsLoading({ error: true, isLoading: false })
        );
      })
      .finally(() => {
        // const state = getState()
        // console.log('getstate>>>',state)
        if (!getState().auth.error) {
          window.location.href = "/auth/verify-email";
        }
      });
  };
}

export function VerifyEmail(formValues) {
  return async (dispatch, getState) => {
    await axiosInstance
      .post(
        "/auth/verify-user",
        { ...formValues },
        {
          headers: {
            "content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("response", response);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
        dispatch(showSnackbar({severity:"success", message:response.data.message}))
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(showSnackbar({severity:"Failure",message:error.message}))
      });
  };
}
