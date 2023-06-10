import styled from "styled-components";
import React from "react";

import BmatTube from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import {
  Explore,
  Games,
  Help,
  History,
  MovieSharp,
  MusicNoteOutlined,
  Newspaper,
  ReportSharp,
  Settings,
  LiveHelp,
  LightMode,
  Subscriptions,
  VideoLibraryOutlined,
  Sports,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 120vh;
  width: 100vw;
  color: ${({ theme }) => theme.text};
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  padding: 16px 24px;
  /* background-color: red; */
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 2px;
  gap: 2px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 4.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px;
  border: 0.5px solid ${({ theme }) => theme.soft};
  background-color: ${({ theme }) => theme.text};
`;

const Login = styled.div``;

const Button = styled.button`
  border: 1px solid #3ea6ff;
  padding: 5px 15px;
  font-weight: 500;
  border-radius: 3px;
  background-color: transparent;
  align-items: center;
  display: flex;
  margin-top: 10px;
  gap: 5px;
  cursor: pointer;
  color: #3ea6ff;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #aaaaaa;
`;

const Menu = ({ setDarkMode, darkMode }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={BmatTube} />
            BmatTube
          </Logo>
        </Link>
        <Item>
          <HomeIcon />
          Home
        </Item>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <Explore />
            Explore
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <Subscriptions />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryOutlined />
          Library
        </Item>
        <Item>
          <History />
          History
        </Item>
        <Hr />
        {!currentUser && (
          <>
            <Login>
              Sign in to like videos, comments and subcribe
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlined />
                  Sign In
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Title>BEST OF BMATTUBE</Title>
        <Item>
          <MusicNoteOutlined />
          Music
        </Item>
        <Item>
          <Sports />
          Sports
        </Item>
        <Item>
          <Games />
          Games
        </Item>
        <Item>
          <MovieSharp />
          Movies
        </Item>
        <Item>
          <Newspaper />
          News
        </Item>
        <Item>
          <LiveHelp />
          Live
        </Item>
        <Hr />
        <Item>
          <Settings />
          Settings
        </Item>
        <Item>
          <ReportSharp />
          Report
        </Item>
        <Item>
          <Help />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <LightMode />
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
