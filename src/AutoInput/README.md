# AutoInput

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



## 使用方法

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


