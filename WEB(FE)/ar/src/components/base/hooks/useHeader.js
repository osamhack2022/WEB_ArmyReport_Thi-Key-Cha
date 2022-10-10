import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function useHeader() {
  const dispath = useDispatch();
  const userId = useSelector((state) => state.user.uid)
  const userData = useSelector((state) => state.user.UserObj)
  const user = {
    uid: userId,
    data: userData
  }

  /* TODO: 마이프로필 드롭 메뉴중에서 logout시, 발생하는 이벤트 */
  const onLogout = useCallback(async () => {
  })

  /* TODO: 검색 아이콘 클릭시, 열리는 이벤트 */
  const onSerachClick = useCallback(() => {

  })

  return { user }
}