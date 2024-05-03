import { styled, Box } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import { AccountContext } from "../../../context/AccoutProvider";
import axios from "axios";
import Message from "./Message";

const Component = styled(Box)`
  height: 77vh;
  overflow-y: scroll;
`;

const Wrapper = styled(Box)`
  background-image: url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"});
  background-size: 50%;
`;

const Container = styled(Box)`
  padding: 1px 80px;
`;

const Messages = ({ person, conversationId }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [incommingMessage, setIncommingMessage] = useState(null);
  //
  const scrollRef = useRef();
  const { account, socket, newMessageFlag, setNewMessageFlag } =
    useContext(AccountContext);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setIncommingMessage({ ...data, createdAt: Date.now() });
    });
  }, []);

  useEffect(() => {
    incommingMessage &&
      conversationId?.members?.includes(incommingMessage.senderId) &&
      setMessages((prev) => [...prev, incommingMessage]);
  }, [incommingMessage, conversationId]);

  const sendText = async (e) => {
    // console.log(e);
    const code = e.keyCode || e.which;
    if (code == 13) {
      let message = {};
      if (!file) {
        message = {
          senderId: account.email,
          receiverId: person.email,
          conversationId: conversationId,
          type: "text",
          text: text,
        };
      } else {
        message = {
          senderId: account.email,
          receiverId: person.email,
          conversationId: conversationId,
          type: "file",
          text: image,
        };
      }
      socket.current.emit("sendMessage", message);
      await newMessages(message);
      setText("");
      setFile("");
      setImage("");
      setNewMessageFlag((prev) => !prev);
    }
  };

  const newMessages = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/message/add`,
        data
      );
    } catch (error) {
      console.log("Error while calling api", error.message);
    }
  };

  const getMessage = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/message/get/${conversationId}`
      );
      setMessages(response.data);
      console.log("Messages", response.data);
    } catch (error) {
      console.log("Error while calling getMessage api", error.message);
    }
  };

  useEffect(() => {
    conversationId && getMessage();
  }, [conversationId, newMessageFlag]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" });
  }, [messages]);

  return (
    <Wrapper>
      <Component>
        {messages &&
          messages.map((message) => (
            <Container ref={scrollRef}>
              <Message message={message} />
            </Container>
          ))}
      </Component>
      <Footer
        sendText={sendText}
        setText={setText}
        text={text}
        file={file}
        setFile={setFile}
        setImage={setImage}
      />
    </Wrapper>
  );
};

export default Messages;
