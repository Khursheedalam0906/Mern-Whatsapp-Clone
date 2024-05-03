import { Box, Typography, styled } from "@mui/material";
import React, { useContext } from "react";
import { downloadMedia, formatDate } from "../../../utils/common-utils";
import { AccountContext } from "../../../context/AccoutProvider";
import DownloadIcon from "@mui/icons-material/Download";
import { iconPDF } from "../../../constants/data";

const Own = styled(Box)`
  background: #dcf8c6;
  max-width: 60%;
  margin-left: auto;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Wrapper = styled(Box)`
  background: #ffffff;
  max-width: 60%;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  margin-top: 6px;
  word-break: keep-all;
  amrgin-top: auto;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const Image = styled("img")({
  width: 250,
  height: "100%",
  objectFit: "cover",
});

const DownLoadIcon = styled(DownloadIcon)`
  margin-right: 10;
  border: 1px solid gray;
  border-radius: 50%;
`;

const PdfName = styled(Box)`
  font-size: 10px;
  color: #919191;
  margin-top: 6px;
  word-break: keep-all;
  amrgin-top: auto;
  align-items: center;
`;

const Message = ({ message }) => {
  const { account } = useContext(AccountContext);

  return (
    <>
      {account.email == message.senderId ? (
        <Own>
          {message?.type == "file" ? (
            <Box>
              {message?.text?.includes(".pdf") ? (
                <Box style={{ display: "flex" }}>
                  <img src={iconPDF} alt="Pdf" style={{ width: 80 }} />
                  <PdfName>
                    <Typography style={{ fontSize: 13 }}>
                      {message.text.split("/").pop()}
                    </Typography>
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <Box>
                        <DownloadIcon
                          onClick={(e) => downloadMedia(e, message.text)}
                        />
                      </Box>
                      <Box> {formatDate(message?.createdAt)}</Box>
                    </Box>
                  </PdfName>
                </Box>
              ) : (
                <Box>
                  <Image src={message.text} alt="img" />
                  <Time>
                    <DownloadIcon
                      onClick={(e) => downloadMedia(e, message.text)}
                    />
                    {formatDate(message?.createdAt)}
                  </Time>
                </Box>
              )}
            </Box>
          ) : (
            <>
              <Text>{message.text}</Text>
              <Time>{formatDate(message.createdAt)}</Time>
            </>
          )}
        </Own>
      ) : (
        <Wrapper>
          {message?.type == "file" ? (
            <Box>
              {message?.text?.includes(".pdf") ? (
                <Box style={{ display: "flex" }}>
                  <img src={iconPDF} alt="Pdf" style={{ width: 80 }} />
                  <PdfName>
                    <Typography style={{ fontSize: 13 }}>
                      {message.text.split("/").pop()}
                    </Typography>
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <Box>
                        <DownloadIcon
                          onClick={(e) => downloadMedia(e, message.text)}
                        />
                      </Box>
                      <Box> {formatDate(message?.createdAt)}</Box>
                    </Box>
                  </PdfName>
                </Box>
              ) : (
                <Box>
                  <Image src={message.text} alt="img" />
                  <Time>
                    <DownloadIcon
                      onClick={(e) => downloadMedia(e, message.text)}
                    />
                    {formatDate(message?.createdAt)}
                  </Time>
                </Box>
              )}
            </Box>
          ) : (
            <>
              <Text>{message.text}</Text>
              <Time>{formatDate(message.createdAt)}</Time>
            </>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default Message;
