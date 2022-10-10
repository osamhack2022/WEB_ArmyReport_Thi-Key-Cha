import { useRef } from 'react';
import { toast } from 'react-toastify'
import useThrottle from '../../../lib/hooks/useThrottle';

const usePushNotice = () => {
  const noticeRef = useRef(null);
  const timerRef = useThrottle();

  // Notification이 지원되지 않는 브라우저가 있을시
  if (!Notification) {
    toast.error(`
      알림 기능이 지원되지 않는 브라우저 입니다. 
      Chrome 브라우저 사용을 권장 드립니다!
    `)
    return;
  }

  if (Notification.permission !== 'granted') {
    try {
      Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') return;
      })
    } catch(err) {
      if (err instanceof TypeError) {
        Notification.requestPermission().then((permission) => {
          if (permission !== 'granted') return;
        })
      } else {
        console.error(err);
      }
    }
  }

  const setNoticeClickEvent = () => {
    noticeRef.current.onclick = (event) => {
      event.preventDefault();
      window.focus();
      noticeRef.current.close();
    }
  }
  
  const setNoticeTimer = (timeout) => {
    timerRef.throttle(() => {
      noticeRef.current.close();
      noticeRef.current = null;
    }, timeout);
  }

  const fireNoticeWithTimeout = (title, timeout, options = {}) => {
    if (Notification.permission !== 'granted') return;

    const newOption = {
      badge: '',
      icon: '',
      ...options
    }

    if (!noticeRef.current) {
      setNoticeTimer(timeout);      
      noticeRef.current = new Notification(title, newOption)
      setNoticeClickEvent();
    }
    
  }

  return { fireNoticeWithTimeout }
}

export default usePushNotice;