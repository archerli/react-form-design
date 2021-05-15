import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Input, Checkbox, Radio, Select, Switch, Space } from 'antd'
import { FormPropertiesWrapper, NormalPropertiesWrapper, ActionProperties, ValidateProperties, CustomOptions } from './PropCommon'

const HTMLProperties = (props) => {
    const { selectItem } = props
    const { defaultValue } = selectItem.options || {}
    const wrapRef = useRef()

    return <NormalPropertiesWrapper ref={wrapRef} {...props}>

        <Form.Item
            label="默认值"
            name="options.defaultValue"
            initialValue={defaultValue}
        >
            <Input.TextArea placeholder="请输入默认值" />
        </Form.Item>

        {/* 操作属性 */}
        <ActionProperties {...props} wrapRef={wrapRef} attrs={['hidden']} />

    </NormalPropertiesWrapper>
}

export default HTMLProperties;
