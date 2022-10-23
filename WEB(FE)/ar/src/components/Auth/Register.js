import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import db from '../../database/DB_Manager';
import { doc, setDoc } from "firebase/firestore";
import { Cropsdata, Divisiondata, Brigadedata, Bataliondata } from './Unitdata';
import "antd/dist/antd.min.css";
import { AuthActions } from '../../app/slice/AuthSlice';
import { useDispatch } from 'react-redux';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Space
} from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import logo from '../../static/image/head.png'
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

const Register = () => {
    const history = useNavigate();
    const [userLocation, setUserLocation] = useState({
        'Crop' : '',
        'Division' : '',
        'Brigade' : '',
        'Batalion' : '',
        'Company' : ''
    });
    const [UserObj, setUserObj] = useState({
        'UserEmail' : '',
        'Userpwd' : '',
        'UserName' : '',
        'UserClasses' : '',
        'UserPhone' : '',
        'UserLocation' : userLocation,
        'UserLastDate' : '',
        'isLocated' : '',
        'isVacation' : false,
    });
    const [isLoad, setisLoad] = useState(false);

    const dispatch = useDispatch();
    const army_classes = [
        '이병','일병','상병','병장','하사','중사','상사','원사','준위',
        '소위','중위','대위','소령','중령','대령','준장','소장','중장','대장'
    ];

    const [classes, setClasses] = useState("");

    const onhandleclass = (value) => {
        setUserObj({
            ...UserObj,
            ['UserClasses'] : value
        });
    }

    const [lastdate, setLastdate] = useState("");
    const onhandledate = (value) => {
        setLastdate(value._d);
        setUserObj({
            ...UserObj,
            ['UserLastDate'] : value._d
        });
    }

    const [Crop, setCrop] = useState(Cropsdata[3]);
    const [Division, setDivision] = useState(Divisiondata[Cropsdata[3]][0]);
    const [Brigade, setBrigade] = useState(Brigadedata[Divisiondata[Cropsdata[3]][0]][0]);
    const [Batalion, setBatalion] = useState(Bataliondata[Brigade]);
    const [Company, setCompany] = useState("");

    const onCropChange = (value) => {
        setCrop(value);
        setDivision(Divisiondata[value][0]);
    };
    const onDivisionChange = (value) => {
        setDivision(value);
        setBrigade(Brigadedata[value][0]);
    };
    const onBrigadeChange = (value) => {
        setBrigade(value);
        setBatalion(Bataliondata[value][0]);
    };
    const onBatalionChange = (value) => {
        setBatalion(value);
    };
    const onCompanyChange = (e) => {
        setCompany(e.target.value);
        setUserLocation({
            ['Crop'] : Crop,
            ['Division'] : Division,
            ['Brigade'] : Brigade,
            ['Batalion'] : Batalion,
            ['Company'] : Company
        });
        setUserObj({
            ...UserObj,
            ['UserLocation'] : userLocation,
        });
    }

    const [loadings, setLoadings] = useState([]);
    const onChange = (event) => {
        const {
            target : {name, value}
        } = event;
        setUserObj({
            ...UserObj,
            [name] : value,
        });
    };

    const pwdChechhandle=(e)=>{
        const {
            target : {value}
        } = e;
        const ref = getElementByClassName('CheckUserpwd');
        if (value.length !== 0){
            if(value === UserObj[Userpwd]){
                ref.setAttribute('error');
                ref.setAttribute('helperText','Incorrect entry.');
                ref.setAttribute('label','Not Match');
            }
        }else{
            ref.removeAttribute('error');
            ref.removeAttribute('helperText','Incorrect entry.');
            ref.removeAttribute('label','Not Match');
        }
    }

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {  
          const newLoadings = [...prevLoadings];
          newLoadings[index] = true;
          return newLoadings;
        });
        setTimeout(() => {
          setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = false;
            return newLoadings;
          });
        }, 6000);
      };

    const onSubmit = () =>{
        const enteredEmail = UserObj.UserEmail;
        const enteredPassword = UserObj.Userpwd;
        
        setisLoad(true);
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOOTGrItVa4Ul8YcitFoUnc1Z1HKj4J9k',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                header: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((res) => {
            setisLoad(false);
            if(res.ok){
                let okmessage = '가입하였습니다!';
                alert(okmessage);
                return res.json();
            }else{
                return res.json().then(data =>{
                    let errormessage = '인증 실패!';
                    if (data && data.error && data.error.message){
                        errormessage = data.error.message;
                    }
                    throw new Error(errormessage);
                });
            }
        }).then(async(data) => {
            dispatch(AuthActions.login(data.idToken));
            const uid = enteredEmail.split('@');
            await setDoc(doc(db, "02155004", "본부중대", "User",`${uid[0]}`), {
                Useremail : UserObj.UserEmail,
                Username : UserObj.UserName,
                Userclass : UserObj.UserClasses,
                Userlocated : UserObj.UserLocation,
                Userlastdate : UserObj.UserLastDate,
                IsLocated : UserObj.isLocated,
                IsVacation : UserObj.isVacation,
                IsBoss : false,
                Timetorollcall : false,
            });
            history(`/`);
        }).catch(err => {
            alert(err.message);
        });
    }
    return (
        <Background>
            <LogoImage src={logo} />
            <div className='register-form'>
                <RegisterForm
                    labelCol={{ span: 5, }}
                    wrapperCol={{ span: 15, }}
                    initialValues={{ UserObj : UserObj, }}
                    onFinish={onSubmit}
                    autoComplete="off"
                    layout="horizontal"
                    onSubmit={(e)=>e.preventDefault()}>
                    <LabelItem
                        name="UserEmail"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        }]}>
                        <ValidateInput 
                            placeholder='이메일'
                            name='UserEmail'
                            onChange={onChange} />
                    </LabelItem>
                    <LabelItem
                        name="Userpwd"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        }]}>
                        <PwdInput
                            placeholder='비밀번호'
                            name='Userpwd'
                            onChange={onChange} />
                    </LabelItem>
                    <LabelItem name='UserName'>
                        <ValidateInput placeholder='이름' name='UserName' maxLength={8} onChange={onChange}/>
                    </LabelItem>
                    <LabelItem name='UserClasses' >
                        <Select
                            placeholder='계급'
                            name='UserClasses'
                            style={{ width: 80, }}
                            onChange={onhandleclass}>
                            {army_classes.map((army) => (<Option key={army}>{army}</Option>))}
                        </Select>
                    </LabelItem>
                    <LabelItem name='UserLastDate'>
                        <Space direction="vertical" size={12}>
                            <DatePicker 
                                name='UserLastDate'
                                placeholder='전역일'
                                initialvalue={moment(new Date(), dateFormat)} 
                                format={dateFormat} 
                                onChange={onhandledate} />
                        </Space>
                    </LabelItem>
                    <LabelItem>
                        <Select
                            name='Crop'
                            value='군단'
                            initialvalue={Cropsdata[0]}
                            style={{ width: 120, }}
                            onChange={onCropChange}>
                            {Cropsdata.map((crop) => (<Option key={crop}>{crop}</Option>))}
                        </Select>
                        <Select
                            name='Division'
                            value='사단'
                            style={{ width: 120, }}
                            initialvalue={Divisiondata[Cropsdata[0]]}
                            onChange={onDivisionChange}>
                            {Divisiondata[Crop].map((division) => (<Option key={division}>{division}</Option>))}
                        </Select>
                        <Select
                            name="Brigade"
                            value='여단'
                            style={{ width: 120, }}
                            initialvalue={Brigadedata[Divisiondata[Cropsdata[0]]]}
                            onChange={onBrigadeChange}>
                            {Brigadedata[Division].map((brigade) => (<Option key={brigade}>{brigade}</Option>))}
                        </Select>
                        <Select
                            name="Batalion"
                            value='대대'
                            style={{ width: 120, }}
                            initialvalue={Bataliondata[Brigade]}
                            onChange={onBatalionChange}>
                            {Bataliondata[Brigade].map((batalion) => (<Option key={batalion}>{batalion}</Option>))}
                        </Select>
                        <ValidateInput placeholder="중대를 입력하세요 :-)" onChange={onCompanyChange}/>
                    </LabelItem>
                    <ButtonLayout>
                        <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)} htmlType="submit">회원가입</Button>
                        <Button type="button" onClick={() => history('/')}>취소</Button>
                    </ButtonLayout>
                </RegisterForm>
            </div>
        </Background>
    )
}

