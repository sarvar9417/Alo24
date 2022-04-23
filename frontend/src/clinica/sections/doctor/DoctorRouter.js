import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {DoctorClients} from "./doctorclients/DoctorClients";
import {Samples} from "./samples/Samples";
import {Tables} from "./tables/Tables";
import {Conclusion} from "./conclusion/Conclusion";
import Templates from "./templates/Templates";

export const DoctorRouter = () => {
    return (
        <div>
            <Switch>
                <Route path="/alo24" exact>
                    <DoctorClients/>
                </Route>
                <Route path="/alo24/samples">
                    <Samples/>
                </Route>
                <Route path="/alo24/tables">
                    <Tables/>
                </Route>
                <Route path="/alo24/conclusion">
                    <Conclusion/>
                </Route>
                <Route path="/alo24/template">
                    <Templates/>
                </Route>
                <Redirect to="/alo24"/>
            </Switch>
        </div>
    );
};
