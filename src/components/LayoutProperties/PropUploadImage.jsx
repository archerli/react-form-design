import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Input, InputNumber, Radio, Slider, Space } from 'antd'
import { FormPropertiesWrapper, ActionProperties, ValidateProperties, CustomOptions } from './PropCommon'

const UploadImageProperties = (props) => {
    const { selectItem } = props
    const { width, placeholder, defaultValue, downloadWay, dynamicFun, limit, action, fileName, listType, data } = selectItem.options || {}
    const wrapRef = useRef()

    return <FormPropertiesWrapper ref={wrapRef} {...props}>
        <Form.Item label="占位内容" name="options.placeholder" initialValue={placeholder}>
            <Input placeholder="请输入占位内容" />
        </Form.Item>

        <Form.Item label="宽度" name="options.width" initialValue={width}>
            <Slider tipFormatter={(value) => `${value}%`} />
        </Form.Item>

        <Form.Item label="默认值" name="options.defaultValue" initialValue={defaultValue}>
            <Input placeholder="请输入默认值" />
        </Form.Item>

        <Form.Item label="下载方式" name="options.listType" initialValue={listType} >
            <Radio.Group
                buttonStyle="solid"
            >
                <Radio.Button value="text">text</Radio.Button>
                <Radio.Button value="picture">picture</Radio.Button>
                <Radio.Button value="picture-card">card</Radio.Button>
            </Radio.Group>
        </Form.Item>

        <Form.Item label="最大上传数量" name="options.limit" initialValue={limit}>
            <InputNumber placeholder="请输入最大上传数量" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="上传地址" name="options.action" initialValue={action}>
            <Input placeholder="请输入上传地址" />
        </Form.Item>

        <Form.Item label="文件name" name="options.fileName" initialValue={fileName}>
            <Input placeholder="请输入文件name" />
        </Form.Item>

        <Form.Item label="额外参数（JSON格式）" name="options.data" initialValue={data}>
            <Input.TextArea autoSize={{ minRows: 1, maxRows: 4 }} placeholder="严格JSON格式" />
        </Form.Item>

        {/* 操作属性 */}
        <ActionProperties {...props} wrapRef={wrapRef} attrs={['hidden', 'disabled', 'multiple']} />

        {/* 校验属性 */}
        <ValidateProperties {...props} wrapRef={wrapRef} />

    </FormPropertiesWrapper>
}

export default UploadImageProperties;
