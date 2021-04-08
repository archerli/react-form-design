import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Input, Select, Slider, Checkbox } from 'antd'
import { PropertiesWrapper, CustomRules } from './PropCommon'

const InputProperties = (props) => {
    const { selectItem } = props
    const { width, placeholder, defaultValue, hidden, disabled, clearable } = selectItem.options || {}
    const wrapRef = useRef()

    return <PropertiesWrapper ref={wrapRef} {...props}>
        <Form.Item label="类型" name="options.type" initialValue={selectItem.options.type}>
            <Select placeholder="请选择类型">
                <Select.Option value="text">text</Select.Option>
                <Select.Option value="number">number</Select.Option>
                <Select.Option value="password">password</Select.Option>
                <Select.Option value="tel">tel</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item label="占位内容" name="options.placeholder" initialValue={placeholder}>
            <Input placeholder="请输入占位内容" />
        </Form.Item>

        <Form.Item label="宽度" name="options.width" initialValue={width}>
            <Slider tipFormatter={(value) => `${value}%`} />
        </Form.Item>

        <Form.Item label="默认值" name="options.defaultValue" initialValue={defaultValue}>
            <Input placeholder="请输入默认值" />
        </Form.Item>

        <Form.Item label="操作属性">
            <Checkbox defaultValue={hidden} onChange={(ev) => wrapRef.current.triggerFieldChange('options.hidden', ev.target.checked)}>隐藏</Checkbox>

            <Checkbox defaultValue={disabled} onChange={(ev) => wrapRef.current.triggerFieldChange('options.disabled', ev.target.checked)}>禁用</Checkbox>

            <Checkbox defaultValue={clearable} onChange={(ev) => wrapRef.current.triggerFieldChange('options.clearable', ev.target.checked)}>可清除</Checkbox>
        </Form.Item>

        <Form.Item label="校验">
            <Checkbox
                defaultValue={selectItem.rules[0].required}
                onChange={(ev) => wrapRef.current.triggerFieldChange('rules[0].required', ev.target.checked)}>必填</Checkbox>
            <Input
                defaultValue={selectItem.rules[0].message}
                onChange={(ev) => wrapRef.current.triggerFieldChange('rules[0].message', ev.target.value)}
                placeholder="必填校验提示信息"
            />

            <CustomRules
                data={selectItem.rules}
                updateRules={wrapRef.current && wrapRef.current.updateRules}
            />
        </Form.Item>

    </PropertiesWrapper>
}

export default InputProperties;
