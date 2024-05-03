import { Box, Typography, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext } from "react";
import { AccountContext } from "../../../context/AccoutProvider";

const Header = styled(Box)`
  height: 60px;
  display: flex;
  align-items: center;
  background: #ededed;
  color: #4a4a4a;
  padding-left: 20px;
  padding-right: 20px;
`;

const Image = styled("img")({
  height: 40,
  width: 40,
  objectFit: "cover",
  borderRadius: "50%",
});

const Name = styled(Typography)`
  margin-left: 12px;
`;

const Status = styled(Typography)`
  margin-left: 12px;
  font-size: 12px;
`;
const RightContainer = styled(Box)`
  margin-left: auto;
  & > svg {
    padding: 8px;
    font-size: 22px;
  }
`;
const ChatHeader = ({ person }) => {
  const { activeUsers } = useContext(AccountContext);
  //
  return (
    <Header>
      <Image src={person.profile_pic} alt="dp" />
      <Box>
        <Name>{person.name}</Name>
        <Status>
          {activeUsers?.find((user) => user.email === person.email)
            ? "Online"
            : "Offline"}
        </Status>
      </Box>
      <RightContainer>
        <SearchIcon />
        <MoreVertIcon />
      </RightContainer>
    </Header>
  );
};

export default ChatHeader;
