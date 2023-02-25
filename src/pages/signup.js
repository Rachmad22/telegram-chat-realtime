import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import React from "react";


export default function Signup() {

 return (
  <>
   <Head>
    <title>SignUp | Telegram</title>
   </Head>
   <main>
    <form>
     <Box display="flex" flexDirection={"column"} maxWidth={400} alignItems="center" justifyContent={"center"} margin="auto" marginY={3} padding={3} borderRadius={5} boxShadow={"5px 5px 10px #ccc"} sx={{
      ":hover": {
       boxShadow: "10px 10px 20px #ccc"
      }
     }} >
      <Typography variant="h4" padding={3} textAlign="center" sx={{ color: "#7E98DF" }}>SignUp</Typography>
      <Typography variant="p" sx={{ color: "#7E98DF" }}>Lets create your account !</Typography>

      {/* form signup */}
      <TextField
       margin="normal"
       variant="outlined"
       type={"text"}
       placeholder="Name"
       required
      />

      <TextField
       margin="normal"
       variant="outlined"
       type={"email"}
       placeholder="Email"
       required
      />

      <TextField
       margin="normal"
       variant="outlined"
       type={"password"}
       placeholder="Password"
       required
      />

      <Button type="submit" sx={{ marginTop: 2, borderRadius: 3 }} color="primary" variant="contained" fullWidth>SignUp</Button>

      <Typography marginY={3} variant="p" sx={{ color: "#7E98DF" }} >Signup with</Typography>

      <Button
       variant="outlined"
       fullWidth
       sx={{ gap: 2, color: "#7E98DF", borderRadius: 3 }}
      >
       <img src="/images/google.svg" />
       Google
      </Button>
     </Box>

    </form>
   </main>
  </>
 )
}