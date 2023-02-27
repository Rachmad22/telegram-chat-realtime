import React from "react";
import styles from "@/styles/login.module.css";
import Head from "next/head";
import { Typography, TextField, Button, Box } from "@mui/material";
import {
 signInWithEmailAndPassword,
 signInWithPopup,
 GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import * as useDb from "@/utils/database";
import { useRouter } from "next/router";

const provider = new GoogleAuthProvider();


export default function Login() {

 const router = useRouter();
 const [email, setEmail] = React.useState("");
 const [password, setPassword] = React.useState("");
 const [usersList, setUsersList] = React.useState({});

 React.useEffect(() => {
  useDb.getData("users", (snapshot) => {
   const data = snapshot.val();

   if (data) {
    setUsersList(data);
   }
  });
 }, []);

 const loginManual = () => {
  signInWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
    // Signed in
    const user = userCredential.user;

    useDb.sendData("users", {
     ...usersList,
     [user.uid]: {
      ...usersList[user.uid],
      ...{
       is_online: true,
      },
     },
    });

    localStorage.setItem("user", JSON.stringify(user));

    router.replace("/");
    // ...
   })
   .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
   });
 };

 const loginGoogle = () => {
  signInWithPopup(auth, provider)
   .then((result) => {
    const user = result.user;

    useDb.sendData("users", {
     ...usersList,
     [user.uid]: {
      ...usersList[user.uid],
      ...{
       is_online: true,
      },
     },
    });

    localStorage.setItem("user", JSON.stringify(user));
    router.replace("/");
   })
   .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
   });
 };


 return (
  <>
   <Head>
    <title>Login | Telegram</title>
   </Head>
   <main>
    <form>
     <Box display="flex" flexDirection={"column"} maxWidth={400} alignItems="center" justifyContent={"center"} margin="auto" marginY={2} padding={3} borderRadius={5} boxShadow={"5px 5px 10px #ccc"} sx={{
      ":hover": {
       boxShadow: "10px 10px 20px #ccc"
      }
     }} >

      <Typography variant="h4" padding={3} textAlign="center" sx={{ color: "#7E98DF" }}>
       Login
      </Typography>
      <Typography display="flex" variant="p" textAlign="start" sx={{ color: "#7E98DF" }}>
       hi, Welcome Back !
      </Typography>

      {/* Login Column */}

      <TextField
       margin="normal"
       variant="outlined"
       type={"email"}
       placeholder="Email"
       required
       onChange={(e) => setEmail(e.target.value)}
      // sx={{ mb: 1 }}
      />
      <TextField
       margin="normal"
       variant="outlined"
       type={"password"}
       placeholder="Password"
       required
       onChange={(e) => setPassword(e.target.value)}
       // sx={{ mb: 1 }}
       onKeyDown={(e) => {
        if (e.key === "Enter") {
         loginManual()
        }
       }}
      />

      <Button sx={{ color: "#7E98DF" }}>
       <Typography variant="p">Forgot Password?</Typography>
      </Button>

      <Button type="submit" onClick={loginManual} sx={{
       marginTop: 2, borderRadius: 3, ":hover": {
        backgroundColor: "#7E98DF"
       }
      }} color="primary" variant="contained" fullWidth>Login</Button>

      {/* Google button */}
      <Typography sx={{ color: "#7E98DF", marginY: 2 }} borderRadius={5}>
       Login with
      </Typography>

      <Button
       variant="outlined"
       fullWidth
       sx={{
        gap: 2, color: "#7E98DF", ":hover": {
         backgroundColor: "#7E98DF", color: "white"
        }
       }}
       onClick={loginGoogle}
      >
       <img src="/images/google.svg" />
       Google
      </Button>

      {/* signup button */}
      <Typography >
       Dont have an account?
       <Button sx={{ color: "#7E98DF", marginY: 2 }}>SignUp</Button>
      </Typography>
     </Box>
    </form>
   </main>
  </>

 )
}