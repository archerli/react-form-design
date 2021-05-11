import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Input, Slider, Space } from 'antd'
import { FormPropertiesWrapper, ActionProperties, ValidateProperties, CustomOptions } from './PropCommon'

const DatePickerProperties = (props) => {
    const { selectItem } = props
    const { width, placeholder, defaultValue, range, rangePlaceholder, format } = selectItem.options || {}
    const wrapRef = useRef()

    const onDateDefaultValueChange = (key, ev) => {
        wrapRef.current.triggerFieldChange(`options.${key}`, ev.target.value)
    }

    const onPlaceholderChange = (key, ev) => {
        wrapRef.current.triggerFieldChange(`options.${key}`, ev.target.value)
    }

    return <FormPropertiesWrapper ref={wrapRef} {...props}>
        {range ?
            <Form.Item label="占位内容" >
                <Space >
                    <Input placeholder="请输入占位内容" defaultValue={rangePlaceholder[0]} onChange={(ev) => onPlaceholderChange('rangePlaceholder[0]', ev)} />
                    <Input placeholder="请输入占位内容" defaultValue={rangePlaceholder[1]} onChange={(ev) => onPlaceholderChange('rangePlaceholder[1]', ev)} />
                </Space>
            </Form.Item>
            : <Form.Item label="占位内容" name="options.placeholder" initialValue={placeholder}>
                <Input placeholder="请输入占位内容" />
            </Form.Item>
        }

        <Form.Item label="宽度" name="options.width" initialValue={width}>
            <Slider tipFormatter={(value) => `${value}%`} />
        </Form.Item>

        <Form.Item label="默认值" >
            {range ? <Space>
                <Input placeholder="请输入占位内容" defaultValue={defaultValue[0]} onChange={(ev) => onDateDefaultValueChange('defaultValue[0]', ev)} />
                <Input placeholder="请输入占位内容" defaultValue={defaultValue[1]} onChange={(ev) => onDateDefaultValueChange('defaultValue[1]', ev)} />
            </Space> : <Input placeholder="请输入默认值" defaultValue={defaultValue} onChange={(ev) => onDateDefaultValueChange('defaultValue', ev)} />}
        </Form.Item>

        <Form.Item label="时间格式" name="options.format" initialValue={format}>
            <Input placeholder="时间格式如：YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        {/* 操作属性 */}
        <ActionProperties {...props} wrapRef={wrapRef} attrs={['hidden', 'disabled', 'clearable', 'range', 'showTime']} />

        {/* 校验属性 */}
        <ValidateProperties {...props} wrapRef={wrapRef} />

    </FormPropertiesWrapper>
}

export default DatePickerProperties;
