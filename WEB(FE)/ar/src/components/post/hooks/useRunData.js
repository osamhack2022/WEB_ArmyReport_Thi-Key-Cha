import { useState } from "react";
import { Firestore } from '../PostViewer'

export function useRunData(docType) {
  const [list, setList] = useState([]);
  const coll = new Firestore()
  const runData = () => {
    coll.refColl(docType)
    .then((val) => setList(val))
    .catch((e) => console.log(e));
  }

  console.log(list);

  return [list, runData]
}