import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Input, Checkbox, Radio, Select } from 'antd'
import { FormPropertiesWrapper, NormalPropertiesWrapper, ActionProperties, ValidateProperties, CustomOptions } from './PropCommon'

const ButtonProperties = (props) => {
    const { selectItem } = props
    const { width, placeholder, defaultValue, options, dynamic, type, handle } = selectItem.options || {}
    const wrapRef = useRef()

    const onHandleChange = (e) => {
        wrapRef.current.triggerFieldChange('options.handle', e.target.value)
    }

    const onDynamicFuncChange = (e) => {
        wrapRef.current.triggerFieldChange('options.dynamicFun', e.target.value)
    }

    return <NormalPropertiesWrapper ref={wrapRef} {...props}>

        <Form.Item label="类型" name="options.type" initialValue={type}>
            <Select placeholder="请选择类型">
                <Select.Option value="primary">Primary</Select.Option>
                <Select.Option value="default">Default</Select.Option>
                <Select.Option value="dashed">Dashed</Select.Option>
                <Select.Option value="danger">Danger</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item label="按钮操作">
            <Radio.Group buttonStyle="solid" value={handle} onChange={onHandleChange}>
                <Radio.Button value="submit">提交</Radio.Button>
                <Radio.Button value="reset">重置</Radio.Button>
                <Radio.Button value="dynamic">动态函数</Radio.Button>
            </Radio.Group>
            {
                handle === 'dynamic' ? <Input
                    style={{ marginTop: '6px' }}
                    placeholder="动态函数名"
                    onChange={onDynamicFuncChange}
                /> : null
            }
        </Form.Item>

        {/* 操作属性 */}
        <ActionProperties {...props} wrapRef={wrapRef} attrs={['hidden', 'disabled']} />

    </NormalPropertiesWrapper>
}

export default ButtonProperties;
