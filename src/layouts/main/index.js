import { Container, Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import logo from "../../assets/Images/logo.ico";
import { useSelector } from "react-redux";

const MainLayout = () => {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  // const isLoggedIn = false
  console.log('isLoggedIn',isLoggedIn)

  if(isLoggedIn){
    return <Navigate to='/app' />
  }
  return (
    <Container sx={{mt:5}} maxWidth="sm">
      <Stack spacing={5}>
        <Stack sx={{width:"100%"}} alignItems={"center"} direction={"column"}>
        <img style={{height:120, width:120}} src={logo} alt="logo"/>
        </Stack>
      </Stack>
      <Outlet />
    </Container>
  );
};

export default MainLayout;
