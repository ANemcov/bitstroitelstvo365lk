import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch
  } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';

import EnsureLoggedInContainer from './EnsureLoggedIn.js';
import Login from './login/Login.js';
import Restore from './login/Restore.js';
import Newcustomer from './Newcustomer.js';
import Sidebar from './Sidebar.js';
import Homepage from './Homepage.js';
import Profile from './Profile.js';
import Tariffs from './tariffs/Tariffs.js';
import EditMyTariff from './tariffs/MyTariffsEdit.js';
import Users from './Users.js';
import Finance from './finance/Finance.js';


const initialState = {
  loggedIn: false, //stub not to login while developing
  credentials: {
    login: "Test03",
    password: "P@ssw0rd"
  },
  loginProcess: {
    isLoginPending: false,
    isLoginSuccess: false,
    loginError: null
  }

}

function reducer(state = initialState, action) {

  console.log(JSON.stringify(action));
  console.log(JSON.stringify(state));
  let newState = Object.assign({}, state);
  
  switch (action.type) {
    
    case "LOGIN_IN_PROGRESS" :
      newState.loginProcess.isLoginSuccess = false;
      newState.loginProcess.isLoginPending = true;
      newState.loginProcess.loginError = null;
      break;
      case "LOGIN_ERROR" :
      newState.loginProcess.isLoginSuccess = false;
      newState.loginProcess.isLoginPending = false;
      newState.loginProcess.loginError = action.text;
      break;    
    case "IS_LOGGED_IN" : 
      newState.loginProcess.isLoginSuccess = true;
      newState.loginProcess.isLoginPending = false;
      newState.loginProcess.loginError = null;
      newState.loggedIn = true;
      break;
    default:
      break;
  }
  console.log(JSON.stringify(newState));
  return newState;
  
}

let store = createStore(reducer,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render((
    <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/restore" component={Restore}/>
        <Route exact path="/newcustomer" component={Newcustomer}/>
        <EnsureLoggedInContainer>
          <div className="wrapper" >
              <Sidebar />
              <Route exact path="/" component={Homepage}/>
              <Route exact path="/profile" component={Profile}/>
              <Route exact path="/tariffs" component={Tariffs}/>
              <Route exact path="/tariffs/edit" component={EditMyTariff}/>
              <Route exact path="/users" component={Users}/>
              <Route exact path="/finance" component={Finance}/>
          </div>
        </EnsureLoggedInContainer>
      </Switch>
    </BrowserRouter>
    </Provider>
  ), document.getElementById('root'))

registerServiceWorker();
