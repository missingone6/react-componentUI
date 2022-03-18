/**
 * 过滤数组
 * @param {T[]} arr
 * @param  {boolean} containsPrototype遍历时是否走原型链
 * @param  {string[]} filterKeyArray
 * @return {any}
 */

export default function filterArray<T, U>(arr: any, containsPrototype: boolean, filterKeyArray: string[]): any {
  return arr.map((item: any) => {
    let result: any = {};
    let keysArray: string[] = [];
    if (containsPrototype) {
      for (let i in item) {
        keysArray.push(i);
      }
    } else {
      keysArray = Object.keys(item);
    }
    keysArray
      .filter((key: string) => {
        return filterKeyArray.includes(key)
      })
      .forEach((key: string) => {
        result[key] = item[key]
      });
    return result;
  })
}
