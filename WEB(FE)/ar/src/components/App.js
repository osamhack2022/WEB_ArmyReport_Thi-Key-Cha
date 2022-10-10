import React from 'react';
import styled from 'styled-components'
import { PersistGate } from 'redux-persist/integration/react';
import store, {persistor} from '../app/store'
import {Provider} from 'react-redux';
import AppRouter from './Router';

const Block = styled.div`
  margin-top: 100px;
`

function App() {
  return (
    <div className="App" >
      <Block>        
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
      </Block>
    </div>
  );
}

export default App;