const ButtonLayout = styled.div`
    position: absolute;
    width: 100%;
    margin: 0 auto;
    float: left;
`

const LabelItem = styled(Form.Item)`
  text-align: center;
`

const PwdInput = styled(Input.Password)`
  margin-top: -50px;
  width: 550px;
  height: 90px;
  background-color: transparent;
  color: white;
  padding-left: 32px;
  border: 5px solid #574F7D;
  border-radius: 30px;
  &:hover {
    border: 5px solid #574F7D;
  }
  &:focus {
    border: 5px solid #574F7D;
  }
  
  input {
    background-color: transparent;
    font-size: 18px;
    color: white;
  }
  
  span {
    &:hover {
      border-right-width: none;
      border-color: none;
    }
  }
`

const ValidateInput = styled(Input)`
  width: 550px;
  height: 90px;
  background-color: transparent;
  color: white;
  font-size: 18px;
  padding-left: 32px;
  border: 5px solid #574F7D;
  border-radius: 30px;
  &:hover {
    border: 5px solid #574F7D;
  }
  &:focus {
    border: 5px solid #574F7D;
  }
`

const Button = styled.button`
  width: 250px;
  height: 60px;
  background-color: #574F7D;
  border-radius: 50px;
  color: white;
  font-size: 24px;
  border: none;
  outline: none;
  cursor: pointer;
`

const LogoImage = styled.img`
  padding-top: 200px;
  display: block;
  margin: auto;

  width: 96px;
`

const RegisterForm = styled(Form)`
  width: 550px;
  padding-top: 32px;
  position: relative;
  margin: 0 auto;
  text-align: center;
  display: block;
`

const Background = styled.div`
    width: 1920px;
    height: 1080px;
    background-color: #222831;

    .register-form {
        margin-top: 32px;
    }
`

export default Register;