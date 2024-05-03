import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import { AccountContext } from "../../../context/AccoutProvider";
import axios from "axios";

const ChatBox = () => {
  const { person, account } = useContext(AccountContext);
  const [conversationId, setConversationId] = useState("");

  const conversation = {
    receverId: person.email,
    senderId: account.email,
  };

  const getConversationDetails = async () => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_URL}/conversation/get`,
        conversation
      );
      setConversationId(response.data._id);
    } catch (error) {
      console.log("Error while calling getConversation api", error.message);
    }
  };
  //
  useEffect(() => {
    getConversationDetails();
  }, [person.email]);

  return (
    <Box>
      <ChatHeader person={person} />
      <Messages person={person} conversationId={conversationId} />
    </Box>
  );
};

export default ChatBox;
