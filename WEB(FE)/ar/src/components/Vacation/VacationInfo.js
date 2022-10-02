import * as React from 'react'
import './VacationInfo.module.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull= (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const VacationInfo = () => {
  const [vacationDate, setVacationDate] = useState({
    'startDate' : new Date(),
    'endDate' : new Date()
  });

  

  return (
    <>
        <Card className='vacation-info-date'>
            <CardContent className='vacation-start-date'>
              <Typography>
                출발일 : 
              </Typography>
            </CardContent>
            <div className="distance">
            </div>
            <div className="vacation-end-date">
                <Typography>
                  도착일:
                </Typography>
            </div>
        </Card>
    </>
  )
}

export default VacationInfo;