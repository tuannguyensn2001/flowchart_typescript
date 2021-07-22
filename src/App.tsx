import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";

import {defineRoute} from "./defines/route";
import WfDefDetail from "./features/WfDefDetail";


function App() {
    return (

        <BrowserRouter>

            <Switch>
                <Route
                    path={defineRoute.WF_DEF_DETAIL}
                    component={WfDefDetail}
                />
            </Switch>

        </BrowserRouter>

    );
}

export default App;
