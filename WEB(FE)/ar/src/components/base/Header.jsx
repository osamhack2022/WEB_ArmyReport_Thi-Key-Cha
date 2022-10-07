import { Link } from 'react-router-dom';
import useHeader from './hooks/useHeader';
import styled from 'styled-components'

import { PersistGate } from 'redux-persist/integration/react';
import store, {persistor} from '../../app/store'
import {Provider} from 'react-redux';

function Header(props) {
  const { user } = useHeader();
  console.log(store);
  
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Block>
            <PostButton to="/post">마음의 편지</PostButton>
          </Block>
        </PersistGate>
      </Provider>
    </>
  )
}

const Block = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  background: #222831;
  a {
    color: white;
    text-decoration: none;
  }
`

const PostButton = styled(Link)`
  display: flex;
`

export default Header;