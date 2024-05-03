import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Conversation from "./Conversation";
import { Box, Divider, styled } from "@mui/material";
import { AccountContext } from "../../../context/AccoutProvider";

const Component = styled(Box)`
  height: 81vh;
  overflow: overlay;
`;

const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  backgroung-color: #e9edef;
  opacity: 0.6;
`;

const Conversations = ({ text }) => {
  const { account, socket, setActiveUsers } = useContext(AccountContext);
  const [users, setUsers] = useState([]);

  //
  const getData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/getusers`);
    const filteredData = response.data.filter((user) =>
      user.name.toLowerCase().includes(text.toLowerCase())
    );
    setUsers(filteredData);
  };

  useEffect(() => {
    getData();
  }, [text]);

  useEffect(() => {
    socket.current.emit("addUsers", account);
    socket.current.on("getUsers", (users) => {
      setActiveUsers(users);
    });
  }, [account]);

  return (
    <Component>
      {users.map(
        (user, index) =>
          user.email !== account.email && (
            <Box key={index}>
              <Conversation user={user} />
              <StyledDivider />
            </Box>
          )
      )}
    </Component>
  );
};

export default Conversations;
