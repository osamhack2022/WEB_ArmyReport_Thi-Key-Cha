import React from 'react'
import {
  useFirestoreDocument,
  useFirestoreTransaction,
} from "@react-query-firebase/firestore";
import { doc } from "firebase/firestore";
import db from '../../database/DB_Manager'
import styled from 'styled-components'

const LettersList = ({ user_id }) => {
  const ref = doc(db, "post-letters", user_id);
  const query = useFirestoreDocument(
    ["post-letters", user_id],
    ref,
    {
      subscribe: true,
      includeMetadataChanges: true,
    },
    {
      onSuccess(snapshot) {
        console.log("Successfully fetched product ID: ", snapshot.id);
      }
    }
  )

  if (query.isError) {
    return <p>응애: {query.error.message}</p>
  }

  const snapshot = query.data;

  return (
    <>
      <div>
        <h1>{snapshot.data()}</h1>
      </div>
    </>
  )
}

export default LettersList;