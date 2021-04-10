import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Input, Select, Slider, Checkbox } from 'antd'
import { FormPropertiesWrapper, ActionProperties, ValidateProperties } from './PropCommon'

const InputProperties = (props) => {
    const { selectItem } = props
    const { width, placeholder, defaultValue } = selectItem.options || {}
    const wrapRef = useRef()

    return <FormPropertiesWrapper ref={wrapRef} {...props}>
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

        {/* 操作属性 */}
        <ActionProperties {...props} wrapRef={wrapRef} />

        {/* 校验属性 */}
        <ValidateProperties {...props} wrapRef={wrapRef} />

    </FormPropertiesWrapper>
}

export default InputProperties;
