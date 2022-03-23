import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-ts-antd/build/css/index.css";
import {  Menu, MenuItem, SubMenu } from 'react-ts-antd'


const App = () => {
  return (
    <>

      <Menu mode="horizontal" style={{
        // color: "black",此处无效，要在外层设置fontColor
        backgroundColor: "green",
        fontSize: "30px",
        // width:"400px"
      }}
        defaultNumber={0}
        activeColor="red"
        fontColor="blue"
        itemHeight="100px"
        handleClick={(index: number, keyWord: string) => {
          console.log(index, keyWord)
        }
        }>
        <MenuItem style={{
          // height:"200px",
          // lineHeight:"200px"
        }}>
          <a href="#">语文书</a>
        </MenuItem>
        <MenuItem >数学书</MenuItem>
        <MenuItem >英文书</MenuItem>
        <SubMenu title="历史书">
          <MenuItem>史记</MenuItem>
          <MenuItem >万历十五年</MenuItem>
          <SubMenu title="明朝那些事" >
            <MenuItem >明朝那些事1</MenuItem>
            <MenuItem >明朝那些事2</MenuItem>
          </SubMenu>
        </SubMenu>
        <SubMenu title="国外精选">
          <MenuItem >追风筝的人</MenuItem>
          <MenuItem >解忧杂货铺</MenuItem>
          <MenuItem >简爱</MenuItem>
        </SubMenu>
        <MenuItem >订阅中心</MenuItem>
        <MenuItem disable={true}>了解更多</MenuItem>
      </Menu >
    </>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));