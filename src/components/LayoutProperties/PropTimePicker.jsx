import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Input, Slider, Space } from 'antd'
import { FormPropertiesWrapper, ActionProperties, ValidateProperties, CustomOptions } from './PropCommon'

const TimePickerProperties = (props) => {
    const { selectItem } = props
    const { width, placeholder, defaultValue, format } = selectItem.options || {}
    const wrapRef = useRef()

    return <FormPropertiesWrapper ref={wrapRef} {...props}>
        <Form.Item label="占位内容" name="options.placeholder" initialValue={placeholder}>
            <Input placeholder="请输入占位内容" />
        </Form.Item>

        <Form.Item label="宽度" name="options.width" initialValue={width}>
            <Slider tipFormatter={(value) => `${value}%`} />
        </Form.Item>

        <Form.Item label="默认值" name="options.defaultValue" initialValue={defaultValue}>
            <Input placeholder="HH:mm:ss" />
        </Form.Item>

        <Form.Item label="时间格式" name="options.format" initialValue={format}>
            <Input placeholder="时间格式如：YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        {/* 操作属性 */}
        <ActionProperties {...props} wrapRef={wrapRef} attrs={['hidden', 'disabled', 'clearable']} />

        {/* 校验属性 */}
        <ValidateProperties {...props} wrapRef={wrapRef} />

    </FormPropertiesWrapper>
}

export default TimePickerProperties;
