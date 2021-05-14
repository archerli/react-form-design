import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Input, InputNumber, Select, Slider, Checkbox } from 'antd'
import { FormPropertiesWrapper, ActionProperties, ValidateProperties } from './PropCommon'

const EditorProperties = (props) => {
    const { selectItem } = props
    const { width, height, placeholder, defaultValue } = selectItem.options || {}
    const wrapRef = useRef()

    return <FormPropertiesWrapper ref={wrapRef} {...props}>

        <Form.Item label="占位内容" name="options.placeholder" initialValue={placeholder}>
            <Input placeholder="请输入占位内容" />
        </Form.Item>

        <Form.Item label="宽度" name="options.width" initialValue={width}>
            <Slider tipFormatter={(value) => `${value}%`} />
        </Form.Item>

        <Form.Item label="高度" name="options.height" initialValue={height}>
            <InputNumber placeholder="请输入默认值" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="默认值" name="options.defaultValue" initialValue={defaultValue}>
            <Input placeholder="请输入默认值" />
        </Form.Item>

        {/* 操作属性 */}
        <ActionProperties {...props} wrapRef={wrapRef} attrs={['hidden', 'disabled', 'showLabel', 'chinesization']} />

        {/* 校验属性 */}
        <ValidateProperties {...props} wrapRef={wrapRef} />

    </FormPropertiesWrapper>
}

export default EditorProperties;
