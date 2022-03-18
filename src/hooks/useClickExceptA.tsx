import { useEffect } from 'react';

/**
 * useClickExceptA 点击除了ref.current元素以外其他的地方，执行fn函数
 * @param {any} ref
 * @param  {Function} fn
 * @return {void} 
 */

function useClickExceptA(ref: any, fn: Function) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current.contains(e.target)) return;
      fn();
    }
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    }
  }, [ref, fn]);
}

export default useClickExceptA;