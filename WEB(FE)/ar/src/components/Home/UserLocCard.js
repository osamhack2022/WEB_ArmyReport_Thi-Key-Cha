import React from 'react';
import styled from 'styled-components';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const UserLocCard = (User) => {
  return (
    <>
      { User.IsVacation && 
        <Card>
            <CardContent className='user-info'>
                <Typography variant="h6">
                휴가
                </Typography>
                <Typography variant="body2">
                <span>계급 : {User.Class}</span> 
                <span>이름 : {User.Name}</span> 
                <br />
                </Typography>
            </CardContent>
        </Card>
      }
      { !User.IsVacation &&
        <Card>
            <CardContent className='user-info'>
                <Typography variant="body2">
                <span>계급 : {User.Class}</span> 
                <br/>
                <span>이름 : {User.Name}</span> 
                <br/>
                <span>장소 : {User.Located}</span>
                </Typography>
            </CardContent>
            <CardActions className="command-btn">
                <Button size="small">복귀</Button>
                <Button size="small">집합</Button>
            </CardActions>
        </Card>
      }
    </>
  );
};

export default UserLocCard;
