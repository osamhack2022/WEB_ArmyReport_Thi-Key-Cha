import React from 'react';
import styled from 'styled-components';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const LocCardStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 30px;
  width: calc(100%);
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;

  .user-info{
    box-sizing: border-box;
    flex-direction-row;
    padding-left:10px;
    padding-right:10px;
    padding-top: 10px;
  }
`

const UserLocCard = (User) => {
  return (
    <LocCardStyle>
      <div className="card-design">
        <Card>
          <CardContent className='user-info'>
            <Typography variant="body2">
              <span>계급 : {User.Class}</span> 
              <span>이름 : {User.Name}</span> 
              <br />
              <span>장소 : {User.Located}</span>
            </Typography>
          </CardContent>
          <CardActions className="command-btn">
            <Button size="small">복귀</Button>
            <Button size="small">집합</Button>
          </CardActions>
        </Card>
      </div>
    </LocCardStyle>
    
  );
};

export default UserLocCard;
