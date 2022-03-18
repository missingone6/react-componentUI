# Menu

| 属性          | 说明                                                 | 类型                   | 默认值     | 必选项 |
| ------------- | ---------------------------------------------------- | ---------------------- | ---------- | ------ |
| mode          | 水平/垂直                                            | vertical \| horizontal | horizontal |        |
| defaultNumber | 默认选中第几个                                       | number                 | 0          | √      |
| handleClick   | 传入按钮中文字内容                                   | string                 | -          |        |
| fontColor     | 字体颜色                                             | string                 | -          |        |
| activeColor   | 字体高亮颜色                                         | string                 | 黄色       |        |
| style         | 其他css样式如height/width/backgroundColor/fontSize等 | object                 | -          |        |
| itemHeight    | 每个选项卡的高度                                     | string                 | 30px       |        |

# MenuItem

| 属性    | 说明         | 类型    | 默认值      | 必选项 |
| ------- | ------------ | ------- | ----------- | ------ |
| index   | 水平/垂直    | number  | 从0开始计数 | ×      |
| disable | 是否禁止选中 | boolean | false       | ×      |

# SubMenu

| 属性    | 说明         | 类型    | 默认值      | 必选项 |
| ------- | ------------ | ------- | ----------- | ------ |
| index   | 水平/垂直    | number  | 从0开始计数 | ×      |
| disable | 是否禁止选中 | boolean | false       | ×      |
| title   | 标题         | string  | -           | √      |

# 使用方法

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

