import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'
import Splash from './splash'
import * as serviceWorker from './serviceWorker';

const App = React.lazy(()=>import('./App'))

ReactDOM.render(
  <React.Fragment>
    <Suspense fallback={<Splash/>}>
      <App />
    </Suspense>
  </React.Fragment>,
  // <Splash/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// 