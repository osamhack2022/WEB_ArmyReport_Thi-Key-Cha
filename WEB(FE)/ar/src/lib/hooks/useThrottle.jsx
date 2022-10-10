import { useRef } from 'react';

const useThrottle = () => {
  // timer를 저장하는 Ref를 하나 만든다. 
  const timerRef = useRef(null);

  const throttle = (callback, delay) => {
    // 만약 timer가 없다면,
    if (!timerRef.current) {
      // 새로운 timer를 설정해준다.
      timerRef.current = setTimeout(() => {
        // delay time이 끝나면 callback을 실행한다.
        callback();
        // 다 실행하고 나면 timer를 초기화한다.
        timerRef.current = null;
      }, delay);
    }
  };

  return { throttle };
};

export default useThrottle;