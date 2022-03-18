import React, { useState, useRef } from 'react';
import axios from 'axios';
import classNames from 'classnames';

// 引入其它组件
import Icon from '../Icon';

interface IUpload {
  className?: string;
  children?: React.ReactNode,
  style?: React.CSSProperties,
  /**
   * 必选参数，上传的地址
   */
  action: string,
  /**
   * 是否支持多选文件
   */
  multiple?: boolean
  /**
   * 设置上传的请求头部
   */
  headers?: object
  /**
   * 	支持发送 cookie 凭证信息
   */
  withCredentials?: boolean
  /**
   * 	是否支持拖拽上传
   */
  drag?: boolean
  /**
   * 	
   */
  menuWidth?: string
  /**
   * 上传文件之前的钩子，参数为上传的文件，
   * 若返回 false 或者返回 Promise 且被 reject，则停止上传。
   */
  beforeUpload?: (file: File[]) => boolean | Promise<void>
  /**
   * 文件上传时的钩子
   */
  onProgress?: (percent: number, file: File) => void
  /**
   * 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
   */
  onChange?: (file: File) => void
  /**
   * 文件上传成功的钩子
   */
  onSuccess?: (response: any, file: File) => void
  /**
   * 文件上传失败的钩子
   */
  onError?: (err: any, file: File) => void
  /**
   * 删除文件之前的钩子，参数为上传的文件和文件列表，
   * 若返回 false 或者返回 Promise 且被 reject，则停止删除。
   */
  beforeRemove?: (file: File) => boolean | Promise<void>
}

type FileListStatus = 'ready' | 'uploading' | 'success' | 'fail';

interface FileListTypes {
  id: string,
  name: string,
  size: number
  status: FileListStatus,
  uploadProgress: number,
  original: File
}


const Upload: React.FC<IUpload> = (props) => {

  const {
    className,
    style,
    children,
    action,
    beforeUpload,
    onProgress,
    onChange,
    onSuccess,
    onError,
    beforeRemove,
    multiple,
    headers,
    withCredentials,
    menuWidth,
    drag,
    ...UploadEvent
  } = props;

  const [filesList, setFilesList] = useState<FileListTypes[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const classUpload = classNames('my-upLoad', className);

  const axiosPost = (fileItem: File, id: string) => {
    const uploadFilesList = (id: string, uploadObj: Partial<FileListTypes>): void => {
      setFilesList(prevStats => {
        return prevStats.map((item: FileListTypes) => {
          if (item.id === id) {
            return {
              ...item,
              ...uploadObj
            }
          } else {
            return item;
          }
        });
      });
    }
    const formData = new FormData();
    formData.append(fileItem.name, fileItem);
    axios.post(action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers
      },
      withCredentials,
      onUploadProgress: (progressEvent: any) => {
        const percent = (progressEvent.loaded / progressEvent.total) * 100;
        // 修改进度条
        uploadFilesList(id, {
          status: 'uploading' as FileListStatus,
          uploadProgress: percent
        });

        if (onProgress) {
          onProgress(percent, fileItem);
        }
      }
    }).then(response => {
      if (onSuccess) {
        uploadFilesList(id, {
          status: 'success' as FileListStatus,
        });
        onSuccess(response.data, fileItem);
      }
      if (onChange) {
        onChange(fileItem);
      }
    }).catch(error => {
      if (onError) {
        uploadFilesList(id, {
          status: 'fail' as FileListStatus,
        });
        onError(error, fileItem);
      }
      if (onChange) {
        onChange(fileItem);
      }
    })
  }

  const createFileToFileList = (file: File, id: string) => {

    const newFile: FileListTypes = {
      id,
      name: file.name,
      size: file.size,
      status: 'ready',
      uploadProgress: 0,
      original: file
    };
    setFilesList(prevState => {
      return [
        newFile,
        ...prevState
      ]
    });
  }

  const handleOnChange = (files: FileList) => {

    if (files) {
      const filesArray: File[] = Array.from(files);

      filesArray.forEach(file => {
        // 调用用户传入的函数
        if (beforeUpload) {
          let returnValue = beforeUpload(filesArray)
          if (returnValue instanceof Promise) {
            returnValue.then(() => {
              const id = Date.now() + file.name + file.size;
              createFileToFileList(file, id);
              axiosPost(file, id);
            })
          }
          if (returnValue === true) {
            const id = Date.now() + file.name + file.size;
            createFileToFileList(file, id);
            axiosPost(file, id);
          }
        }
      });

    }
  }

  const handleDelete = (id: string, file: File) => {
    const deleteFileList = () => {
      setFilesList(
        filesList.filter(item => item.id !== id)
      );
    }
    return () => {
      // 调用用户传入的函数
      if (beforeRemove) {
        let returnValue = beforeRemove(file);
        if (returnValue instanceof Promise) {
          returnValue.then(() => {
            deleteFileList();
          })
        }
        if (returnValue === true) {
          deleteFileList();
        }
      }
      // 没有传入直接删除
      else {
        deleteFileList();
      }
    }
  }

  const handleDragOver = (dragValue: boolean | undefined) => {
    return dragValue ?
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
      }
      : undefined;
  }

  const handleDrop = (dragValue: boolean | undefined) => {
    return dragValue ?
      (e: React.DragEvent<HTMLDivElement>) => {
        if (inputRef.current) {
          e.preventDefault();
          handleOnChange(e.dataTransfer.files)
        }
      }
      : undefined;
  }

  return (
    <>
      <div
        style={{ ...style }}
        className={classUpload}>
        <input
          type="file"
          multiple={multiple}
          ref={inputRef}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { files } = e.target;
            if (files) {
              handleOnChange(files);
            }
          }}
        />
        <div style={{
          position: 'relative'
        }}
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.click();
            }
          }}
          onDragOver={handleDragOver(drag)}
          onDrop={handleDrop(drag)}
          {...UploadEvent}>
          {children}
        </div>
      </div>
      <ul className='my-upLoad-menu' style={{
        width: menuWidth
      }}>
        {
          filesList?.map((item: FileListTypes) => {
            const uploadProgress: string = item.uploadProgress.toFixed(2) + '%';
            return (
              <li key={item.id}>
                <Icon
                  icon="book"
                  size='sm'
                  className='book'
                />
                <span className='name'>{item.name}</span>
                <div className="container">
                  <div
                    className="progress"
                    style={{
                      width: uploadProgress
                    }}>
                  </div>
                </div>
                <span className='percent'>{uploadProgress}</span>
                <div className="icon-box">
                  {
                    item.status === 'success' ? <Icon
                      icon="circle-check"
                      size='sm'
                      className='right-icon success'
                    /> : null
                  }
                  {
                    item.status === 'uploading' ? <Icon
                      spin
                      icon="spinner"
                      size='sm'
                      className='right-icon uploading'
                    /> : null
                  }
                  {
                    item.status === 'fail' ? <Icon
                      icon="circle-xmark"
                      size='sm'
                      className='right-icon fail'
                    /> : null
                  }
                  <Icon
                    icon="x"
                    size='sm'
                    className='right-icon delete'
                    style={{
                      display: 'none'
                    }}
                    onClick={handleDelete(item.id, item.original)}
                  />
                </div>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

Upload.defaultProps = {
  multiple: false,
  withCredentials: false,
  menuWidth: '500px',
  drag: false
}

export default Upload;