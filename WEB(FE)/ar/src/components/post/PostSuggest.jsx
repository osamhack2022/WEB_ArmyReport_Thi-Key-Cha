import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import db from '../../database/DB_Manager';
import { addDoc, collection } from 'firebase/firestore';
import styled from "styled-components";
import { Stack, Button, TextField, Box } from '@mui/material';
import PostSuggestWrite from './PostSuggestWrite';
import PostSuggestList from './PostSuggestList';
import { useRunData } from './hooks/useRunData';

const PostSuggestBlock = styled.div(`
  width: 100%;
`);

const PostSuggest = ({ uid, udata, type }) => {
  const [list, runData] = useRunData(type);
  useEffect(runData, []);

  return(
    <>
      <PostSuggestBlock>
        <PostSuggestWrite uid={uid} udata={udata} type={type} />
        <PostSuggestList list={list} />
      </PostSuggestBlock>
    </>
  )
}

export default PostSuggest;