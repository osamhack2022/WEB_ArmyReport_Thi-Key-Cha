import { createStoreHook, useDispatch, useSelector, } from 'react-redux';
import { rootReducer } from '../../../app/store';
import { UserActions } from '../../../app/UserSlice';

export default function useHeader() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.User.uid);

  return { user };
}