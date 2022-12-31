import {
  ThumbUpOutlined,
  ThumbDownOffAltOutlined,
  ReplyOutlined,
  AddTaskOutlined,
  ThumbUp,
  ThumbDown,
} from "@mui/icons-material";
import styled from "styled-components";
import Comments from "../components/Comments";
import Card from "../components/Card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscriptions } from "../redux/userSlice";
const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
const Hr = styled.hr`
  margin: 15px 0px;
  color: ${({ theme }) => theme.soft};
`;

const Reccommendation = styled.div`
  flex: 2;
`;
const RChannel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.span`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const Description = styled.p`
  margin-top: 5px;
  color: ${({ theme }) => theme.textSoft};
  margin-bottom: 20px;
  font-size: 12px;
`;

const ChannelCounter = styled.span`
  font-size: 14px;
`;

const VideoFrame = styled.video`
  width: 100%;
  max-height: 720px;
  object-fit: cover;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);

  const { currentVideo } = useSelector((state) => state.video);

  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);

        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        // console.log(videoRes.data);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLikes = async () => {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  const handleDislikes = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSubsriptions = async () => {
    currentUser.subscriberUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscriptions(channel._id));
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} />
        </VideoWrapper>
        {currentVideo && (
          <>
            <Title>{currentVideo.title}</Title>
            <Details>
              <Info>
                {currentVideo.views} views . {format(currentVideo.createdAt)}
              </Info>
              <Buttons>
                <Button onClick={handleLikes}>
                  {currentVideo.likes.includes(currentUser._id) ? (
                    <ThumbUp />
                  ) : (
                    <ThumbUpOutlined />
                  )}
                  {currentVideo.likes.length}
                </Button>
                <Button onClick={handleDislikes}>
                  {currentVideo.dislikes.includes(currentUser._id) ? (
                    <ThumbDown />
                  ) : (
                    <ThumbDownOffAltOutlined />
                  )}
                  Dislike
                </Button>
                <Button>
                  <ReplyOutlined /> Share
                </Button>
                <Button>
                  <AddTaskOutlined /> Save
                </Button>
              </Buttons>
            </Details>
          </>
        )}
        <Hr />
        <RChannel>
          <ChannelInfo>
            <Image src={channel.image} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              {currentVideo && <Description>{currentVideo.desc}</Description>}
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSubsriptions}>
            {currentUser.subscriberUsers.includes(channel._id)
              ? "SUBSCRIBEB"
              : "SUBSCRIBE"}
          </Subscribe>
        </RChannel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      {/* <Reccommendation>
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
      </Reccommendation> */}
    </Container>
  );
};

export default Video;
