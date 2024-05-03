import { Box, Typography, styled } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../../context/AccoutProvider";
import axios from "axios";
import { formatDate } from "../../../utils/common-utils";

const Component = styled(Box)`
  display: flex;
  height: 40px;
  padding: 13px 0;
`;

const Image = styled("img")({
  width: 40,
  height: 40,
  borderRadius: "50%",
  padding: "0 14px",
});

const Container = styled(Box)`
  display: flex;
`;

const TimeStamp = styled(Typography)`
  font-size: 12px;
  margin-left: auto;
  color: #000;
  margin-right: 20px;
`;

const Text = styled(Typography)`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
`;

const Conversation = ({ user }) => {
  const { setPerson, account, newMessageFlag } = useContext(AccountContext);
  const [message, setMessage] = useState({});

  useEffect(() => {
    const getConversationDetails = async () => {
      const data = await Conversation({
        senderId: account.email,
        receverId: user.email,
      });
      setMessage({ text: data?.message, timestamp: data?.updatedAt });
    };
    getConversationDetails();
  }, [newMessageFlag]);

  const getUser = () => {
    setPerson(user);
    Conversation();
  };

  const conversation = {
    senderId: account.email,
    receverId: user.email,
  };

  const Conversation = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/conversation/add`,
        conversation
      );
    } catch (error) {
      console.log("Error while calling Conversation api", error.message);
    }
  };

  return (
    <Component onClick={() => getUser()}>
      <Box>
        <Image src={user.profile_pic} alt="dp" />
      </Box>
      <Box style={{ width: "100%" }}>
        <Container>
          <Typography>{user.name}</Typography>
          {message?.text && (
            <TimeStamp>{formatDate(message?.timestamp)}</TimeStamp>
          )}
        </Container>
        <Box>
          <Text>
            {message?.text?.includes("localhost") ? "Media" : message.text}
          </Text>
        </Box>
      </Box>
    </Component>
  );
};

export default Conversation;
