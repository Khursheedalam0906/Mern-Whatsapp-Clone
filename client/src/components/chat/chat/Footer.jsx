import { Box, InputBase, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import axios from "axios";

const Container = styled(Box)`
  display: flex;
  background-color: #ededed;
  width: 100%;
  height: 55px;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: #919191;
  }
`;

const Search = styled(Box)`
  background-color: #ffffff;
  border-radius: 18px;
  width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 18px;
  height: 15px;
  padding-left: 25px;
  font-size: 14px;
`;

const ClipIcon = styled(AttachFileIcon)`
  transform: rotate(45deg);
`;

const Footer = ({ sendText, setText, text, file, setFile, setImage }) => {
  //
  const OnFileChange = (e) => {
    setFile(e.target.files[0]);
    setText(e.target.files[0].name);
  };

  const getImage = async () => {
    if (file) {
      const data = new FormData();
      data.append("name", file.name);
      data.append("file", file);
      //
      uploadFile(data);
    }
  };

  useEffect(() => {
    getImage();
  }, [file]);

  const uploadFile = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/file/upload`,
        data
      );
      setImage(response.data.imageUrl);
    } catch (error) {
      console.log("Error while uploading file api", error.message);
    }
  };

  return (
    <Container>
      <TagFacesIcon />
      <label htmlFor="inputFile">
        <ClipIcon />
      </label>
      <input
        type="file"
        id="inputFile"
        style={{ display: "none" }}
        onChange={(e) => OnFileChange(e)}
      />
      <Search>
        <InputField
          value={text}
          placeholder="Type a message"
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => sendText(e)}
        />
      </Search>
      <MicIcon />
    </Container>
  );
};

export default Footer;
