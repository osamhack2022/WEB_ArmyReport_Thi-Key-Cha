import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onMessage, onBackgroundMessage } from 'firebase/messaging'
import { messaging } from '../../../database/message/messaging_init_in_sw'
import { persistor } from '../../../app/store'
import useThrottle from '../../../lib/hooks/useThrottle';

export default function useHeader() {
  const dispath = useDispatch();
  const timerRef = useThrottle();
  const userId = useSelector((state) => state.user.uid)
  const userData = useSelector((state) => state.user.UserObj)
  const user = {
    uid: userId,
    data: userData
  }

  const onLogout = useCallback(async (timeout=500) => {
    try {
      if (user.uid) {
        timerRef.throttle(async () => {
          alert('로그아웃 되었습니다.');
          await persistor.purge();
          window.location.href = '/';
        }, timeout)
      }
    } catch {}
  });

  return { user, onLogout }
}