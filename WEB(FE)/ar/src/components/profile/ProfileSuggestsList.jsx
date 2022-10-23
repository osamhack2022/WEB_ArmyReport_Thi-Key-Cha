import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ProfileTableTemplate from './ProfileTableTemplate'
import { Firestore } from './ProfileViewer';

const ProfileSuggestsList = () => {
  const db = new Firestore('post-suggests');
  return (
    <>
      <ProfileTableTemplate list={db.fetchCollection()} />
    </>
  );
}

export default ProfileSuggestsList;