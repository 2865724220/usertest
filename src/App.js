import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import './App.css';
import Loan from './component/loan/loan';
import LoanConfirm from './component/loanconfirm/loanconfirm';
import RedPacket from './component/redpacket/redpacket';
import Invite from './component/invite/invite';
import InviteRules from './component/inviterules/inviterules';
import stores from './stores'

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Provider {...stores}>
          <div className="App">
            <Route exact path="/" component={ Loan } />
            <Route path="/loanconfirm" component={ LoanConfirm } />
            <Route path="/redpacket" component={ RedPacket } />
            <Route path="/invite" component={ Invite } />
            <Route path="/inviterules" component={ InviteRules } />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
