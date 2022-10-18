import React from 'react';
import styled from 'styled-components'
import { PersistGate } from 'redux-persist/integration/react';
import store, {persistor} from '../app/store'
import {Provider} from 'react-redux';
import AppRouter from './Router';
import AuthLoadFake from './Auth/AuthLoadFake';
import '../fonts/font.css'

function App() {
  return (
    <div className="App" >
      <AuthLoadFake />   
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;