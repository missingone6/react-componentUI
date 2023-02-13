import { useRef, useState } from 'react';
/**
 * 切换受控和非受控模式
 */
interface Options<T> {
  value?: T,
  onChange?: (v: T) => void
}

function usePropsValue<T>(options: Options<T>) {
  const { value, onChange } = options;
  const isControlled = value !== undefined;

  const stateRef = useRef<T | undefined>(value);

  const [_, setFlag] = useState({});
  if (isControlled) {
    stateRef.current = value;
  }
  const setState = (nextValue: T) => {
    stateRef.current = nextValue;
    setFlag({});//forceUpdate
    onChange?.(nextValue);
  }


  return [stateRef.current, setState] as const;
}

export default usePropsValue;
