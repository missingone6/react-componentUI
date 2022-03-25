# react-componentUi

这是一款基于react hooks+ts开发的常用的ui组件。项目已发布到npm。

## 使用方法

### 以react-create-app为例，首先`npm i react-component-ui`

```
npm i react-component-ui
```

### 以Menu组件为例，其次，在app.js中写入

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Menu, MenuItem, SubMenu } from 'react-component-ui';
//注意样式文件的引入
import 'react-component-ui/build/css/index.css';

const App = () => {
  return (
    <Menu mode="vertical" style={{
      // color: "black",此处无效，要在外层设置fontColor
      backgroundColor: "green",
      fontSize: "30px",
      // width:"400px"
    }}
      defaultNumber={0}
      activeColor="red"
      fontColor="blue"
      itemHeight="100px"
      handleClick={(index, keyWord) => {
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
  )
}
ReactDOM.render(<App />, document.getElementById('root'));
```

## Icon

### 简介

**通过对react-fontawesome的简单封装，实现图标的使用。**

react-fontawesome是一个成熟的第三方图标库,底层采用svg的方式实现，在使用时引入想要使用的图标即可，相比于icon-font的图标方式，他不必一次性引入全部图标。

使用属性参考 https://fontawesome.com/v6/docs/web/use-with/react/style

图标搜索 https://fontawesome.com/icons/

| 属性      | 说明       | 类型                                    | 默认值  | 必选项 |
| --------- | ---------- | --------------------------------------- | ------- | ------ |
| type      | 按钮主题   | primary\|default\|danger\|warn\|success | default |        |
| style     | 自定义样式 | object                                  | null    |        |
| className | 类名       | string                                  |         |        |

### 使用方法

```javascript
<Icon 
	icon="arrow-rotate-right"
	size='5x'
	rotation={90}
	border
/>
```



## Button

| 属性     | 说明                                        | 类型                                    | 默认值  | 必选项 |
| -------- | ------------------------------------------- | --------------------------------------- | ------- | ------ |
| type     | 设置按钮类型                                | primary\|default\|danger\|warn\|success | default | ×      |
| size     | 设置按钮大小，                              | small \| large\|middle                  | -       | ×      |
| children | 传入按钮中文字内容                          | string                                  | -       | ×      |
| disabled | 值为true时设置按钮为不可点击状态，默认false | boolean                                 | -       | ×      |
| round    | 是否需要圆角                                | boolean                                 | false   | ×      |
| style    | 自定义样式                                  | object                                  | null    | ×      |



## Input

| 属性          | 说明                                        | 类型                   | 默认值 | 必选项 |
| ------------- | ------------------------------------------- | ---------------------- | ------ | ------ |
| size          | 设置按钮大小，                              | small \| large\|middle | -      |        |
| disabled      | 值为true时设置按钮为不可点击状态，默认false | boolean                | -      |        |
| placeholder   | 输入框的提示                                | string                 | -      |        |
| defalutString | 输入框的默认值                              | string                 | -      |        |
| prefixIcon    | 设置输入框前缀图标,规则参考Icon组件         | string                 | -      |        |
| postfixIcon   | 设置输入框后缀图标,规则参考Icon组件         | string                 | -      |        |

### 使用方法

```javascript
    <>

      <Input size={InputSize.Large}
      disabled
        style={{
          width: "300px"
        }}
        prefixIcon="a"
        postfixIcon="arrow-alt-circle-down"
        prefixString='https://'
        placeholder="123" />

      <br />
      <Input size={InputSize.Large}
        style={{
          width: "300px"
        }}
        prefixIcon="a"
        postfixIcon="arrow-alt-circle-down"
        prefixString='https://'
        postfixString='.com'
        placeholder="123" />

      <br />
      <Input size={InputSize.Middle}
        style={{
          width: "300px"
        }}
        prefixIcon="v"
        postfixIcon="arrow-alt-circle-down"
        prefixString='https://'
        postfixString='.com'
        placeholder="123" />
      <br />

      <Input size={InputSize.Small}
        style={{
          width: "300px"
        }}
        prefixIcon="v"
        postfixIcon="arrow-alt-circle-down"
        prefixString='https://'
        postfixString='.com'
        placeholder="123" />
      <br />


      <Input size={InputSize.Middle}
        style={{
          width: "300px"
        }}

        placeholder="123" />

      <br />
      <Input size={InputSize.Small}
        style={{
          width: "300px"
        }}
        prefixIcon="v"
        placeholder="123" />
    </>
```

## AutoInput

**autoInput实现了input的所有功能**

| 属性          | 说明                                        | 类型                   | 默认值 | 必选项 |
| ------------- | ------------------------------------------- | ---------------------- | ------ | ------ |
| size          | 设置按钮大小，                              | small \| large\|middle | -      |        |
| disabled      | 值为true时设置按钮为不可点击状态，默认false | boolean                | -      |        |
| placeholder   | 输入框的提示                                | string                 | -      |        |
| defalutString | 输入框的默认值                              | string                 | -      |        |
| prefixIcon    | 设置输入框前缀图标,规则参考Icon组件         | string                 | -      |        |
| postfixIcon   | 设置输入框后缀图标,规则参考Icon组件         | string                 | -      |        |

**除此之外**，**还新添了一些属性**

| 属性             | 说明                              | 类型                                               | 默认值 | 必选项 |
| ---------------- | --------------------------------- | -------------------------------------------------- | ------ | ------ |
| fetchSuggestions | 返回输入建议的函数，支持同步/异步 | (keyWord: string) => Promise<string[]> \| string[] |        | √      |
| select           | 点击选中建议项时触发              | (keyWord: string) => void                          |        |        |
| createMenus      | 支持自定义下拉菜单                | (item: string, index: number) => string            | {item} |        |
| triggerOnFocus   | 激活即是否列出输入建议            | boolean                                            | false  |        |



### 使用方法

```javascript
      <AutoInput
        style={{
          width: '500px'
        }}
        fetchSuggestions={fn}
        placeholder='123'
        prefixIcon="arrow-down"
        triggerOnFocus={false}
        createMenus={(item: string, index: number) => {
          return index + ',,,' + item;
        }}
        select={(s: string) => {
          console.log(s);
        }} />
```

## Menu

| 属性          | 说明                                                 | 类型                   | 默认值     | 必选项 |
| ------------- | ---------------------------------------------------- | ---------------------- | ---------- | ------ |
| mode          | 水平/垂直                                            | vertical \| horizontal | horizontal |        |
| defaultNumber | 默认选中第几个                                       | number                 | 0          | √      |
| handleClick   | 传入按钮中文字内容                                   | string                 | -          |        |
| fontColor     | 字体颜色                                             | string                 | -          |        |
| activeColor   | 字体高亮颜色                                         | string                 | 黄色       |        |
| style         | 其他css样式如height/width/backgroundColor/fontSize等 | object                 | -          |        |
| itemHeight    | 每个选项卡的高度                                     | string                 | 30px       |        |

### MenuItem

| 属性    | 说明         | 类型    | 默认值      | 必选项 |
| ------- | ------------ | ------- | ----------- | ------ |
| index   | 水平/垂直    | number  | 从0开始计数 | ×      |
| disable | 是否禁止选中 | boolean | false       | ×      |

### SubMenu

| 属性    | 说明         | 类型    | 默认值      | 必选项 |
| ------- | ------------ | ------- | ----------- | ------ |
| index   | 水平/垂直    | number  | 从0开始计数 | ×      |
| disable | 是否禁止选中 | boolean | false       | ×      |
| title   | 标题         | string  | -           | √      |

### 使用方法

```javascript
<Menu mode="vertical" style={{
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
```

## Upload

------

| 属性            | 说明                                                         | 类型                                       | 默认值 | 必选项 |
| --------------- | ------------------------------------------------------------ | ------------------------------------------ | ------ | ------ |
| action          | 上传的地址                                                   | string                                     |        | √      |
| beforeUpload    | 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。支持自定义下拉菜单 | (file: File[]) => boolean\|Promise< void > |        |        |
| onProgress      | 文件上传时的钩子                                             | (percent: number, file: File) => void      |        |        |
| onChange        | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 | (file: File) => void                       |        |        |
| onSuccess       | 文件上传成功的钩子                                           | (response: any, file: File) => void        |        |        |
| onError         | 文件上传失败的钩子                                           | (response: any, file: File) => void        |        |        |
| beforeRemove    | 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。 | (file: File) => boolean\|Promise< void >   |        |        |
| multiple        | 是否支持多选文件                                             | boolean                                    | false  |        |
| headers         | 设置上传的请求头部                                           | object                                     |        |        |
| menuWidth       | 菜单宽度                                                     | string                                     | 500px  |        |
| withCredentials | 支持发送 cookie 凭证信息                                     | boolean                                    | false  |        |
| drag            | 是否支持拖拽上传                                             | boolean                                    | false  |        |



### 使用方法

```javascript
     
    <UpLoad
      action='https://jsonplaceholder.typicode.com/posts'
      onProgress={(p) => {
        console.log(p)
      }}
      onSuccess={() => {
        console.log('success')
      }}
      beforeUpload={(file: File[]) => {
        for (let i = 0; i < file.length; i++) {
          if (file[i].size > 1024*100) {
            alert(file[i].name + ',体积过大');
            return false;
          }
        }
        return true;
      }}
    >
      点击上传文件
    </UpLoad>

```

