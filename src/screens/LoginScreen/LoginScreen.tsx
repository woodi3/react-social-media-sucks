import React, {useState} from 'react';
import styled from 'styled-components';
import { Card, Input, Col, Row, Button } from '../../components';
import './LoginScreen.css';
import { Link, RouteComponentProps } from 'react-router-dom';
import { APIService, RequestBody } from '../../api';
import { IUser, User } from '../../models';
import TokenService from '../../api/token.service';

interface IUserInfo {
    username: string;
    password: string;
}
interface ILoginProps {
    userInfo: IUserInfo;
    setBasicInfo: React.Dispatch<React.SetStateAction<{
        username: string;
        password: string;
    }>>;
}
interface ILoginFooterProps {
    login: () => void;
}

const LoginCard = styled(Card)`
    width: 50%;
    padding: .5rem 2rem 2rem 2rem;
`;

const LoginHeader = () => {
    return (
        <div className="Login-Header-Container">
            <h1>Login to join the fun!</h1>
        </div>
    )
}

const LoginBody: React.FC<ILoginProps> = ({ userInfo, setBasicInfo }: ILoginProps) => {
    
    const handleInput = (key: string, value: string) => {
        const { username, password }  = userInfo;
        const copy: any = {username, password};
        copy[key] = value;
        setBasicInfo(copy);
    }
    return (
        <div className="Login-Body-Container">
            <Row className="Login-Basic-Info">
                <Col size="6">
                    <Input type="text"
                    className="Login-Input" 
                    value={userInfo.username}
                    name="login-username" 
                    required 
                    placeholder="Enter your username"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput('username', e.target.value)}/>
                </Col>
                <Col size="6">
                    <Input type="password" 
                    className="Login-Input"
                    value={userInfo.password} 
                    name="login-password"
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

const LoginFooter: React.FC<ILoginFooterProps> = ({ login }: ILoginFooterProps) => {

    return (
        <div className="Login-Footer-Container">
            <Row justifyContent="center">
                <Button onClick={login} primary size="lg">Login</Button>
            </Row>
            <Row justifyContent="center">
                <Link to="/register">Don't have an account? Create one now.</Link>
            </Row>
        </div>
    )
}


export const LoginScreen: React.FC<RouteComponentProps> = ({ history }: RouteComponentProps) => {
    const [userInfo, setBasicInfo] = useState({
        username: "",
        password: ""
    });
    // TODO move any api calls to a separate service
    const login = async () => {
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
        const request = api.createRequest("user/authenticate", body.requestBody);
        try {
            const result = await api.send(request);
            if(result.data.success) {
                // success
                TokenService.setToken(result.data.token);
                const user = new User(result.data.item.username, '', result.data.item.id);
                user.setUserLocalStorage();
                history.replace(`/app`);
            }
        } catch (e) {
            console.log('Error');
            console.log(e);
        }
    }

    return (
        <LoginCard>
            <LoginHeader />
            <LoginBody userInfo={userInfo} setBasicInfo={setBasicInfo} />
            <LoginFooter login={login}/>
        </LoginCard>
    )
}