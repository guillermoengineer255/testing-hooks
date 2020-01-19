import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { TablePage } from '../src/containers/tablePage/tablePage';
import { TablePageDetails } from '../src/containers/tablePageDetails/tablePageDetails';

export const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={TablePage} />
            <Route exact path="/base-details" component={TablePageDetails} />
        </Switch>)
}
