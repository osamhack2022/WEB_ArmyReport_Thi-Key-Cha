import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const UserRollCallCard = (Uobj) => {

    return (
        <Card sx={{ minWidth: 300 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    <span>계급 : {Uobj.Name}</span><br/>
                    <span>이름 : {Uobj.Classses}</span> 
                </Typography>
                <Typography variant="body2">
                    { Uobj.Uniqueness && 
                    <CardContent>
                        아픈 곳 : <CheckOutlined /> <br/>
                        증상 : {Uobj.Symptom}
                    </CardContent>
                    }
                    { !Uobj.Uniqueness && 
                    <CardContent>
                        아픈 곳 : <CloseOutlined /> <br/>
                    </CardContent>
                    }
                    { Uobj.Isabsent && 
                    <CardContent>
                        점호 열외 : <CheckOutlined /> <br/>
                        이유 : {Uobj.Reason}
                    </CardContent>
                    }
                    { !Uobj.Isabsent && 
                    <CardContent>
                        점호 열외 : <CloseOutlined /> <br/>
                    </CardContent>
                    }
                    { Uobj.Islastlight &&
                    <CardContent>
                        연등 희망 : <CheckOutlined /> <br/>
                        내용 : {Uobj.Content}
                    </CardContent>
                    }
                    { !Uobj.Islastlight &&
                    <CardContent>
                        연등 희망 : <CloseOutlined /> <br/>
                    </CardContent>
                    }
                </Typography>
            </CardContent>
        </Card>
    );
};

export default UserRollCallCard;
