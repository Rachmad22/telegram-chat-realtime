import React from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import EmojiPicker from "emoji-picker-react";
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from "firebase/auth";

import {
 Popper,
 Grow,
 ClickAwayListener,
 Stack,
 Paper,
 MenuList,
 MenuItem,
 Button,
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
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import * as useDb from "@/utils/database";
import { Route } from "@mui/icons-material";
import { useRouter } from "next/router";
import { auth } from "@/utils/firebase";


const ID = new Date().getTime();

export default function Home() {
 const router = useRouter();

 const [uuid, setUuid] = React.useState("");
 const [isClicked, setIsClicked] = React.useState(false);
 const [selectedChat, setSelectedChat] = React.useState(null);
 const [keyword, setKeyword] = React.useState("");
 const [messageList, setMessageList] = React.useState({});
 const [messageKey, setMessageKey] = React.useState([]);
 const [messageFilter, setMessageFilter] = React.useState([]);
 const [usersList, setUsersList] = React.useState({});
 const [usersKey, setUsersKey] = React.useState([]);
 const [isEmojiClicked, setIsEmojiClicked] = React.useState(false);

 const bottomRef = React.useRef();

 React.useEffect(() => {
  const uuidProfile = JSON.parse(localStorage.getItem("user"))?.uid;

  setUuid(uuidProfile);

  useDb.getData("users", (snapshot) => {
   const data = snapshot.val();

   console.log(data)
   if (data) {
    setUsersList(data);
    setUsersKey(Object.keys(data)?.filter((item) => item !== uuidProfile));
   }
  });

  useDb.getData(`messages/user_1`, (snapshot) => {
   const data = snapshot.val();

   if (data) {
    setMessageList(data);
    setMessageKey(Object.keys(data));
   }
  });
 }, [selectedChat]);

 const sendMessage = () => {
  useDb.sendData("messages", {
   [`user_1`]: {
    ...messageList,
    [new Date().getTime()]: {
     text: keyword,
     image: "",
     timestamp: new Date().getTime(),
     user_id: uuid,
     photo: "",
     sender: "Ryo",
     target_id: selectedChat,
    },
   },
  });

  useDb.getData(`messages/user_1`, (snapshot) => {
   const data = snapshot.val();

   if (data) {
    const filterChat = Object.keys(data).map((item) => data[item]);

    setMessageFilter(
     filterChat.filter(
      (item) => item.target_id === selectedChat || item.target_id === uuid
     )
    );
   }
  });

  setIsEmojiClicked(false);
  setKeyword("");
 };
 // console.log(usersList)

 const SignOut = () => {
  signOut(auth).then(() => {
   localStorage.clear();
   router.replace('/login')
   // Sign-out successful.
  }).catch((error) => {
   // An error happened.
  });
 }

 return (
  <>
   <Head>
    <title>Telegram App</title>
   </Head>
   <main>
    <Grid container height="100vh" sx={{ overflow: "hidden" }}>
     <Grid
      item
      md={2.5}
      sx={{ boxShadow: "1px 1px 5px 0px rgba(0,0,0,0.52)" }}
     >
      <Container sx={{ pt: "20px" }}>
       {/* Contact List */}
       <Typography variant="h1" className="text-logo" sx={{ fontSize: "2rem" }}>
        Telegram
       </Typography>
       <Button onClick={SignOut}>LogOut</Button>


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
        {usersKey.map((item, key) => (
         <ListItem
          alignItems="flex-start"
          sx={{ paddingLeft: "0" }}
          button
          selected={selectedChat === key}
          key={key}
          onClick={() => {
           setIsClicked(true);
           setSelectedChat(usersList[item]?.user_id);

           const filterChat = messageKey.map(
            (item) => messageList[item]
           );
           const selected_id = usersList[item]?.user_id;

           setMessageFilter(
            filterChat.filter(
             (item) =>
              item.target_id === selected_id ||
              item.target_id === uuid
            )
           );

           // useDb.getData(
           //   `messages/user_${selected_id}_${uuid}`,
           //   (snapshot) => {
           //     const data = snapshot.val();

           //     if (data) {
           //       setMessageList(data);
           //       setMessageKey(Object.keys(data));

           //       console.log(data);
           //     }
           //   }
           // );
          }}
         >
          <ListItemAvatar>
           <Avatar
            alt={usersList[item]?.fullname}
            src={usersList[item]?.photo}
           />
          </ListItemAvatar>
          <ListItemText
           primary={usersList[item]?.name}
           secondary={
            <Typography
             sx={{ display: "inline", color: "#7E98DF" }}
             component="span"
             variant="body2"
             color="text.primary"
            >
             {usersList[item].is_online ? "Online" : "Offline"}
            </Typography>
           }
          />
         </ListItem>
        ))}
       </List>
      </Container>
     </Grid>
     <Grid item md={9.5} sx={{ backgroundColor: "#FAFAFA" }}>
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
        <Box sx={{ backgroundColor: "#fff", px: 5, py: 2 }}>
         <Box display="flex" gap={2}>
          <Avatar
           alt={usersList[selectedChat]?.name}
           src={usersList[selectedChat]?.photo}
           sx={{ width: "50px", height: "50px" }}
          />
          <div>
           <Typography>
            {usersList[selectedChat]?.name}
           </Typography>
           <Typography
            sx={{ display: "inline", color: "#7E98DF" }}
            component="span"
            variant="body2"
            color="text.primary"
           >
            {usersList[selectedChat].is_online
             ? "Online"
             : "Offline"}
           </Typography>
          </div>
         </Box>
        </Box>

        {/* Box Chat */}
        <Box px={5} py={3} sx={{ height: "65vh", overflowY: "auto" }}>
         {/* Left Chat */}
         {messageFilter.map((item, key) => {
          if (item.user_id === uuid) {
           return (
            <Box mb={1} key={key}>
             <Grid
              container
              gap={2}
              direction="row-reverse"
              alignItems="flex-end"
             >
              <Grid item>
               <Avatar
                alt={item.sender}
                sx={{ width: "45px", height: "45px" }}
               />
              </Grid>
              <Grid item md={3}>
               <Box
                sx={{
                 backgroundColor: "#848484",
                 borderRadius: "35px 35px 10px 35px",
                 padding: 3,
                }}
               >
                <Typography sx={{ color: "#fff" }}>
                 {item.text}
                </Typography>
               </Box>
              </Grid>
             </Grid>
            </Box>
           );
          } else {
           return (
            <Box mb={1} key={key}>
             <Grid container gap={2} alignItems="flex-end">
              <Grid item>
               <Avatar
                alt={item.sender}
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
                 {item.text}
                </Typography>
               </Box>
              </Grid>
             </Grid>
            </Box>
           );
          }
         })}
         <div ref={bottomRef} />
        </Box>

        {/* Bottom Chat */}
        <Box sx={{ backgroundColor: "#fff", px: 5, py: 2 }}>
         {isEmojiClicked && (
          <Box position="fixed" zIndex={99999} bottom="10vh">
           <EmojiPicker
            onEmojiClick={(e) => {
             setKeyword(`${keyword} ${e.emoji}`);
            }}
           />
          </Box>
         )}
         <TextField
          id="outlined-basic"
          placeholder="Type your message..."
          variant="outlined"
          fullWidth
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
           if (e.key === "Enter") {
            sendMessage();
            setIsEmojiClicked(false);
           }
          }}
          value={keyword}
          InputProps={{
           startAdornment: (
            <InputAdornment
             sx={{ cursor: "pointer" }}
             position="start"
             onClick={() => setIsEmojiClicked(!isEmojiClicked)}
            >
             <EmojiEmotionsIcon />
            </InputAdornment>
           ),
           endAdornment: (
            <InputAdornment
             sx={{ cursor: "pointer" }}
             position="start"
             onClick={sendMessage}
            >
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

// 1. start
// 2. isi pesan
// 3. kirim pesan ke tujuan
// 4. tujuan menerima pesan sesuai dengan id pengirim