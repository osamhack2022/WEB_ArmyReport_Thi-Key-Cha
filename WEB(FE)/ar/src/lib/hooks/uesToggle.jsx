import { useState, useCallback } from 'react';

export default function useToggle() {
  const [value, setValue] = useState(false);
  const onToggle = useCallback(() => {
    setValue(!value);
  }, [value]);
  return [value, onToggle];
}