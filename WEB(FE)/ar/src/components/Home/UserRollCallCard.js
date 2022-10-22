import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const UserRollCallCard = (Uobj) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">
                    계급 : {Uobj.Uobj.Classes}
                </Typography>
                <Typography variant="h5">
                    이름 : {Uobj.Uobj.Name}
                </Typography>
                <CardContent variant="body2">
                    { Uobj.Uobj.Uniqueness && 
                    <CardContent>
                        아픈 곳 : <CheckOutlined /> <br/>
                        증상 : {Uobj.Uobj.Symptom}
                    </CardContent>
                    }
                    { !Uobj.Uobj.Uniqueness && 
                    <CardContent>
                        아픈 곳 : <CloseOutlined /> <br/>
                    </CardContent>
                    }
                    { Uobj.Uobj.Isabsent && 
                    <CardContent>
                        점호 열외 : <CheckOutlined /> <br/>
                        이유 : {Uobj.Uobj.Reason}
                    </CardContent>
                    }
                    { !Uobj.Uobj.Isabsent && 
                    <CardContent>
                        점호 열외 : <CloseOutlined /> <br/>
                    </CardContent>
                    }
                    { Uobj.Uobj.Islastlight &&
                    <CardContent>
                        연등 희망 : <CheckOutlined /> <br/>
                        내용 : {Uobj.Uobj.Content}
                    </CardContent>
                    }
                    { !Uobj.Uobj.Islastlight &&
                    <CardContent>
                        연등 희망 : <CloseOutlined /> <br/>
                    </CardContent>
                    }
                </CardContent>
            </CardContent>
        </Card>
       
    );
};

export default UserRollCallCard;
