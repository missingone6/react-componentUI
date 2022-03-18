import { useEffect, useRef, useState } from 'react';

/**
 * useEffect 页面初次渲染时不执行
 * @param {fn} 依赖项，类似于useEffect第1个参数
 * @param  {inputs} 依赖项，类似于useEffect第2个参数
 * @sw  {inputs} 当sw设置为true时，该函数功能失效，相等于useEffect函数
 * @return {void}
 */

// function useDidUpdateEffect<T>(fn: Function, inputs: Array<T>) {
//   const [didMountRef, setDidMountRef] = useState(false);
//   useEffect(() => {
//     if (didMountRef) {
//       fn();
//     }
//     else {
//       setDidMountRef(!didMountRef);
//     }
//   }, inputs);
// }


function useDidUpdateEffect(fn: Function, inputs: string[], sw: boolean) {
  const didMountRef = useRef(sw ? true : false);
  useEffect(() => {
    if (didMountRef.current) {
      fn();
    }
    else {
      didMountRef.current = true;
    }
  }, inputs);
}


export default useDidUpdateEffect;
