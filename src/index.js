/*!

=========================================================
* Purity UI Dashboard - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/purity-ui-dashboard/blob/master/LICENSE.md)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import ReactDOM from 'react-dom';

import AdminLayout from 'layouts/Admin.js';
import AuthLayout from 'layouts/Auth.js';
import { MoralisProvider } from 'react-moralis';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

const appId = "8r3Fu2xR3mDSmmq8HsXcaHaahhBTYzlaiCF5GyNN";
const serverUrl = "https://gpqnczwshizv.usemoralis.com:2053/server";

ReactDOM.render(
  <BrowserRouter>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Redirect from={`/`} to="/auth/signin" />
      </Switch>
    </MoralisProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
