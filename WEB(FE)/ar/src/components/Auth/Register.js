import React, { 
    useState,
    useEffect,
    useRef
} from 'react'
import { useNavigate } from 'react-router-dom';

import db from '../../database/DB_Manager';
import { doc, setDoc } from "firebase/firestore";
import { Cropsdata, Divisiondata, Bataliondata } from './Unitdata';
import "antd/dist/antd.min.css";
import { AuthActions } from '../../app/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Space
} from 'antd';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;
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
        'UserLocation' : userLocation,
        'UserLastDate' : new Date()
    });
    const [isLoad, setisLoad] = useState(false);

    const dispatch = useDispatch();

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const army_classes = [
        '이병','일병','상병','병장','하사','중사','상사','원사','준위',
        '소위','중위','대위','소령','중령','대령','준장','소장','중장','대장'
    ];

    const [Crop, setCrop] = useState(Cropsdata[4]);
    const [Division, setDivision] = useState(Divisiondata[Crop][0]);
    const [Batalion, setBatalion] = useState(Bataliondata[Division][0]);

    const onCropChange = (value) => {
        setCrop(Cropsdata[value]);
        setDivision(Divisiondata[value][0]);
    };
    const onDivisionChange = (value) => {
        setDivision(value);
        setBatalion(Bataliondata[value][0]);
    };
    const onBatalionChange = (value) => {
        setBatalion(value);
        setUserLocation({
            'Crop' : '',
            'Division' : '',
            'Brigade' : '',
            'Batalion' : '',
            'Company' : ''
        })
    }

    const onChange = (event) => {
        const {
            target : {name, value}
        } = event;
        setUserObj({
            ...UserObj,
            [name] : value,
        });
    };

    const onSubmit = () =>{
        const enteredEmail = UserObj.UserEmail;
        const enteredPassword = UserObj.Userpwd;
        
        setisLoad(true);
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBY5XFBwy8nrbepRvQdj7k4vPi3GCSBjG0',
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
                Userlastdate : UserObj.UserLastDate
            });
            history(`/`);
        }).catch(err => {
            alert(err.message);
        });
    }
    return (
        <Form
            labelCol={{
                span: 5,
            }}
            wrapperCol={{
                span: 15,
            }}
            initialValues={{
                UserObj : UserObj,   
            }}
            onFinish={onSubmit}
            autoComplete="off"
            layout="horizontal"
            onSubmit={(e)=>e.preventDefault()}
        >
            <Form.Item
                label="Email"
                name="UserEmail"
                rules={[
                {
                    required: true,
                    message: 'Please input your Email!',
                }]}
            >
                <Input 
                    name='userid'
                    onChange={onChange}
                />
            </Form.Item>
            <Form.Item
                label="Password"
                name="Userpwd"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                }]}
                
            >
                <Input.Password 
                    name='userpwd'
                    onChange={onChange}
                />
            </Form.Item>
            <Form.Item label="이름" name='UserName'>
                <Input name='UserName' maxLength={8}/>
            </Form.Item>
            <Form.Item label="계급" name='UserClasses' >
                <Select
                    name='UserClasses'
                    defaultValue={army_classes[0]}
                    style={{
                    width: 80,
                    }}
                    onChange={onChange}
                >
                    {army_classes.map((army) => (
                    <Option key={army}>{army}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label='전역일' name='UserLastDate'>
                <Space direction="vertical" size={12}>
                    <DatePicker 
                        name='UserLastDate'
                        defaultValue={moment(new Date(), dateFormat)} 
                        format={dateFormat} 
                        onChange={onChange}
                    />
                </Space>
            </Form.Item>
            <Form.Item label='소속부대'>
                <Select
                    name=''
                    defaultValue={Cropsdata[0]}
                    style={{
                    width: 120,
                    }}
                    onChange={onCropChange}
                >
                    {Cropsdata.map((crop) => (
                    <Option key={crop}>{crop}</Option>
                    ))}
                </Select>
                <Select
                    style={{
                    width: 120,
                    }}
                    value={Divisiondata[Cropsdata[0]]}
                    onChange={onDivisionChange}
                >
                    {Divisiondata[Crop].map((division) => (
                    <Option key={division}>{division}</Option>
                    ))}
                </Select>
                <Select
                    style={{
                    width: 120,
                    }}
                    value={Bataliondata[Divisiondata[Cropsdata[0]]]}
                    onChange={onBatalionChange}
                >
                    {Bataliondata[Division].map((batalion) => (
                    <Option key={batalion}>{batalion}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}    
            >
                <Button onSubmit={onSubmit}>회원가입</Button>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button>취소</Button>
            </Form.Item>
        </Form>
    )
}

export default Register;