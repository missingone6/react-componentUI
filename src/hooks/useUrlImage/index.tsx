import React, { useState, useEffect } from 'react';
interface IProps {

}
interface dataTypes {
  message: string;
  status: string;
}
const useUrlImage = (url: string, dependence: any[] = []): [boolean, dataTypes] => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    ajax(url)
      .then(v => {
        setData(JSON.parse(v as string));
        setLoading(false);
      }, e => {
        throw e;
      });
  }, dependence);
  return [loading, data];
}


function ajax(url: string) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
          console.log(xhr.responseText)
        } else {
          reject();
        }
      }
    }
  })
}
export default useUrlImage;