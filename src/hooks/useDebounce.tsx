import { useEffect, useState } from 'react';
/**
 * 防抖：点击多次，以最后一次修改的值有效值
 * @param {initialValue} 变化的值
 * @param  {wait} 防抖时间间隔
 * @return {value} 经过防抖处理后的值
 */

function useDebounce(initialValue: any, wait: number) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    let timer = setTimeout(() => {
      setValue(initialValue);
    }, wait);
    return () => {
      clearTimeout(timer);
    }
  }, [initialValue, wait])
  return value;
}

export default useDebounce;
