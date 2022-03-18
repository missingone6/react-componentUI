# Upload

****

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



## 使用方法

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


