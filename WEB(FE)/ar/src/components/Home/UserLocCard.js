import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const UserLocCard = (User) => {
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardContent>
        <Typography variant="h5" component="div">

        </Typography>
        <Typography variant="body2">
          <span>계급 : {User.Class}</span> 
          <span>이름 : {User.Name}</span> 
          <br />
          <span>장소 : {User.Located}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default UserLocCard;
