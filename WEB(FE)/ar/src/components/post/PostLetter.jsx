import PostLetterList from "./PostLetterList";
import PostLetterWrite from './PostLetterWrite'
import { useEffect } from "react";
import { useRunData } from "./hooks/useRunData";

const PostLetter = ({ uid, udata, type }) => {
  const [list, runData] = useRunData(type);
  useEffect(runData, []);

  return (
    <>
      <PostLetterWrite uid={uid} udata={udata} />
      <PostLetterList list={list} type={type} />
    </>
  )
}

export default PostLetter;