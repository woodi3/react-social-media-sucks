import React from 'react';
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';
import socialMediaSucksApp from '../../store';
import { Provider } from 'react-redux';
import { HomeContainer } from '../HomeContainer';

const AppComponent: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const {match} = props;
    return (
        <Provider store={socialMediaSucksApp}>
            <div style={{ marginTop: 40 }}>
            <Switch>
                <Route exact path={`${match.url}profile`} />
                <Route path={match.url} component={HomeContainer} />
            </Switch>
            </div>
        </Provider>
    );
}
export const AppContainer = withRouter(AppComponent); 