import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Input, Checkbox, Radio, Select, Switch, Space } from 'antd'
import { FormPropertiesWrapper, ActionProperties, ValidateProperties, CustomOptions } from './PropCommon'

const SwitchProperties = (props) => {
    const { selectItem } = props
    const { defaultValue, checkedChildren, unCheckedChildren } = selectItem.options || {}
    const wrapRef = useRef()

    const onCheckedTextChange = (e) => {
        wrapRef.current.triggerFieldChange('options.checkedChildren', e.target.value)
    }

    const onUnCheckedTextChange = (e) => {
        wrapRef.current.triggerFieldChange('options.unCheckedChildren', e.target.value)
    }

    return <FormPropertiesWrapper ref={wrapRef} {...props}>

        <Form.Item
            label="提示文字"
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <Input placeholder="请输入选中文字" onChange={onCheckedTextChange} />
                <Input placeholder="请输入未选中文字" onChange={onUnCheckedTextChange} />
            </Space>
        </Form.Item>

        <Form.Item
            label="默认值"
            name="options.defaultValue"
            initialValue={defaultValue}
            valuePropName={'checked'}
        >
            <Switch />
        </Form.Item>

        {/* 操作属性 */}
        <ActionProperties {...props} wrapRef={wrapRef} attrs={['hidden', 'disabled']} />

    </FormPropertiesWrapper>
}

export default SwitchProperties;
