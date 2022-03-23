# Input

| 属性          | 说明                                        | 类型                   | 默认值 | 必选项 |
| ------------- | ------------------------------------------- | ---------------------- | ------ | ------ |
| size          | 设置按钮大小，                              | small \| large\|middle | -      |        |
| disabled      | 值为true时设置按钮为不可点击状态，默认false | boolean                | -      |        |
| placeholder   | 输入框的提示                                | string                 | -      |        |
| defalutString | 输入框的默认值                              | string                 | -      |        |
| prefixIcon    | 设置输入框前缀图标,规则参考Icon组件         | string                 | -      |        |
| postfixIcon   | 设置输入框后缀图标,规则参考Icon组件         | string                 | -      |        |

## 使用方法

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


