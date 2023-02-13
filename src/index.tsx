import ReactDOM from 'react-dom';
import React, { useState, useReducer } from 'react';
import AutoInput from './AutoInput';


const App = () => {
  const [value, setValue] = useState('123');

  console.log('render')
  return (
    <>
      <AutoInput
        value={value}
        onChange={(value) => {
          console.log(value)
          setValue(value)
        }}
        style={{
          width: '500px'
        }}
        fetchSuggestions={(str: string) => { return ['a', 'b'] }}
        placeholder='123'
        prefixIcon="arrow-down"
        triggerOnFocus={false}
        createMenus={(item, index) => {
          return index + ',,,' + item;
        }}
        select={(s) => {
          console.log(s);
        }} />

    </>
  )
}



ReactDOM.render(<App />, document.getElementById('root'));