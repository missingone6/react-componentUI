# Icon

## 简介

**通过对react-fontawesome的简单封装，实现图标的使用。**

react-fontawesome是一个成熟的第三方图标库,底层采用svg的方式实现，在使用时引入想要使用的图标即可，相比于icon-font的图标方式，他不必一次性引入全部图标。

使用属性参考 https://fontawesome.com/v6/docs/web/use-with/react/style

图标搜索 https://fontawesome.com/icons/

| 属性      | 说明       | 类型                                    | 默认值  | 必选项 |
| --------- | ---------- | --------------------------------------- | ------- | ------ |
| type      | 按钮主题   | primary\|default\|danger\|warn\|success | default |        |
| style     | 自定义样式 | object                                  | null    |        |
| className | 类名       | string                                  |         |        |

## 使用方法

```javascript
<Icon 
	icon="arrow-rotate-right"
	size='5x'
	rotation={90}
	border
/>
```



