import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import axios from "axios";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 10px;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  margin-left: 5px;
  color: ${({ theme }) => theme.textSoft};
`;
const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comment }) => {
  const [commentRes, setCommentRes] = useState({});

  useEffect(() => {
    const fetchCommentRes = async () => {
      try {
        const res = await axios.get(`/users/find/${comment.userId}`);
        setCommentRes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCommentRes();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar src={commentRes.image} />
      <Details>
        <Name>
          {commentRes.name} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
