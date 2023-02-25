import React from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";

import {
 Grid,
 Typography,
 TextField,
 InputAdornment,
 List,
 ListItem,
 ListItemAvatar,
 Avatar,
 ListItemText,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

export default function Home() {
 const [isClicked, setIsClicked] = React.useState(false);

 return (
  <>
   <Head>
    <title>Telegram App</title>
   </Head>
   <main>
    <Grid container height="100vh" sx={{ overflow: "hidden" }}>
     <Grid
      item
      md={3}
      sx={{ boxShadow: "1px 1px 5px 0px rgba(0,0,0,0.52)" }}
     >
      <Container sx={{ pt: "20px" }}>
       {/* Contact List */}
       <Typography variant="h1" className="text-logo">
        Telegram
       </Typography>

       {/* Search Column */}
       <TextField
        id="outlined-basic"
        placeholder="Type your message..."
        variant="outlined"
        fullWidth
        sx={{ my: "20px" }}
        InputProps={{
         startAdornment: (
          <InputAdornment position="start">
           <img src="/images/search.svg" />
          </InputAdornment>
         ),
        }}
       />

       {/* User List */}
       <List
        sx={{
         width: "100%",
         height: "80vh",
         overflowY: "auto",
        }}
       >
        {[...new Array(15)].map((item, key) => (
         <ListItem
          alignItems="flex-start"
          sx={{ paddingLeft: "0" }}
          button
          key={key}
          onClick={() => setIsClicked(true)}
         >
          <ListItemAvatar>
           <Avatar alt="Ryo" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
           primary="Theresa Webb"
           secondary={
            <Typography
             sx={{ display: "inline", color: "#7E98DF" }}
             component="span"
             variant="body2"
             color="text.primary"
            >
             Why did you do that?
            </Typography>
           }
          />
         </ListItem>
        ))}
       </List>
      </Container>
     </Grid>
     <Grid item md={9} sx={{ backgroundColor: "#FAFAFA" }}>
      {!isClicked && (
       <Typography
        sx={{
         color: "#848484",
         display: "flex",
         height: "100vh",
         width: "100%",
         justifyContent: "center",
         alignItems: "center",
        }}
       >
        Please select a chat to start messaging
       </Typography>
      )}

      {isClicked && (
       <React.Fragment>
        {/* Appbar */}
        <Box
         sx={{ backgroundColor: "#fff", px: 5, py: 2 }}
        >
         <Box display="flex" gap={2}>
          <Avatar
           alt="Ryo"
           src="/static/images/avatar/1.jpg"
           sx={{ width: "50px", height: "50px" }}
          />
          <div>
           <Typography>Theresa Webb</Typography>
           <Typography
            sx={{ display: "inline", color: "#7E98DF" }}
            component="span"
            variant="body2"
            color="text.primary"
           >
            Online
           </Typography>
          </div>
         </Box>
        </Box>

        {/* Box Chat */}
        <Box px={5} py={3} sx={{ height: "80vh", overflowY: "auto" }}>
         {/* Left Chat */}
         {[...new Array(5)].map((item, key) => (
          <Box mb={1} key={key}>
           <Grid container gap={2} alignItems="flex-end">
            <Grid item>
             <Avatar
              alt="Ryo"
              src="/static/images/avatar/1.jpg"
              sx={{ width: "45px", height: "45px" }}
             />
            </Grid>
            <Grid item md={3}>
             <Box
              sx={{
               backgroundColor: "#7E98DF",
               borderRadius: "35px 35px 35px 10px",
               padding: 3,
              }}
             >
              <Typography sx={{ color: "#fff" }}>
               Hi, son, how are you doing? Today, my father and I
               went to buy a car, bought a cool car.
              </Typography>
             </Box>
            </Grid>
           </Grid>
          </Box>
         ))}

         {/* Right Chat */}
         <Box mb={1}>
          <Grid
           container
           gap={2}
           direction="row-reverse"
           alignItems="flex-end"
          >
           <Grid item>
            <Avatar
             alt="Bilkis"
             src="/static/images/avatar/1.jpg"
             sx={{ width: "45px", height: "45px" }}
            />
           </Grid>
           <Grid item md={3}>
            <Box
             sx={{
              backgroundColor: "#fff",
              borderRadius: "35px 35px 10px 35px",
              padding: 3,
             }}
            >
             <Typography sx={{ color: "#232323" }}>
              Hi, son, how are you doing? Today, my father and I
              went to buy a car, bought a cool car.
             </Typography>
            </Box>
           </Grid>
          </Grid>
         </Box>
        </Box>

        {/* Bottom Chat */}
        <Box sx={{ backgroundColor: "#fff", px: 3, py: 2 }}>
         <TextField
          id="outlined-basic"
          placeholder="Type your message..."
          variant="outlined"
          sx={{ my: -9 }}
          fullWidth
          InputProps={{
           endAdornment: (
            <InputAdornment position="start">
             <SendRoundedIcon />
            </InputAdornment>
           ),
          }}
         />
        </Box>
       </React.Fragment>
      )}
     </Grid>
    </Grid>
   </main>
  </>
 );
}