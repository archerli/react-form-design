import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Input, InputNumber, Slider, Space, Rate } from 'antd'
import { FormPropertiesWrapper, ActionProperties, ValidateProperties, CustomOptions } from './PropCommon'

const RateProperties = (props) => {
    const { selectItem } = props
    const { defaultValue, allowHalf, max } = selectItem.options || {}
    const wrapRef = useRef()

    return <FormPropertiesWrapper ref={wrapRef} {...props} >
        <Form.Item label="最大值" name="options.max" initialValue={max} >
            <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="默认值" name="options.defaultValue" initialValue={defaultValue} >
            <Rate allowHalf={allowHalf} />
        </Form.Item>

        {/* 操作属性 */}
        <ActionProperties {...props} wrapRef={wrapRef} attrs={['hidden', 'disabled', 'allowHalf']} />

        {/* 校验属性 */}
        <ValidateProperties {...props} wrapRef={wrapRef} />

    </FormPropertiesWrapper>
}

export default RateProperties;
