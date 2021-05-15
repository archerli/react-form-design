import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Input, Checkbox, Radio, Select, Switch, Space } from 'antd'
import { FormPropertiesWrapper, NormalPropertiesWrapper, ActionProperties, ValidateProperties, CustomOptions } from './PropCommon'

const TextProperties = (props) => {
    const { selectItem } = props
    const { description, type, textAlign, showIcon, banner } = selectItem.options || {}
    const wrapRef = useRef()

    const onCheckedChange = (key, ev) => {
        wrapRef.current.triggerFieldChange(`options.${key}`, ev.target.checked)
    }

    return <NormalPropertiesWrapper ref={wrapRef} {...props}>

        <Form.Item
            label="文字对齐方式"
            name="options.textAlign"
            initialValue={textAlign}
        >
            <Radio.Group buttonStyle="solid">
                <Radio.Button value="left">左</Radio.Button>
                <Radio.Button value="center">居中</Radio.Button>
                <Radio.Button value="right">右</Radio.Button>
            </Radio.Group>
        </Form.Item>

        {/* <Form.Item
            label="样式属性"
        >
            <div>
                <Checkbox onChange={(ev) => onCheckedChange('showRequiredMark', ev)}>显示必选标记</Checkbox>
            </div>
        </Form.Item> */}

        {/* 操作属性 */}
        <ActionProperties {...props} wrapRef={wrapRef} attrs={['hidden']} />

    </NormalPropertiesWrapper>
}

export default TextProperties;
