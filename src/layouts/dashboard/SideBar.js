import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Logo from "../../assets/Images/logo.ico";
import { Nav_Buttons, Profile_Menu } from "../../data";
import { faker } from "@faker-js/faker";
import { Gear } from "phosphor-react";
import useSettings from "../../hooks/useSettings";
import AntSwitch from "../../components/AntSwitch";
import { useNavigate } from "react-router-dom";

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app";
    case 1:
      return "/group";
    case 2:
      return "/call";
    case 3:
      return "/settings";

    default:
      break;
  }
};

const getMenuPath = (index) => {
  switch (index) {
    case 0:
      return "/profile";
    case 1:
      return "/settings";
    case 2:
      // TODO : update token and setIsAuthenticated to false
      return "/auth/login";

    default:
      break;
  }
};

function SideBar() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const theme = useTheme();
  const { onToggleMode } = useSettings();
  console.log("theme", theme);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack>
      <Box
        p={2}
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          height: "100vh",
          width: 100,
        }}
      >
        <Stack
          direction={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ height: "100%" }}
          spacing={3}
        >
          <Stack alignItems={"center"} spacing={4}>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                width: 64,
                height: 64,
                borderRadius: 1.5,
              }}
            >
              <img src={Logo} alt="chat-app-logo" />
            </Box>
            <Stack
              sx={{ width: "max-content" }}
              direction={"column"}
              alignItems={"center"}
              spacing={3}
            >
              {Nav_Buttons.map((indvEle) =>
                indvEle.index === selected ? (
                  <Box
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1.5,
                    }}
                  >
                    <IconButton
                      sx={{ width: "max-content", color: "#fff" }}
                      key={indvEle.index}
                    >
                      {indvEle.icon}
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    onClick={() => {
                      setSelected(indvEle.index);
                      navigate(getPath(indvEle.index));
                    }}
                    sx={{
                      width: "max-content",
                      color:
                        theme.palette.mode === "Ligh"
                          ? "#000"
                          : theme.palette.text.primary,
                    }}
                    key={indvEle.index}
                  >
                    {indvEle.icon}
                  </IconButton>
                )
              )}
              <Divider
                sx={{ width: "40px", background: " rgba(180, 180, 180, 1)" }}
              />
              {selected === 3 ? (
                <Box
                  p={1}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton sx={{ width: "max-content", color: "#fff" }}>
                    <Gear />
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "Ligh"
                        ? "#000"
                        : theme.palette.text.primary,
                  }}
                  onClick={() => {
                    navigate(getPath(3));
                    setSelected(3);
                  }}
                >
                  <Gear />
                </IconButton>
              )}
            </Stack>
          </Stack>
          <Stack
            spacing={4}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            {/* switch with dark and light mode */}
            <AntSwitch
              onChange={() => {
                onToggleMode();
              }}
              defaultChecked
            />
            <Avatar
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              size={20}
              src={faker.image.avatar()}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Stack spacing={1} px={1}>
                {Profile_Menu.map((el, idx) => (
                  <MenuItem
                  >
                    <Stack
                    onClick={() => {
                      navigate(getMenuPath(idx));
                    }}
                      sx={{ width: 100 }}
                      direction="row"
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      {" "}
                      <span> {el.title} </span> {el.icon}{" "}
                    </Stack>
                  </MenuItem>
                ))}
              </Stack>
            </Menu>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

export default SideBar;
