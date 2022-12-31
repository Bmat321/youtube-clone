import {
  AccountCircleOutlined,
  SearchOutlined,
  VideoCallOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Upload from "./Upload";
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  padding: 0 10px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  display: flex;
  border-radius: 3px;
  border: 1px solid #ccc;
  padding: 5px;
`;

const Input = styled.input`
  outline: none;
  border: none;
  background-color: transparent;
`;

const Button = styled.button`
  border: 1px solid #3ea6ff;
  padding: 5px 15px;
  font-weight: 500;
  border-radius: 3px;
  background-color: transparent;
  align-items: center;
  display: flex;
  gap: 5px;
  cursor: pointer;
  color: #3ea6ff;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  gap: 10px;
  cursor: pointer;
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Searching..." />
            <SearchOutlined />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlined onClick={() => setOpen(true)} />
              <Avatar src={currentUser.image} />
              {currentUser.name}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlined />
                Sign In
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
