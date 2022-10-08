import { useSelector, useDispatch } from 'react-redux';

export default function useUserLoader() {
  const dispatch = useDispatch();
  const getCurrentUserId = useSelector((state) => state.user.uid);
  const getCurrentUserObj = useSelector((state) => state.user.UserObj);

  return { getCurrentUserId, getCurrentUserObj }
}