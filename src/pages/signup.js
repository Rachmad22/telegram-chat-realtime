import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import React from "react";
import * as useDb from "@/utils/database";
import { useRouter } from "next/router";
import {
 createUserWithEmailAndPassword,
 signInWithPopup,
 GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/utils/firebase";


const provider = new GoogleAuthProvider();

export default function Signup() {

 const router = useRouter();
 const [email, setEmail] = React.useState("");
 const [password, setPassword] = React.useState("");
 const [name, setName] = React.useState("");
 const [usersList, setUsersList] = React.useState({});
 
 React.useEffect(() => {
  useDb.getData("users", (snapshot) => {
   const data = snapshot.val();

   if (data) {
    setUsersList(data);
   }
  });
 }, []);

 const registerManual = () => {
  createUserWithEmailAndPassword(auth, email, password)
  
  .then((userCredential) => {
 
   const user = userCredential.user;
   console.log(user)


    useDb.sendData("users", {
     ...usersList,
     [user.uid]: {
      emailVerified: user.emailVerified,
      timestamp: new Date().getTime(),
      user_id: user.uid,
      photo: "/notfound.jpg",
      name: name,
      is_online: false,
     },
    });

    router.push('/login');


   })
   .catch((error) => {
    console.log(error)
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
   });
 };

 const registerGoogle = () => {
  signInWithPopup(auth, provider)

   .then((result) => {
    const user = result.user;

    useDb.sendData("users", {
     ...usersList,
     [user.uid]: {
      emailVerified: user.emailVerified,
      timestamp: new Date().getTime(),
      user_id: user.uid,
      photo: user.photoURL,
      name: user.displayName,
      is_online: false,
     },
    });

    router.push("/login");
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
       onChange={(e) => setName(e.target.value)}
      />

      <TextField
       margin="normal"
       variant="outlined"
       type={"email"}
       placeholder="Email"
       required
       onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
       margin="normal"
       variant="outlined"
       type={"password"}
       placeholder="Password"
       required
       onChange={(e) => setPassword(e.target.value)}
       onKeyDown={(e) => {
        if (e.key === "Enter") {
         registerManual()
        }
       }}
      />

      <Button type="submit" sx={{
       marginTop: 2, borderRadius: 3, ":hover": {
        backgroundColor: "#7E98DF"
       }
      }} color="primary" variant="contained" fullWidth onClick={registerManual}>SignUp</Button>

      <Typography marginY={3} variant="p" sx={{ color: "#7E98DF" }} >Signup with</Typography>

      <Button
       variant="outlined"
       fullWidth
       sx={{
        gap: 2, color: "#7E98DF", borderRadius: 3, ":hover": {
         backgroundColor: "#7E98DF", color: "white"
        }
       }}
       onClick={registerGoogle}
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