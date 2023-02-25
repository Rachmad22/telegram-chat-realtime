import React from "react";
import Head from "next/head";
import {  Typography, TextField, Button, Box } from "@mui/material";

export default function Login() {
 const handleSubmit = (event) => {
  event.preventDefault();
 }

 return (
  <>
   <Head>
    <title>Login | Telegram</title>
   </Head>
   <main>
    <form>
     <Box display="flex" flexDirection={"column"} maxWidth={400} alignItems="center" justifyContent={"center"} margin="auto" marginY={2}padding={3} borderRadius={5} boxShadow={"5px 5px 10px #ccc"} sx={{
      ":hover": {
       boxShadow: "10px 10px 20px #ccc"
      }
     }} >

      <Typography variant="h4" padding={3} textAlign="center" sx={{color: "#7E98DF"}}>
       Login
      </Typography>
      <Typography display="flex" variant="p" textAlign="start" sx={{color: "#7E98DF"}}>
       hi, Welcome Back !
      </Typography>

      {/* Login Column */}

      <TextField
       margin="normal"
       variant="outlined"
       type={"email"}
       placeholder="Email"
       required
      // sx={{ mb: 1 }}
      />
      <TextField
      margin="normal"
       variant="outlined"
       type={"password"}
       placeholder="Password"
       required
       // sx={{ mb: 1 }}
       onKeyDown={handleSubmit}
      />

      <Button sx={{ color: "#7E98DF" }}>
       <Typography variant="p">Forgot Password?</Typography>
       </Button>

      <Button type="submit" onClick={handleSubmit} sx={{ marginTop: 2, borderRadius: 3 }} color= "primary" variant="contained" fullWidth>Login</Button>

       {/* Google button */}
       <Typography sx={{color: "#7E98DF", marginY: 2}} borderRadius={5}>
        Login with
       </Typography>
       
      <Button
       variant="outlined"
       fullWidth
       sx={{gap: 2, color: "#7E98DF"}}
      >
       <img src="/images/google.svg" />
       Google
      </Button>

      {/* signup button */}
      <Typography >
       Dont have an account?
      <Button sx={{color: "#7E98DF", marginY: 2}}>SignUp</Button>
      </Typography>
     </Box>
    </form>
   </main>
  </>

 )
}