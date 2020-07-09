import React, { Suspense } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import './App.scss';
import Loader from './components/Loader';
const SearchDetails = React.lazy(() => import('./pages/SearchPage/index'));
const SearchPage = React.lazy(() => import('./pages/SearchDetails/index'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Router>
          <div id="body">
            <Switch>
              <Route path='/' exact component={SearchDetails} />
              <Route path='/show=:searchterm' exact component={SearchPage} />
            </Switch>
          </div>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
