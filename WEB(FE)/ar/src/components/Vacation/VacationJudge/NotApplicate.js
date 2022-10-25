import React from 'react'

import baby_ogu_running from '../../../static/image/baby-ogu-running.png'
import { Typography } from '@mui/material';
import Item from 'antd/lib/list/Item';

const NotApplicate = () => {
    return (
        <Item elevation={3}>
            <Typography variant="h2" gutterBottom>
                신청한 휴가가 없습니다..
            </Typography>
            <img
                src={baby_ogu_running}
                alt=""
            />
        </Item>
    )
}

export default NotApplicate;