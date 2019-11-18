import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Card, Input, Col, Row, Button } from '../../components';
import './RegisterScreen.css';
import { Link, RouteComponentProps } from 'react-router-dom';
import { APIService, RequestBody } from '../../api';
import { IUser, User } from '../../models';
import TokenService from '../../api/token.service';

interface IUserInfo {
    username: string;
    password: string;
}
interface IRegisterProps {
    userInfo: IUserInfo;
    setBasicInfo: React.Dispatch<React.SetStateAction<{
        username: string;
        password: string;
    }>>;
    validate: () => void;
}
interface IRegisterFooterProps {
    disableAcctBtn: boolean;
    createAccount: () => void;
}

const RegisterCard = styled(Card)`
    width: 50%;
    padding: .5rem 2rem 2rem 2rem;
`;

const RegisterHeader = () => {
    return (
        <div className="Register-Header-Container">
            <h1>Sign up below</h1>
        </div>
    )
}

const RegisterBody: React.FC<IRegisterProps> = ({ userInfo, setBasicInfo }: IRegisterProps) => {
    
    const handleInput = (key: string, value: string) => {
        const { username, password }  = userInfo;
        const copy: any = {username, password};
        copy[key] = value;
        setBasicInfo(copy);
    }
    return (
        <div className="Register-Body-Container">
            <Row className="Register-Basic-Info">
                <Col size="6">
                    <Input type="text"
                    className="Register-Input" 
                    value={userInfo.username}
                    name="register-username" 
                    required 
                    placeholder="Enter your username"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput('username', e.target.value)}/>
                </Col>
                <Col size="6">
                    <Input type="password" 
                    className="Register-Input"
                    value={userInfo.password} 
                    name="register-password"
                    required 
                    placeholder="Enter your password"
                    minLength={6}
                    maxLength={32}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput('password', e.target.value)}/>
                </Col>
            </Row>
        </div>
    )
}

const RegisterFooter: React.FC<IRegisterFooterProps> = ({ disableAcctBtn, createAccount }: IRegisterFooterProps) => {

    return (
        <div className="Register-Footer-Container">
            <Row justifyContent="center">
                <Button disabled={disableAcctBtn} onClick={createAccount} primary size="lg">Create your Account</Button>
            </Row>
            <Row justifyContent="center">
                <Link to="/login">Already have an account? Log in</Link>
            </Row>
        </div>
    )
}

export const RegisterScreen: React.FC<RouteComponentProps> = ({ history }: RouteComponentProps) => {
    const [userInfo, setBasicInfo] = useState({
        username: "",
        password: ""
    });
    const [disableAcctBtn, setAcctDisable] = useState(true);

    useEffect(() => {
        validate();
    }, [userInfo]);

    const validate = (): void => {
        if(
            userInfo.username === "" || 
            userInfo.password === "" ||
            userInfo.password.length <= 5 ||
            userInfo.password.length > 32
        ) {
            setAcctDisable(true);
        }
        else {
            setAcctDisable(false);
        }
    }
    const createAccount = async () => {
        const api = new APIService('')
        .setHeaders([
            {
                key: 'Accept',
                value: 'application/json'
            }, 
            {
                key: 'Content-Type',
                value: 'application/json'
            },
        ])
        .setMethod("POST");
        const body = new RequestBody<IUser>(userInfo);
        const request = api.createRequest("user/create", body.requestBody);
        try {
            const result = await api.send(request);
            if(result.status === 201) {
                // success
                TokenService.setToken(result.data.access_token);
                const user = new User(result.data.username, '', result.data._id);
                user.setUserLocalStorage();
                history.replace('/app');

            }
        } catch (e) {
            console.log('Error');
            console.log(e);
        }
    }

    return (
        <RegisterCard>
            <RegisterHeader />
            <RegisterBody userInfo={userInfo} setBasicInfo={setBasicInfo} validate={validate}/>
            <RegisterFooter disableAcctBtn={disableAcctBtn} createAccount={createAccount}/>
        </RegisterCard>
    )
}