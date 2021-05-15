import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Input, Checkbox, Radio, Select, Switch, Space } from 'antd'
import { FormPropertiesWrapper, NormalPropertiesWrapper, ActionProperties, ValidateProperties, CustomOptions } from './PropCommon'

const AlertProperties = (props) => {
    const { selectItem } = props
    const { description, type, showIcon, banner } = selectItem.options || {}
    const wrapRef = useRef()

    const onAttrChange = (key, ev) => {
        wrapRef.current.triggerFieldChange(`options.${key}`, ev.target.checked)
    }

    return <NormalPropertiesWrapper ref={wrapRef} {...props}>

        <Form.Item
            label="辅助描述"
            name="options.description"
            initialValue={description}
        >
            <Input placeholder="请输入辅助描述" />
        </Form.Item>

        <Form.Item
            label="类型"
            name="options.type"
            initialValue={type}
        >
            <Select placeholder="请选择类型">
                <Select.Option value="success">success</Select.Option>
                <Select.Option value="info">info</Select.Option>
                <Select.Option value="warning">warning</Select.Option>
                <Select.Option value="error">error</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item
            label="样式属性"
        >
            <div>
                <Checkbox onChange={(ev) => onAttrChange('showIcon', ev)}>显示图标</Checkbox>
                <Checkbox onChange={(ev) => onAttrChange('banner', ev)}>无边框</Checkbox>
                <Checkbox onChange={(ev) => onAttrChange('closable', ev)}>可关闭</Checkbox>
            </div>
        </Form.Item>

        {/* 操作属性 */}
        <ActionProperties {...props} wrapRef={wrapRef} attrs={['hidden']} />

    </NormalPropertiesWrapper>
}

export default AlertProperties;
