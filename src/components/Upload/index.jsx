import React, { useState } from 'react';
import { Upload, Button } from 'antd'

import {
  UploadOutlined,
  CloudUploadOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import './index.less'

const { Dragger } = Upload

export const UploadFile = (props) => {
  const { data, config, form } = props
  const { defaultValue, disabled, placeholder, fileName, headers, action, multiple, drag, limit, width } = data.options || {}

  const [fileList, setFileList] = useState([])

  const handlePreview = () => { }

  const handleChange = () => { }

  const handleRemove = () => { }

  const beforeUpload = () => { }

  const optionsData = () => {
    try {
      return JSON.parse(data.options.data)
    } catch (e) { }
  }

  const uploadProps = {
    multiple,
    fileList,
    disabled: disabled || props.disabled,
    name: config.uploadFileName || fileName,
    headers: config.uploadFileHeaders || headers,
    data: config.uploadFileData || optionsData(),
    action: config.uploadFile || action,
    onPreview: handlePreview,
    onChange: handleChange,
    onBeforeUpload: beforeUpload,
    onRemove: handleRemove,
  }

  return <div style={{ width: width + '%' }}>
    {
      drag ?
        <Dragger
          {...uploadProps}
        >
          <p className="ant-upload-drag-icon">
            <CloudUploadOutlined />
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域</p>
        </Dragger> :
        <Upload
          {...uploadProps}
        >
          {fileList.length < limit ?
            <Button disabled={disabled || props.disabled}>
              <UploadOutlined />{placeholder}
            </Button>
            : null}
        </Upload>
    }
  </div>
}


export const UploadImage = (props) => {
  const { data, config, form } = props
  const { defaultValue, disabled, placeholder, fileName, headers, action, multiple, listType, drag, limit, width } = data.options || {}

  const [fileList, setFileList] = useState([])

  const handlePreview = () => { }

  const handleChange = () => { }

  const handleRemove = () => { }

  const handleBeforeUpload = () => { }

  const optionsData = () => {
    try {
      return JSON.parse(data.options.data)
    } catch (e) { }
  }

  return <div className="upload-img-box-9136076486841527" style={{ width: width + '%' }} >
    <Upload
      fileList={fileList}
      multiple={multiple}
      listType={listType}
      disabled={disabled || props.disabled}
      action={config.uploadImage || action}
      data={config.uploadImageData || optionsData()}
      headers={config.uploadImageHeaders || headers}
      name={config.uploadImageName || fileName}
      accept="image/gif, image/jpeg, image/png"
      onChange={handleChange}
      onPreview={handlePreview}
      onRemove={handleRemove}
      onBeforeUpload={handleBeforeUpload}
    >
      {
        listType !== 'picture-card' && fileList.length < limit ? <Button disabled={disabled || props.disabled}>
          <UploadOutlined />{placeholder}
        </Button> : null
      }

      {
        listType === 'picture-card' && fileList.length < limit ? <div disabled={disabled || props.disabled}>
          <PlusOutlined />
          <div className="ant-upload-text">{placeholder}</div>
        </div> : null
      }

    </Upload>

  </div>
}