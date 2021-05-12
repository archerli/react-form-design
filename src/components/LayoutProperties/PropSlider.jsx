import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Input, InputNumber, Slider, Space } from 'antd'
import { FormPropertiesWrapper, ActionProperties, ValidateProperties, CustomOptions } from './PropCommon'

const SliderProperties = (props) => {
    const { selectItem } = props
    const { width, placeholder, defaultValue, range, rangePlaceholder, format } = selectItem.options || {}
    const wrapRef = useRef()

    return <FormPropertiesWrapper ref={wrapRef} {...props}>

        <Form.Item label="宽度" name="options.width" initialValue={width}>
            <Slider tipFormatter={(value) => `${value}%`} />
        </Form.Item>

        <Form.Item label="步长" name="options.step">
            <InputNumber placeholder="请输入步长" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="最小值" name="options.min">
            <InputNumber placeholder="请输入最小值" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="最大值" name="options.max">
            <InputNumber placeholder="请输入最大值" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="默认值" name="options.defaultValue">
            <InputNumber placeholder="请输入默认值" style={{ width: '100%' }} />
        </Form.Item>

        {/* 操作属性 */}
        <ActionProperties {...props} wrapRef={wrapRef} attrs={['hidden', 'disabled', 'showInput']} />

        {/* 校验属性 */}
        <ValidateProperties {...props} wrapRef={wrapRef} />

    </FormPropertiesWrapper>
}

export default SliderProperties;
