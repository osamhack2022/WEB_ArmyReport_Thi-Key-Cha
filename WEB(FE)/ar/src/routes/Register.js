import React from 'react'

const Register = () => {
    const ClassDropDown = () => {
        document.getElementsByClassName("Dropdown_Btn").classList.toggle('show');
    };
    function DropDown(e){
        if(e.target.matches('Dropdown-Content')){
            let dropdowns = document.getElementByClassName('Dropdown-Content');
            let i;
            for (i=0;i<dropdowns.length();i++){
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')){
                    openDropdown.classList.remove('show');
                }
            }
        }
    };
    return (
        <div className="AR_User_Making">
            <div className="AR_Topic_Info">
                <input
                    name="user_id"
                    type="text"
                    placeholder='이름을 입력해주세요.'
                    required
                />
                <input
                    name="user_pwd"
                    type="text"
                    placeholder='비밀번호를 입력해주세요'
                    required
                />
                <div className="AR_Classes_Dropdown">
                    <button onClick={ClassDropDown} className='Dropdown_Btn'>계급</button>
                    <div className="Dropdown-Content">
                        <span>이병</span>
                        <span>일병</span>
                        <span>상병</span>
                        <span>병장</span>
                    </div>
                </div>
            </div>
            <div className="AR_Select_Info">

            </div>
        </div>
    )
}

export default Register;