import React from 'react'

const BossMessage = () => {
    const [BossMessage, setBossMessage] = useState('');
    return (
        <>
            <div className='AR_Boss_Message'>
                <section className='AR_Message'>
                    <div className="AR_Message_Title">
                        <span id='AR_Never_Change'>
                            중대장의 한마디
                        </span>
                    </div>
                    <div className='AR_Message_Content'>
                        <span>
                            지금 태풍이 불고 있으니, 생활관에 대기해주시길 바라겠습니다.
                        </span>
                    </div>
                </section>
            </div>
        </>
    )
};

export default BossMessage;