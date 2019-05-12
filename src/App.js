import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Store from './Store/configureStore';

import Main from './Pages/Main';

class App extends Component {
  render() {
    return (
        <Provider store={Store}>
            <Main />
        </Provider>
    );
  }
}

export default App;
