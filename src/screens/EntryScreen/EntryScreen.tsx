import React from 'react';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Button, Row } from '../../components';
import './EntryScreen.css';
import { RegisterScreen } from '../RegisterScreen';
import wave from '../../wave.svg';
import { LoginScreen } from '../LoginScreen';

const EntryComponent: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const goToRegisterScreen = () => {
        props.history.push('/register');
    };
    const goToLoginScreen = () => {
        props.history.push('/login');
    }
    return (
        <div className="Entry">
            <h1 className="Entry-Header-Text">Welcome to Social Media Sucks</h1>
            <h3 className="Entry-SubHeader-Text">Find the content just for you!</h3>
            <div className="Entry-Action-Btn">
                <Button primary onClick={goToRegisterScreen}>Register</Button>
                <Button onClick={goToLoginScreen}>Login</Button>
            </div>
        </div>
    )
}

export const EntryScreen: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const { match } = props;
    
    return (
        <Router>
            <img src={wave} className="Wave" alt="background" />
            <Switch>
                <Route exact path={match.path} component={EntryComponent} />
                <Route exact path={`${match.path}register`} render={() => {
                    return (
                    <Row justifyContent="center">
                        <RegisterScreen {...props}/>
                    </Row>
                    )
                }}/>
                <Route exact path={`${match.path}login`} render={() => {
                    return (
                    <Row justifyContent="center">
                        <LoginScreen {...props}/>
                    </Row>
                    )
                }}/>
            </Switch>
        </Router>
    )
}