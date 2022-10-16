import React from 'react';
import vacation_suffer from '../../static/image/vacation-suffer.png'
import we_need_you from '../../static/image/we-need-you.png'

const Onvacation = () =>{
    const [lastdate, setLastdate] = useState(0);
    const [turnover, setTurnover] = useState(false);
    if (lastdate === 0){
        setTurnover(true);
    }else{
        setTurnover(false);
    }
    return (
        <>
        { !turnover && 
            <div>
                <img 
                    src="vacation_suffer" 
                    alt=""
                />
                <h1>당신은 휴가중입니다!</h1>
                <p>휴가로 그동안의 피로를 싹 푸셨으면 좋겠습니다!</p>
                <p>복귀일까지 {lastdate}일 남으셨습니다!</p>
            </div>
        }
        { turnover && 
            <div>
                <img 
                    src="we_need_you" 
                    alt=""
                />
                <h1>오늘 복귀하셔야 됩니다.</h1>
                <p>조심해서 부대로 와주세요!</p>
            </div>
        }
        </>
    );
};

export default Onvacation;