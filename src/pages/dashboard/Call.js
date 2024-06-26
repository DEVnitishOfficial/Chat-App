import { Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass, Phone } from 'phosphor-react'
import {useTheme} from '@mui/material/styles'
import { SimpleBarStyle } from '../../components/Scrollbar'

import { CallLogElement } from '../../components/CallElement'
import { CallLogs } from '../../data'
import StartCall from '../../sections/main/StartCall'

const Call = () => {
    const theme = useTheme();
    const [openDialog,setOpenDialog] = useState(false)
  
    const handleCloseDialog = () => {
      setOpenDialog(false)
    }
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Left part */}
        <Box
          sx={{
            height: "100vh",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "F8FAFF"
                : theme.palette.background,
            width: 320,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack>
              <Typography variant="h3">Call Log</Typography>
            </Stack>

            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#7096CE" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="subtitle2" component={Link}>
                Start new conversation
              </Typography>
              <IconButton onClick={() => {
                setOpenDialog(true)
              }}>
                <Phone style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}>
              <SimpleBarStyle>
                <Stack spacing={2.4}>
                  {/* Call logs */}
                  {CallLogs.map((el) => <CallLogElement {...el} online={true} /> )}

                  
                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>

        {/* Right part */}
        {/* Todo : reuse the convrersating app here */}
      </Stack>   
      {openDialog && <StartCall open={openDialog} handleClose={handleCloseDialog}/>}
    </>
  )
}

export default Call